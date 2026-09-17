import {
  FaMusic,
  FaHome,
  FaSearch,
  FaHeart,
  FaBook,
  FaFolder,
  FaPlus,
  FaCog,
} from "react-icons/fa";

function Leftbar() {
  return (
    <div className="Leftbar">
      {/* Logo */}
      <div className="sidebar-logo">
        <FaMusic />
      </div>

      {/* Main Menu */}
      <div className="menu">
        <div className="logo active">
          <FaHome />
          <span className="tooltip">Home</span>
        </div>

        <div className="logo">
          <FaSearch />
          <span className="tooltip">Search</span>
        </div>

        <div className="logo">
          <FaHeart />
          <span className="tooltip">Liked Songs</span>
        </div>
      </div>

      {/* Library */}
      <div className="library">
        <div className="logo">
          <FaBook />
          <span className="tooltip">Library</span>
        </div>

        <div className="logo">
          <FaFolder />
          <span className="tooltip">Playlists</span>
        </div>

        <div className="logo">
          <FaPlus />
          <span className="tooltip">Create Playlist</span>
        </div>
      </div>

      {/* Bottom */}
      <div className="bottom-menu">
        <div className="logo">
          <FaCog />
          <span className="tooltip">Settings</span>
        </div>
      </div>
    </div>
  );
}

export default Leftbar;
