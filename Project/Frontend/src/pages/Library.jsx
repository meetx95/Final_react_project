import { useEffect, useState, useContext } from "react";
import { FaPlay, FaHeart, FaMusic } from "react-icons/fa";
import { api, mediaUrl } from "../api/api";
import { useAuth } from "../contex/AuthContext";
import { useNavigate } from "react-router-dom";
import { PlayerContext } from "../contex/PlayerContex";

export default function Library() {
  const { user } = useAuth();
  const [liked, setLiked] = useState([]);
  const nav = useNavigate();
  const { playWithId } = useContext(PlayerContext);

  useEffect(() => {
    api("/users/liked-songs").then(setLiked).catch(console.error);
  }, []);

  return (
    <div className="page-padding">
      <div className="page-heading">
        <div>
          <span className="eyebrow">
            <FaHeart /> YOUR SONG COLLECTION
          </span>
          <h1>{user?.username}'s Library</h1>
          <p className="muted">Every track you have saved, ready to play.</p>
        </div>
        <button className="primary-action" onClick={() => nav("/browse")}>
          Find more music
        </button>
      </div>
      <div className="library-summary-card">
        <FaHeart />
        <div>
          <b>{liked.length}</b>
          <span>Liked songs</span>
        </div>
      </div>
      {liked.length ? (
        <div className="browse-song-list">
          {liked.map((s, i) => (
            <article className="browse-song-row" key={s._id}>
              <span className="row-number">
                {String(i + 1).padStart(2, "0")}
              </span>
              <img
                src={mediaUrl(s.coverImage)}
                alt=""
                onClick={() => nav(`/song/${s._id}`)}
              />
              <div
                className="browse-song-copy"
                onClick={() => nav(`/song/${s._id}`)}
              >
                <strong>{s.title}</strong>
                <span>
                  {s.artist?.name || "Unknown artist"} • {s.genre}
                </span>
              </div>
              <span className="browse-plays">{s.plays || 0} plays</span>
              <button className="row-play" onClick={() => playWithId(s._id)}>
                <FaPlay />
              </button>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-card">
          <FaMusic />
          <h2>Your library is waiting</h2>
          <p>Like songs while listening and they will appear here.</p>
          <button className="primary-action" onClick={() => nav("/browse")}>
            Browse music
          </button>
        </div>
      )}
    </div>
  );
}
