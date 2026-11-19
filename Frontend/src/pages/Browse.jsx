import { useEffect, useMemo, useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FaPlay, FaSearch, FaUser, FaMusic } from "react-icons/fa";
import { api, mediaUrl } from "../api/api";
import { PlayerContext } from "../contex/PlayerContex";

export default function Browse() {
  const [params, setParams] = useSearchParams();
  const initial = params.get("query") || "";
  const [query, setQuery] = useState(initial);
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);
  const { playWithId } = useContext(PlayerContext);
  const nav = useNavigate();

  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const q = query.trim();
        if (!q) {
          const [allSongs, allArtists] = await Promise.all([
            api("/songs"),
            api("/artists"),
          ]);
          setSongs(allSongs);
          setArtists(allArtists);
        } else {
          const data = await api(`/songs/search?q=${encodeURIComponent(q)}`);
          setSongs(data);
          const allArtists = await api("/artists");
          setArtists(
            allArtists.filter((a) =>
              a.name.toLowerCase().includes(q.toLowerCase()),
            ),
          );
        }
        setParams(q ? { query: q } : {}, { replace: true });
      } catch (e) {
        console.error(e);
        setSongs([]);
        setArtists([]);
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [query]);

  const popularSongs = useMemo(
    () => [...songs].sort((a, b) => (b.plays || 0) - (a.plays || 0)),
    [songs],
  );

  return (
    <div className="page-padding browse-page">
      <div className="browse-hero">
        <span className="eyebrow">DISCOVER YOUR SOUND</span>
        <h1>Browse music</h1>
        <p>Search songs, genres and artists, then start playing instantly.</p>
        <div className="browse-search">
          <FaSearch />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a song, artist or genre..."
            autoFocus
          />
          {query && <button onClick={() => setQuery("")}>Clear</button>}
        </div>
      </div>

      {loading ? (
        <div className="loading-inline">Finding music...</div>
      ) : (
        <>
          {artists.length > 0 && (
            <section className="browse-section">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">PEOPLE</span>
                  <h2>Artists</h2>
                </div>
              </div>
              <div className="artist-grid browse-artists">
                {artists.slice(0, 12).map((a) => (
                  <article
                    className="artist-card"
                    key={a._id}
                    onClick={() => nav(`/artist/${a._id}`)}
                  >
                    <img src={mediaUrl(a.image)} alt={a.name} />
                    <h3>{a.name}</h3>
                    <p>{a.followers || 0} followers</p>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section className="browse-section">
            <div className="section-heading">
              <div>
                <span className="eyebrow">TRACKS</span>
                <h2>{query ? `Results for “${query}”` : "Popular songs"}</h2>
              </div>
              <span className="muted">{popularSongs.length} songs</span>
            </div>
            {popularSongs.length ? (
              <div className="browse-song-list">
                {popularSongs.map((s, i) => (
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
                    <button
                      className="row-play"
                      onClick={() => playWithId(s._id)}
                    >
                      <FaPlay />
                    </button>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-card">
                <FaMusic />
                <h2>No music found</h2>
                <p>Try another song, artist or genre.</p>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
