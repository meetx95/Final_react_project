import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPlay,
  FaHeart,
  FaHistory,
  FaList,
  FaUser,
  FaUserPlus,
} from "react-icons/fa";
import { api, mediaUrl } from "../api/api";
import { useAuth } from "../contex/AuthContext";
import { PlayerContext } from "../contex/PlayerContex";

export default function Profile() {
  const { user } = useAuth();
  const { playWithId } = useContext(PlayerContext);
  const [history, setHistory] = useState([]);
  const [liked, setLiked] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    Promise.all([
      api("/users/history"),
      api("/users/liked-songs"),
      api("/playlists"),
    ])
      .then(([h, l, p]) => {
        setHistory(h);
        setLiked(l);
        setPlaylists(p);
      })
      .catch(console.error);
  }, []);

  const initials = (user?.username || "U").slice(0, 1).toUpperCase();

  return (
    <div className="page-padding profile-page">
      <section className="profile-hero">
        <div className="profile-avatar-large">{initials}</div>
        <div className="profile-copy">
          <span className="eyebrow">YOUR PROFILE</span>
          <h1>{user?.username || "Music lover"}</h1>
          <p>{user?.email}</p>
          <div className="profile-stats">
            <span>
              <b>{liked.length}</b> liked songs
            </span>
            <span>
              <b>{history.length}</b> recent plays
            </span>
            <span>
              <b>{playlists.length}</b> playlists
            </span>
            <span>
              <b>{user?.followedArtists?.length || 0}</b> following
            </span>
          </div>
        </div>
      </section>

      <section className="profile-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">QUICK ACCESS</span>
            <h2>Your music</h2>
          </div>
        </div>
        <div className="profile-shortcuts">
          <button onClick={() => nav("/liked")}>
            <span>
              <FaHeart />
            </span>
            <b>Liked Songs</b>
            <small>{liked.length} tracks</small>
          </button>
          <button onClick={() => nav("/history")}>
            <span>
              <FaHistory />
            </span>
            <b>Recently Played</b>
            <small>{history.length} tracks</small>
          </button>
          <button onClick={() => nav("/playlists")}>
            <span>
              <FaList />
            </span>
            <b>Playlists</b>
            <small>{playlists.length} playlists</small>
          </button>
          <button onClick={() => nav("/artists")}>
            <span>
              <FaUserPlus />
            </span>
            <b>Artists</b>
            <small>{user?.followedArtists?.length || 0} followed</small>
          </button>
        </div>
      </section>

      <section className="profile-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">LISTEN AGAIN</span>
            <h2>Recently played</h2>
          </div>
          {/* <button className="section-link" onClick={() => nav("/history")}>
            <span>View all</span>
          </button> */}
          <span className="section-link" onClick={() => nav("/history")}>View all</span>
        </div>

        <div className="profile-recent-grid">
          {history.slice(0, 6).map(
            (row) =>
              row.song && (
                <article
                  className="profile-recent-card"
                  key={row._id}
                  onClick={() => playWithId(row.song._id)}
                >
                  <img src={mediaUrl(row.song.coverImage)} alt="" />
                  <div>
                    <b>{row.song.title}</b>
                    <span>{row.song.artist?.name}</span>
                  </div>
                  <button>
                    <FaPlay />
                  </button>
                </article>
              ),
          )}
        </div>
      </section>

      <section className="profile-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">FOLLOWING</span>
            <h2>Artists you follow</h2>
          </div>
        </div>
        {user?.followedArtists?.length ? (
          <div className="followed-list">
            {user.followedArtists.map((a) => (
              <button key={a._id} onClick={() => nav(`/artist/${a._id}`)}>
                <img src={mediaUrl(a.image)} alt="" />
                <span>{a.name}</span>
                <FaUser />
              </button>
            ))}
          </div>
        ) : (
          <div className="empty-card">
            <FaUser />
            <h2>Discover artists</h2>
            <p>Follow artists to keep them close to your profile.</p>
            <button className="primary-action" onClick={() => nav("/artists")}>
              Browse artists
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
