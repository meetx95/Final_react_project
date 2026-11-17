import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      {/* Top Navbar */}
      <div className="navbar-top">
        <div className="navbar-buttons">
          <FaChevronLeft onClick={() => navigate(-1)} className="nav-button" />
          <FaChevronRight onClick={() => navigate(1)} className="nav-button" />
        </div>

        <div className="navbar-actions">
          <p className="premium-button">Explore Premium</p>
          {/* <p className="install-button">Install App</p> */}
          <p className="install-button">Spotify</p>
          <p className="profile-button">M</p>
        </div>
      </div>

      {/* Music Options */}
      <div className="music-filters">
        <p className="filter-button active">All</p>
        <p className="filter-button">Music</p>
        <p className="filter-button">Podcast</p>
      </div>
    </div>
  );
}

export default Navbar;
