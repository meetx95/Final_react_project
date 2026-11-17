import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
  const audioRef = useRef(null);
  const seekbg = useRef(null);
  const seekbar = useRef(null);

  const [track, setTrack] = useState(songsData[0]);

  const [playStatus, setPlayStatus] = useState(false);

  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minutes: 0,
    },
    totalTime: {
      second: 0,
      minutes: 0,
    },
  });

  // Play
  const play = async () => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
      setPlayStatus(true);
    } catch (error) {
      console.error("Audio play error:", error);
    }
  };

  // Pause
  const pause = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setPlayStatus(false);
  };

  // play on id
  const playWithId = async (id) => {
    await setTrack(songsData[id]);
    await audioRef.current.play();
    setPlayStatus(true);
  };

  // next abd previous
  const previous = async () => {
    if (track.id > 0) {
      await setTrack(songsData[track.id - 1]);
      await audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const next = async () => {
    if (track.id < songsData.length - 1) {
      await setTrack(songsData[track.id + 1]);
      await audioRef.current.play();
      setPlayStatus(true);
    }
  };

  // seek
  const seekSong = async (e) => {
    // console.log(e);
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekbg.current.offsetWidth) *
      audioRef.current.duration;
  };

  // playing audio time
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateTime = () => {
      const currentSeconds = Math.floor(audio.currentTime || 0);
      const totalSeconds = Math.floor(audio.duration || 0);
      setTime({
        currentTime: {
          second: currentSeconds % 60,
          minutes: Math.floor(currentSeconds / 60),
        },
        totalTime: {
          second: totalSeconds % 60,
          minutes: Math.floor(totalSeconds / 60),
        },
      });

      // progress bar
      if (seekbar.current && totalSeconds > 0) {
        const progress = (audio.currentTime / audio.duration) * 100;
        seekbar.current.style.width = `${progress}%`;
      }
    };

    const loadDuration = () => {
      const totalSeconds = Math.floor(audio.duration || 0);
      setTime((prev) => ({
        ...prev,
        totalTime: {
          second: totalSeconds % 60,
          minutes: Math.floor(totalSeconds / 60),
        },
      }));
    };

    // When song ends
    const handleEnded = () => {
      setPlayStatus(false);
      setTime((prev) => ({
        ...prev,
        currentTime: {
          second: 0,
          minutes: 0,
        },
      }));
      if (seekbar.current) {
        seekbar.current.style.width = "0%";
      }
    };
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", loadDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", loadDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  // Reset time when track changes
  useEffect(() => {
    setTime({
      currentTime: {
        second: 0,
        minutes: 0,
      },
      totalTime: {
        second: 0,
        minutes: 0,
      },
    });

    setPlayStatus(false);

    if (seekbar.current) {
      seekbar.current.style.width = "0%";
    }

    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [track]);

  const contextValue = {
    audioRef,
    seekbg,
    seekbar,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
