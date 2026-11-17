import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaMusic, FaPlay, FaTrash, FaPlus } from "react-icons/fa";
import { api, mediaUrl } from "../api/api";
import { PlayerContext } from "../contex/PlayerContex";

export default function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);
  const [selected, setSelected] = useState(null);
  const { playWithId } = useContext(PlayerContext);
  const nav = useNavigate();

  const load = () => api("/playlists").then(setPlaylists).catch(console.error);
  useEffect(() => {
    load();
  }, []);

  const create = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      const p = await api("/playlists", {
        method: "POST",
        body: JSON.stringify({ name }),
      });
      setPlaylists((prev) => [p, ...prev]);
      setName("");
      setCreating(false);
    } catch (e) {
      alert(e.message);
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this playlist?")) return;
    await api(`/playlists/${id}`, { method: "DELETE" });
    setPlaylists((prev) => prev.filter((p) => p._id !== id));
    if (selected?._id === id) setSelected(null);
  };

  return (
    <div className="page-padding playlist-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">YOUR MUSIC</span>
          <h1>Playlists</h1>
          <p className="muted">
            Create as many playlists as you want and keep every mood organized.
          </p>
        </div>
        <button className="primary-action" onClick={() => setCreating(true)}>
          <FaPlus /> New playlist
        </button>
      </div>

      {creating && (
        <form className="create-playlist" onSubmit={create}>
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Playlist name"
          />
          <button className="primary-action">Create</button>
          <button
            type="button"
            className="ghost-action"
            onClick={() => setCreating(false)}
          >
            Cancel
          </button>
        </form>
      )}

      {!playlists.length ? (
        <div className="empty-card">
          <FaMusic />
          <h2>Create your first playlist</h2>
          <p>
            Make a playlist for studying, driving, late nights or anything else.
          </p>
        </div>
      ) : (
        <div className="playlist-grid">
          {playlists.map((p) => (
            <div
              className="playlist-card"
              key={p._id}
              onClick={() => setSelected(p)}
            >
              <div className="playlist-cover">
                <img src={mediaUrl(p.songs?.[0]?.coverImage)} alt="" />
                <div
                  className="playlist-play"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (p.songs?.[0]) playWithId(p.songs[0]._id);
                  }}
                >
                  <FaPlay />
                </div>
              </div>
              <div className="playlist-card-body">
                <h3>{p.name}</h3>
                <p>{p.songs?.length || 0} songs</p>
                <button
                  title="Delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(p._id);
                  }}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div className="playlist-detail">
          <div className="playlist-detail-head">
            <div>
              <span className="eyebrow">PLAYLIST</span>
              <h2>{selected.name}</h2>
              <p>{selected.songs?.length || 0} songs</p>
            </div>
            <button className="ghost-action" onClick={() => setSelected(null)}>
              Close
            </button>
          </div>
          <div className="playlist-track-list">
            {selected.songs?.map((s, i) => (
              <div
                className="playlist-track"
                key={s._id}
                onClick={() => playWithId(s._id)}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                <img src={mediaUrl(s.coverImage)} alt="" />
                <div>
                  <b>{s.title}</b>
                  <p>{s.artist?.name}</p>
                </div>
                <FaPlay />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
