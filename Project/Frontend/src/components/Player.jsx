import React, { useContext, useState } from "react";
import {
  FaBackwardStep,
  FaForwardStep,
  FaPlay,
  FaPause,
  FaShuffle,
  FaVolumeHigh,
  FaVolumeXmark,
  FaList,
  FaXmark,
  FaTrash,
  FaHeart,
  FaRepeat,
  FaHeadSideCough,
  FaHeadphones,
  FaHeadphonesSimple,
  FaCakeCandles,
  FaMegaport,
  FaMessage,
  FaMicrophoneLinesSlash,
  FaMicrophoneLines,
} from "react-icons/fa6";
import { PlayerContext } from "../contex/PlayerContex";
import { mediaUrl } from "../api/api";
import {
  FaHeading,
  FaHeadphonesAlt,
  FaMagento,
  FaMicrophoneAlt,
  FaMicrophoneAltSlash,
  FaMicrophoneSlash,
  FaMinus,
} from "react-icons/fa";
import { Fullscreen } from "lucide-react";

function Player() {
  const {
    seekbg,
    seekbar,
    track,
    playStatus,
    play,
    pause,
    previous,
    next,
    seekSong,
    queue,
    clearQueue,
    playWithId,
    removeFromQueue,
    shuffle,
    setShuffle,
    repeat,
    setRepeat,
    volume,
    setVolume,
    muted,
    toggleMute,
    time,
  } = useContext(PlayerContext);
  const [showQueue, setShowQueue] = useState(false);

  return (
    <>
      {showQueue && (
        <aside className="queue-panel">
          <div className="queue-head">
            <div>
              <span className="eyebrow">UP NEXT</span>
              <h2>
                Queue <small>{queue.length} songs</small>
              </h2>
            </div>
            <button className="icon-button" onClick={() => setShowQueue(false)}>
              <FaXmark />
            </button>
          </div>
          {!queue.length ? (
            <div className="empty-state">
              <FaList />
              <strong>Your queue is empty</strong>
              <span>Add songs from Browse or any song card.</span>
            </div>
          ) : (
            <>
              {queue.map((song, i) => (
                <div className="queue-item" key={`${song._id}-${i}`}>
                  <span className="queue-number">{i + 1}</span>
                  <img src={mediaUrl(song.coverImage)} alt="" />
                  <button
                    className="queue-song-info"
                    onClick={() => playWithId(song._id)}
                  >
                    <b>{song.title}</b>
                    <span>{song.artist?.name || "Unknown Artist"}</span>
                  </button>
                  <button
                    className="queue-remove"
                    onClick={() => removeFromQueue(i)}
                  >
                    <FaXmark />
                  </button>
                </div>
              ))}
              <button className="clear-queue" onClick={clearQueue}>
                <FaTrash /> Clear queue
              </button>
            </>
          )}
        </aside>
      )}

      <div className="player">
        <div className="current-song">
          <img
            src={mediaUrl(track?.coverImage)}
            alt=""
            className="player-song-image"
          />
          <div className="song-info">
            <p className="song-name">{track?.title || "Nothing playing"}</p>
            <p className="song-description">
              {track?.artist?.name || "Choose a song to start listening"}
            </p>
          </div>
          <button className="player-heart" title="Like">
            <FaHeart />
          </button>
        </div>

        <div className="player-controls">
          <div className="control-buttons">
            <button
              onClick={() => setShuffle(!shuffle)}
              className={`player-icon ${shuffle ? "active-control" : ""}`}
              title="Shuffle"
            >
              <FaShuffle />
            </button>
            <button onClick={previous} className="player-icon" title="Previous">
              <FaBackwardStep />
            </button>
            <button
              onClick={playStatus ? pause : play}
              className="play-button"
              title={playStatus ? "Pause" : "Play"}
            >
              {playStatus ? <FaPause /> : <FaPlay />}
            </button>
            <button onClick={next} className="player-icon" title="Next">
              <FaForwardStep />
            </button>
            <button
              onClick={() => setRepeat(!repeat)}
              className={`player-icon ${repeat ? "active-control" : ""}`}
              title="Repeat"
            >
              <FaRepeat />
            </button>
          </div>
          <div className="progress-container">
            <span className="time">{timeLabel(time.currentTime)}</span>
            <div ref={seekbg} onClick={seekSong} className="progress-bar">
              <div ref={seekbar} className="progress" />
            </div>
            <span className="time">{timeLabel(time.totalTime)}</span>
          </div>
        </div>

        <div className="extra-controls">
          <button
            className={`extra-button ${showQueue ? "active-control" : ""}`}
            title="Queue"
            onClick={() => setShowQueue(!showQueue)}
          >
            <FaList />
          </button>
          {/* mute button */}
          <button
            className="extra-button"
            onClick={toggleMute}
            title={muted ? "Unmute" : "Mute"}
          >
            {/* <FaMicrophone /> */}
            {muted || volume === 0 ? (
              <FaMicrophoneAltSlash />
            ) : (
              <FaMicrophoneAlt />
            )}
          </button>
          {/*
            <button
              className="extra-button"
              title="Fullscreen"
              onClick={Fullscreen}
            >
              <FaDesktop />
            </button>
          */}
          <div className="volume-container">
            <button
              className="volume-button"
              onClick={toggleMute}
              title={muted ? "Unmute" : "Mute"}
            >
              {muted || volume === 0 ? <FaVolumeXmark /> : <FaVolumeHigh />}
            </button>
            <input
              aria-label="Volume"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={muted ? 0 : volume}
              onChange={(e) => setVolume(e.target.value)}
            />
            <span className="volume-value">
              {Math.round((muted ? 0 : volume) * 100)}%
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
const timeLabel = (t) => `${t.minutes}:${String(t.second).padStart(2, "0")}`;
export default Player;
