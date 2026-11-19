import React, { useEffect, useRef, useState } from "react";
import {
  FaSearch,
  FaArrowLeft,
  FaArrowRight,
  FaTimes,
  FaUser,
  FaPlay,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { api, mediaUrl } from "../api/api";
import { useAuth } from "../contex/AuthContext";
import { PlayerContext } from "../contex/PlayerContex";

function Navbar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { playWithId } = React.useContext(PlayerContext);
  const searchRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }
      try {
        setResults(await api(`/songs/search?q=${encodeURIComponent(query)}`));
      } catch {
        setResults([]);
      }
    }, 220);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <header className="navbar">
      <div className="navbar-left">
        <div className="nav-history-buttons">
          <button onClick={() => window.history.back()}>
            <FaArrowLeft />
          </button>
          <button onClick={() => window.history.forward()}>
            <FaArrowRight />
          </button>
        </div>
        <div
          className={`search-container ${focused ? "focused" : ""}`}
          ref={searchRef}
        >
          <FaSearch />
          <input
            value={query}
            onFocus={() => setFocused(true)}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What do you want to play?"
          />
          {query && (
            <button className="clear-search" onClick={() => setQuery("")}>
              <FaTimes />
            </button>
          )}
        </div>
        {focused && results.length > 0 && (
          <div className="search-results">
            <button
              className="search-see-all"
              onClick={() => {
                navigate(`/browse?query=${encodeURIComponent(query)}`);
                setFocused(false);
              }}
            >
              Search all results for “{query}”
            </button>
            {results.map((song) => (
              <div className="search-result-item" key={song._id}>
                <img src={mediaUrl(song.coverImage)} alt="" />
                <button
                  className="search-result-main"
                  onClick={() => {
                    playWithId(song._id);
                    setQuery("");
                    setFocused(false);
                  }}
                >
                  <span>
                    <b>{song.title}</b>
                    <small>
                      {song.artist?.name || "Unknown Artist"} • {song.genre}
                    </small>
                  </span>
                  <FaPlay className="search-play" />
                </button>
                <button
                  className="search-detail"
                  onClick={() => {
                    navigate(`/song/${song._id}`);
                    setQuery("");
                    setFocused(false);
                  }}
                >
                  View
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="navbar-actions">
        {user ? (
          <>
            <button
              className="profile-pill"
              onClick={() => navigate("/profile")}
            >
              <span>
                <FaUser />
              </span>
              {user.username}
            </button>
            <button className="logout-button" onClick={logout}>
              Log out
            </button>
          </>
        ) : (
          <>
            <button className="text-action" onClick={() => navigate("/login")}>
              Log in
            </button>
            <button
              className="signup-action"
              onClick={() => navigate("/register")}
            >
              Sign up
            </button>
          </>
        )}
      </div>
    </header>
  );
}
export default Navbar;
