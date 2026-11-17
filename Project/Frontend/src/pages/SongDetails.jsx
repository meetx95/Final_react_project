import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaPlay,
  FaPlus,
  FaHeart,
  FaList,
  FaCheck,
  FaClock,
  FaArrowLeft,
} from "react-icons/fa";
import { api, mediaUrl } from "../api/api";
import { PlayerContext } from "../contex/PlayerContex";
import { useAuth } from "../contex/AuthContext";

export default function SongDetails() {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [liked, setLiked] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [showPlaylists, setShowPlaylists] = useState(false);
  const [added, setAdded] = useState("");
  const [related, setRelated] = useState([]);
  const { playWithId, addToQueue, playNext } = useContext(PlayerContext);
  const { user } = useAuth();
  const nav = useNavigate();
  useEffect(() => {
    api(`/songs/${id}`)
      .then((data) => {
        setSong(data);
        api(`/songs/search?q=${encodeURIComponent(data.genre || "")}`)
          .then((items) =>
            setRelated(
              items.filter((item) => item._id !== data._id).slice(0, 6),
            ),
          )
          .catch(() => setRelated([]));
      })
      .catch(console.error);
  }, [id]);
  const like = async () => {
    if (!user) return nav("/login");
    const d = await api(`/users/liked-songs/${id}/toggle`, { method: "POST" });
    setLiked(d.liked);
  };
  const openPlaylists = async () => {
    if (!user) return nav("/login");
    try {
      setPlaylists(await api("/playlists"));
      setShowPlaylists(true);
    } catch (e) {
      console.error(e);
    }
  };
  const addPlaylist = async (pid) => {
    try {
      await api(`/playlists/${pid}/songs/${id}`, { method: "POST" });
      setAdded(pid);
      setTimeout(() => setAdded(""), 1200);
    } catch (e) {
      alert(e.message);
    }
  };
  if (!song) return <div className="page-padding">Loading...</div>;
  return (
    <div className="page-padding song-detail">
      <button className="back-link" onClick={() => nav(-1)}>
        <FaArrowLeft />&thinsp;
        Back
      </button>
      <div className="detail-hero">
        <img src={mediaUrl(song.coverImage)} alt={song.title} />
        <div>
          <span className="eyebrow">NOW DISCOVERING</span>
          <h1>{song.title}</h1>
          <h3
            onClick={() => nav(`/artist/${song.artist?._id}`)}
            className="clickable"
          >
            {song.artist?.name || "Unknown Artist"}
          </h3>
          <p>
            {song.genre} • {song.plays || 0} plays
          </p>
          <div className="detail-actions">
            <button className="play-large" onClick={() => playWithId(song._id)}>
              <FaPlay />
            </button>
            <button onClick={() => addToQueue(song._id)}>
              <FaPlus /> Queue
            </button>
            <button onClick={() => playNext(song._id)}>
              <FaClock /> Play next
            </button>
            <button onClick={like}>
              <FaHeart /> {liked ? "Liked" : "Like"}
            </button>
            <button onClick={openPlaylists}>
              <FaList /> Add to playlist
            </button>
          </div>
        </div>
      </div>
      <section className="detail-section song-about-grid">
        <div>
          <span className="eyebrow">TRACK INFO</span>
          <h2>About this song</h2>
          <p>
            Listen to <b>{song.title}</b> by {song.artist?.name || "the artist"}{" "}
            and discover more music from the same sound.
          </p>
        </div>
        <div className="track-facts">
          <span>
            <b>Genre</b>
            {song.genre || "—"}
          </span>
          <span>
            <b>Plays</b>
            {(song.plays || 0).toLocaleString()}
          </span>
          <span>
            <b>Album</b>
            {song.album?.title || "Single"}
          </span>
        </div>
      </section>
      {related.length > 0 && (
        <section className="detail-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">KEEP LISTENING</span>
              <h2>Related songs</h2>
            </div>
          </div>
          <div className="related-song-grid">
            {related.map((item) => (
              <article className="related-song-card" key={item._id}>
                <img
                  src={mediaUrl(item.coverImage)}
                  alt=""
                  onClick={() => nav(`/song/${item._id}`)}
                />
                <div onClick={() => nav(`/song/${item._id}`)}>
                  <b>{item.title}</b>
                  <span>{item.artist?.name || item.genre}</span>
                </div>
                <button onClick={() => playWithId(item._id)}>
                  <FaPlay />
                </button>
              </article>
            ))}
          </div>
        </section>
      )}
      {showPlaylists && (
        <div
          className="playlist-modal-backdrop"
          onClick={() => setShowPlaylists(false)}
        >
          <div className="playlist-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <span className="eyebrow">SAVE TRACK</span>
                <h2>Add to playlist</h2>
              </div>
              <button onClick={() => setShowPlaylists(false)}>×</button>
            </div>
            {playlists.length ? (
              playlists.map((p) => (
                <button
                  className="playlist-option"
                  key={p._id}
                  onClick={() => addPlaylist(p._id)}
                >
                  <span className="mini-cover">
                    <img src={mediaUrl(p.songs?.[0]?.coverImage)} alt="" />
                  </span>
                  <span>
                    <b>{p.name}</b>
                    <small>{p.songs?.length || 0} songs</small>
                  </span>
                  {added === p._id ? <FaCheck /> : <FaPlus />}
                </button>
              ))
            ) : (
              <div className="empty-state">
                <FaList />
                <p>No playlists yet.</p>
                <button
                  className="primary-action"
                  onClick={() => nav("/playlists")}
                >
                  Create playlist
                </button>
              </div>
            )}
            <button
              className="new-playlist-link"
              onClick={() => nav("/playlists")}
            >
              + Create a new playlist
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
