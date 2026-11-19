import { useNavigate } from "react-router-dom";
import {
  FaArrowCircleUp,
  FaCompactDisc,
  FaHeart,
  FaMusic,
} from "react-icons/fa";
import { FaSquareArrowUpRight } from "react-icons/fa6";
export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="simple-home">
      <header className="simple-nav">
        <button
          className="simple-logo"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span className="simple-logo-mark">
            <FaCompactDisc />
          </span>{" "}
          Music Player
        </button>
        <div className="simple-nav-actions">
          <button className="simple-login" onClick={() => navigate("/login")}>
            Log in
          </button>
          <button
            className="simple-signup"
            onClick={() => navigate("/register")}
          >
            Sign up
          </button>
        </div>
      </header>

      <main className="simple-home-main">
        <section className="simple-hero">
          <div className="simple-badge">YOUR MUSIC, YOUR WAY</div>
          <h1>
            Listen to what
            <br />
            <span>you love.</span>
          </h1>
          <p>
            Discover music, create playlists and enjoy your favorite songs in
            one simple place.
          </p>
          <div className="simple-actions">
            <button
              className="simple-primary"
              onClick={() => navigate("/register")}
            >
              Get started
            </button>
            <button
              className="simple-secondary"
              onClick={() => navigate("/login")}
            >
              Log in
            </button>
          </div>
        </section>

        <section className="simple-features">
          <div>
            <b>
              <FaCompactDisc />
            </b>
            <h3>Discover music</h3>
            <p>Find songs and artists you will love.</p>
          </div>
          <div>
            <b>
              <FaMusic />
            </b>
            <h3>Create playlists</h3>
            <p>Make playlists for every mood.</p>
          </div>
          <div>
            <span>
              <b>
                <FaHeart />
              </b>
              <h3>Save favorites</h3>
            </span>
            <p>Keep your favorite music close.</p>
          </div>
        </section>
      </main>

      <footer className="simple-footer">
        <span>Music Player</span>
      </footer>
    </div>
  );
}
