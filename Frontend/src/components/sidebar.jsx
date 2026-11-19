import React from "react";
import {
  FaHome,
  FaSearch,
  FaPlus,
  FaHeart,
  FaHistory,
  FaMusic,
  FaList,
  FaCompactDisc,
  FaUser,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contex/AuthContext";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const active = (path) =>
    location.pathname === path ||
    (path !== "/" && location.pathname.startsWith(path));
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="brand" onClick={() => navigate("/home")}>
          <div className="brand-mark">
            <FaCompactDisc />
          </div>
          <span>Player</span>
        </div>
        <nav className="main-nav">
          <button
            className={active("/home") ? "nav-item active" : "nav-item"}
            onClick={() => navigate("/home")}
          >
            <FaHome />
            <span>Home</span>
          </button>
          <button
            className={active("/browse") ? "nav-item active" : "nav-item"}
            onClick={() => navigate("/browse")}
          >
            <FaSearch />
            <span>Browse & Search</span>
          </button>
          <button
            className={active("/artists") ? "nav-item active" : "nav-item"}
            onClick={() => navigate("/artists")}
          >
            <FaCompactDisc />
            <span>Artists</span>
          </button>
        </nav>
      </div>
      <div className="library-panel">
        <div className="library-header">
          <button
            className="library-heading"
            onClick={() => user && navigate("/library")}
          >
            <FaMusic />
            <span>Your Library</span>
          </button>
          {user && (
            <button
              className="icon-button"
              title="Create playlist"
              onClick={() => navigate("/playlists")}
            >
              <FaPlus />
            </button>
          )}
        </div>
        {user ? (
          <div className="library-links">
            <button
              className={
                active("/liked") ? "library-link active" : "library-link"
              }
              onClick={() => navigate("/liked")}
            >
              <span className="library-icon liked">
                <FaHeart />
              </span>
              <span>Liked Songs</span>
            </button>
            <button
              className={
                active("/history") ? "library-link active" : "library-link"
              }
              onClick={() => navigate("/history")}
            >
              <span className="library-icon">
                <FaHistory />
              </span>
              <span>Recently played</span>
            </button>
            <button
              className={
                active("/playlists") ? "library-link active" : "library-link"
              }
              onClick={() => navigate("/playlists")}
            >
              <span className="library-icon">
                <FaList />
              </span>
              <span>Playlists</span>
            </button>
            <button
              className={
                active("/library") ? "library-link active" : "library-link"
              }
              onClick={() => navigate("/library")}
            >
              <span className="library-icon">
                <FaMusic />
              </span>
              <span>My music</span>
            </button>
            <button
              className={
                active("/profile") ? "library-link active" : "library-link"
              }
              onClick={() => navigate("/profile")}
            >
              <span className="library-icon">
                <FaUser />
              </span>
              <span>Profile</span>
            </button>
          </div>
        ) : (
          <div className="login-library-card">
            <div className="mini-library-icon">
              <FaMusic />
            </div>
            <h3>Build your library</h3>
            <p>
              Save songs, create playlists and keep your listening history in
              one place.
            </p>
            <button onClick={() => navigate("/login")}>Log in</button>
          </div>
        )}
        {user && (
          <div className="sidebar-footer">
            <span>Music Fot Everyone</span>
            {/* <span>•</span> */}
            {/* <span>player</span> */}
          </div>
        )}
      </div>
    </aside>
  );
}
export default Sidebar;
