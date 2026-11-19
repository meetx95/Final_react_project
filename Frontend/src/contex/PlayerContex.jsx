import { createContext, useEffect, useRef, useState } from "react";
import { api } from "../api/api";

export const PlayerContext = createContext();

const initialTime = {
  currentTime: { second: 0, minutes: 0 },
  totalTime: { second: 0, minutes: 0 },
};

export default function PlayerContextProvider({ children }) {
  const audioRef = useRef(null);
  const seekbg = useRef(null);
  const seekbar = useRef(null);
  const playAfterLoad = useRef(false);

  const [songs, setSongs] = useState([]);
  const [track, setTrack] = useState(null);
  const [playStatus, setPlayStatus] = useState(false);
  const [queue, setQueue] = useState([]);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolumeState] = useState(() => {
    const saved = Number(localStorage.getItem("music_volume"));
    return Number.isFinite(saved) && saved >= 0 ? Math.min(saved, 1) : 0.75;
  });
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    api("/songs")
      .then((data) => {
        setSongs(data);
        if (data.length) setTrack((current) => current || data[0]);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
    audioRef.current.muted = muted;
  }, [volume, muted, track]);

  const play = async () => {
    if (!audioRef.current || !track) return;
    try {
      await audioRef.current.play();
      setPlayStatus(true);
    } catch (error) {
      console.error("Playback failed:", error);
    }
  };

  const pause = () => {
    audioRef.current?.pause();
    setPlayStatus(false);
  };

  const playWithId = async (id) => {
    const selected = songs.find((song) => song._id === id);
    if (!selected) return;
    if (track?._id === id && audioRef.current) {
      if (audioRef.current.paused) await play();
      else pause();
      return;
    }
    playAfterLoad.current = true;
    setTrack(selected);
    try {
      await api(`/songs/${id}/play`, { method: "POST" });
    } catch (error) {
      console.error("Could not save play history:", error);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !track) return;

    const onLoaded = async () => {
      audio.volume = volume;
      audio.muted = muted;
      setTime(initialTime);
      if (playAfterLoad.current) {
        try {
          await audio.play();
          setPlayStatus(true);
        } catch (error) {
          console.error("Playback failed:", error);
        }
        playAfterLoad.current = false;
      }
    };

    const onTime = () => {
      const current = Math.floor(audio.currentTime || 0);
      const total = Math.floor(audio.duration || 0);
      setTime({
        currentTime: {
          second: current % 60,
          minutes: Math.floor(current / 60),
        },
        totalTime: { second: total % 60, minutes: Math.floor(total / 60) },
      });
      if (seekbar.current && total) {
        seekbar.current.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
      }
    };

    const onEnded = () => next();
    const onPause = () => setPlayStatus(false);
    const onPlay = () => setPlayStatus(true);

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("play", onPlay);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("play", onPlay);
    };
  }, [track, volume, muted, queue, shuffle, repeat, songs]);

  useEffect(() => {
    if (!track || !audioRef.current) return;
    audioRef.current.load();
    setTime(initialTime);
    if (seekbar.current) seekbar.current.style.width = "0%";
  }, [track]);

  const addToQueue = (id) => {
    const song = songs.find((item) => item._id === id);
    if (song)
      setQueue((current) =>
        current.some((item) => item._id === id) ? current : [...current, song],
      );
  };

  const playNext = (id) => {
    const song = songs.find((item) => item._id === id);
    if (song)
      setQueue((current) => [
        song,
        ...current.filter((item) => item._id !== id),
      ]);
  };

  const removeFromQueue = (index) =>
    setQueue((current) => current.filter((_, i) => i !== index));
  const clearQueue = () => setQueue([]);

  const next = () => {
    if (!track) return;
    if (queue.length) {
      const [first, ...rest] = queue;
      setQueue(rest);
      return playWithId(first._id);
    }

    const index = songs.findIndex((song) => song._id === track._id);
    if (shuffle && songs.length > 1) {
      let nextIndex = index;
      while (nextIndex === index)
        nextIndex = Math.floor(Math.random() * songs.length);
      return playWithId(songs[nextIndex]._id);
    }

    if (index < songs.length - 1) return playWithId(songs[index + 1]._id);
    if (repeat) return playWithId(songs[0]._id);
    setPlayStatus(false);
  };

  const previous = () => {
    if (!track) return;
    if (audioRef.current?.currentTime > 3) {
      audioRef.current.currentTime = 0;
      return;
    }
    const index = songs.findIndex((song) => song._id === track._id);
    if (index > 0) playWithId(songs[index - 1]._id);
  };

  const seekSong = (event) => {
    const audio = audioRef.current;
    if (!audio || !seekbg.current || !Number.isFinite(audio.duration)) return;
    const rect = seekbg.current.getBoundingClientRect();
    const ratio = Math.max(
      0,
      Math.min(1, (event.clientX - rect.left) / rect.width),
    );
    audio.currentTime = ratio * audio.duration;
  };

  const setVolume = (value) => {
    const nextVolume = Math.max(0, Math.min(1, Number(value)));
    setVolumeState(nextVolume);
    setMuted(nextVolume === 0);
    localStorage.setItem("music_volume", String(nextVolume));
  };

  const toggleMute = () => setMuted((current) => !current);

  return (
    <PlayerContext.Provider
      value={{
        audioRef,
        seekbg,
        seekbar,
        songs,
        setSongs,
        track,
        setTrack,
        playStatus,
        time,
        play,
        pause,
        playWithId,
        previous,
        next,
        seekSong,
        queue,
        addToQueue,
        playNext,
        removeFromQueue,
        clearQueue,
        shuffle,
        setShuffle,
        repeat,
        setRepeat,
        volume,
        setVolume,
        muted,
        toggleMute,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
