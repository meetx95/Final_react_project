import {
  FaHeart,
  FaStepBackward,
  FaPlay,
  FaStepForward,
  FaRandom,
  FaRedo,
  FaVolumeUp,
} from "react-icons/fa";

function Player() {
  return (
    <div className="player">
      {/* LEFT - SONG INFO */}
      <div className="player-song">
        <img src="/assets/after-hours.jpg" alt="After Hours" />

        <div className="song-info">
          <h4>After Hours</h4>
          <p>The Weeknd</p>
        </div>

        <button className="icon-btn">
          <FaHeart />
        </button>
      </div>

      {/* CENTER - CONTROLS */}
      <div className="player-center">
        <div className="player-controls">
          <button className="control-btn">
            <FaRandom />
          </button>

          <button className="control-btn">
            <FaStepBackward />
          </button>

          <button className="play-main">
            <FaPlay />
          </button>

          <button className="control-btn">
            <FaStepForward />
          </button>

          <button className="control-btn">
            <FaRedo />
          </button>
        </div>

        {/* PROGRESS */}
        <div className="progress-area">
          <span>1:42</span>

          <div className="progress-bar">
            <div className="progress"></div>
          </div>

          <span>3:55</span>
        </div>
      </div>

      {/* RIGHT - VOLUME */}
      <div className="player-volume">
        <FaVolumeUp />

        <input type="range" min="0" max="100" defaultValue="70" />
      </div>
    </div>
  );
}

export default Player;
