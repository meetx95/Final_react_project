import { useEffect, useState, useContext } from "react";
import { FaPlay, FaHistory, FaClock } from "react-icons/fa";
import { api, mediaUrl } from "../api/api";
import { PlayerContext } from "../contex/PlayerContex";
import { useNavigate } from "react-router-dom";

export default function History() {
  const [rows, setRows] = useState([]);
  const { playWithId } = useContext(PlayerContext);
  const nav = useNavigate();

  useEffect(() => {
    api("/users/history").then(setRows).catch(console.error);
  }, []);

  return (
    <div className="page-padding history-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">
            <FaHistory /> YOUR LISTENING
          </span>
          <h1>Recently Played</h1>
          <p className="muted">
            Pick up where you left off and replay your recent favorites.
          </p>
        </div>
      </div>
      {rows.length ? (
        <div className="history-list">
          {rows.map(
            (row, index) =>
              row.song && (
                <article className="history-row" key={row._id}>
                  <span className="history-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <img
                    src={mediaUrl(row.song.coverImage)}
                    alt=""
                    onClick={() => nav(`/song/${row.song._id}`)}
                  />
                  <div
                    className="history-main"
                    onClick={() => nav(`/song/${row.song._id}`)}
                  >
                    <b>{row.song.title}</b>
                    <span>
                      {row.song.artist?.name || "Unknown artist"} •{" "}
                      {row.song.genre}
                    </span>
                  </div>
                  <time>
                    {new Date(row.playedAt).toLocaleString([], {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </time>
                  <button
                    className="row-play"
                    onClick={() => playWithId(row.song._id)}
                  >
                    <FaPlay />
                  </button>
                </article>
              ),
          )}
        </div>
      ) : (
        <div className="empty-card">
          <FaClock />
          <h2>Your listening history is empty</h2>
          <p>Play a song and it will appear here.</p>
          <button className="primary-action" onClick={() => nav("/browse")}>
            Find music
          </button>
        </div>
      )}
    </div>
  );
}
