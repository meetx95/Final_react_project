import React, { useContext } from "react";

import {
  FaBackwardStep,
  FaForwardStep,
  FaMinimize,
  FaPlay,
  FaPause,
  FaShuffle,
  FaMicrophone,
  FaVolumeXmark,
} from "react-icons/fa6";

import { FaList, FaDesktop, FaCircle } from "react-icons/fa";

import { PlayerContext } from "../contex/PlayerContex";

function Player() {
  const {
    audioRef,
    seekbg,
    seekbar,
    track,
    playStatus,
    play,
    pause,
    time,
    previous,
    next,
    seekSong,
  } = useContext(PlayerContext);

  return (
    <div className="player">
      {/* Audio */}
      <audio ref={audioRef} src={track.file} />

      {/* Current Song */}
      <div className="current-song">
        <img src={track.image} alt={track.name} className="player-song-image" />

        <div className="song-info">
          <p className="song-name">{track.name}</p>

          <p className="song-description">{track.desc?.slice(0, 30)}</p>
        </div>
      </div>

      {/* Main Player */}
      <div className="player-controls">
        {/* Control Buttons */}
        <div className="control-buttons">
          <button className="player-icon" title="Shuffle">
            <FaShuffle />
          </button>

          <button onClick={previous} className="player-icon" title="Previous">
            <FaBackwardStep />
          </button>

          {/* Play / Pause */}
          {playStatus ? (
            <button onClick={pause} className="play-button" title="Pause">
              <FaPause />
            </button>
          ) : (
            <button onClick={play} className="play-button" title="Play">
              <FaPlay />
            </button>
          )}

          <button onClick={next} className="player-icon" title="Next">
            <FaForwardStep />
          </button>

          <button className="player-icon" title="Repeat">
            <FaCircle />
          </button>
        </div>

        {/* Progress */}
        <div className="progress-container">
          <span className="time">
            {time.currentTime.minutes}:
            {String(time.currentTime.second).padStart(2, "0")}
          </span>

          <div ref={seekbg} onClick={seekSong} className="progress-bar">
            <div ref={seekbar} className="progress"></div>
          </div>

          <span className="time">
            {time.totalTime.minutes}:
            {String(time.totalTime.second).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="extra-controls">
        <button className="extra-button" title="Now Playing">
          <FaPlay />
        </button>

        <button className="extra-button" title="Lyrics">
          <FaMicrophone />
        </button>

        <button className="extra-button" title="Queue">
          <FaList />
        </button>

        <button className="extra-button" title="Connect to Device">
          <FaDesktop />
        </button>

        <div className="volume-container">
          <FaVolumeXmark className="volume-icon" />

          <div className="volume-bar">
            <div className="volume"></div>
          </div>
        </div>

        <button className="extra-button" title="Miniplayer">
          <FaMinimize />
        </button>
      </div>
    </div>
  );
}

export default Player;
