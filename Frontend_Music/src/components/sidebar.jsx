import React from "react";
import {
  FaHome,
  FaSearch,
  FaPlus,
  FaStackExchange,
  FaArrowAltCircleDown,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-container">
          {/* Home & Search */}
          <div className="sidebar-menu" onClick={() => navigate("/")}>
            <div className="sidebar-item">
              <div className="logo active">
                <FaHome />
                <span>Home</span>
              </div>

              <div className="logo">
                <FaSearch />
                <span>Search</span>
              </div>
            </div>
          </div>

          {/* Your Library */}
          <div className="library">
            <div className="library-header">
              <div className="library-title">
                <FaStackExchange />
                <p>Your Library</p>
              </div>

              <div className="library-actions">
                <FaPlus />
                <FaArrowAltCircleDown />
              </div>
            </div>

            {/* Create Playlist */}
            <div className="library-card">
              <h1>Create your first playlist</h1>

              <p>It's easy, we'll help you</p>

              <button>Create your playlist</button>
            </div>

            {/* Podcast */}
            <div className="library-card">
              <h1>Find some podcasts to follow</h1>

              <p>We'll keep you updated on the latest episodes</p>

              <button>Browse podcasts</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
