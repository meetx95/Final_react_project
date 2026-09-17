import {
  FaSearch,
  FaBell,
  FaPlay,
  FaChevronRight,
  FaHeart,
  FaStepBackward,
  FaStepForward,
  FaRandom,
  FaRedo,
  FaVolumeUp,
} from "react-icons/fa";
function Rightbar() {
  return (
    <div className="Rightbar">
      <div className="topbar">
        <div className="search-box">
          <FaSearch />
          <input type="text" placeholder="Search music, artists, albums..." />
        </div>

        <div className="top-actions">
          <div className="notification">
            <FaBell />
          </div>

          <div className="profile">M</div>
        </div>
      </div>

      <div className="welcome">
        <p>Good evening</p>
        <h1>What do you want to listen to?</h1>
      </div>

      <div className="hero">
        <div className="hero-content">
          <span>FEATURED MUSIC</span>

          <h2>After Hours</h2>

          <p>The Weeknd • Album</p>

          <button className="play-btn">
            <FaPlay />
            Play Now
          </button>
        </div>
      </div>

      {/* RECENTLY PLAYED */}
      <section className="section">
        <div className="section-header">
          <h2>Recently Played</h2>

          <span>
            See all <FaChevronRight />
          </span>
        </div>

        <div className="music-grid">
          <MusicCard
            title="After Hours"
            artist="The Weeknd"
            image="/assets/after-hours.jpg"
          />

          <MusicCard
            title="Starboy"
            artist="The Weeknd"
            image="/assets/starboy.jpg"
          />

          <MusicCard
            title="Love Again"
            artist="Dua Lipa"
            image="/assets/love-again.jpg"
          />

          <MusicCard
            title="Space Cadet"
            artist="Metro Boomin"
            image="/assets/space-cadet.jpg"
          />
        </div>
      </section>

      {/* RECOMMENDED */}
      <section className="section">
        <div className="section-header">
          <h2>Recommended for you</h2>

          <span>
            See all <FaChevronRight />
          </span>
        </div>

        <div className="recommend-grid">
          <div className="recommend-card">
            <div className="recommend-cover"></div>

            <h3>Night Drive</h3>
            <p>Chill • 20 songs</p>
          </div>

          <div className="recommend-card">
            <div className="recommend-cover"></div>

            <h3>Late Night</h3>
            <p>Dark Pop • 30 songs</p>
          </div>

          <div className="recommend-card">
            <div className="recommend-cover"></div>

            <h3>After Dark</h3>
            <p>R&B • 25 songs</p>
          </div>
        </div>
      </section>

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
    </div>
  );
}

/* MUSIC CARD */

function MusicCard({ title, artist, image }) {
  return (
    <div className="music-card">
      <div className="cover-container">
        <img src={image} alt={title} className="music-cover" />

        <button className="cover-play">
          <FaPlay />
        </button>
      </div>

      <h3>{title}</h3>
      <p>{artist}</p>
    </div>
  );
}

export default Rightbar;
