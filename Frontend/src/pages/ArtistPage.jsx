import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlay, FaUserPlus, FaMusic, FaArrowRight } from "react-icons/fa";
import { api, mediaUrl } from "../api/api";
import { PlayerContext } from "../contex/PlayerContex";
import { useAuth } from "../contex/AuthContext";

export default function ArtistPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [following, setFollowing] = useState(false);
  const { playWithId } = useContext(PlayerContext);
  const { user } = useAuth();
  const nav = useNavigate();
  useEffect(() => {
    api(`/artists/${id}`)
      .then((d) => {
        setData(d);
        setFollowing(
          !!user?.followedArtists?.some((a) => (a._id || a).toString() === id),
        );
      })
      .catch(console.error);
  }, [id, user]);
  const follow = async () => {
    if (!user) return nav("/login");
    const d = await api(`/artists/${id}/follow`, { method: "POST" });
    setFollowing(d.following);
    setData({ ...data, artist: { ...data.artist, followers: d.followers } });
  };
  if (!data) return <div className="page-padding">Loading...</div>;
  return (
    <div className="page-padding artist-page">
      <div className="artist-hero">
        <img src={mediaUrl(data.artist.image)} alt={data.artist.name} />
        <div>
          <span>Artist</span>
          <h1>{data.artist.name}</h1>
          <p>{data.artist.bio || "Artist profile"}</p>
          <p>{data.artist.followers || 0} followers</p>
          <button onClick={follow}>
            <FaUserPlus /> {following ? "Following" : "Follow"}
          </button>
        </div>
      </div>
      <div className="artist-summary">
        <div>
          <FaMusic />
          <b>{data.songs.length}</b>
          <span>tracks</span>
        </div>
        <div>
          <FaUserPlus />
          <b>{data.artist.followers || 0}</b>
          <span>followers</span>
        </div>
        <div>
          <FaArrowRight />
          <b>{data.artist.bio ? "Active" : "Independent"}</b>
          <span>profile</span>
        </div>
      </div>
      <div className="artist-songs">
        <h2>Popular songs</h2>
        {data.songs.map((s, i) => (
          <div className="artist-song-row" key={s._id}>
            <b>{i + 1}</b>
            <img src={mediaUrl(s.coverImage)} alt="" />
            <div
              className="artist-song-main"
              onClick={() => nav(`/song/${s._id}`)}
            >
              <strong>{s.title}</strong>
              <span>{s.genre}</span>
            </div>
            <span>{s.plays || 0} plays</span>
            <button onClick={() => playWithId(s._id)}>
              <FaPlay />
            </button>
          </div>
        ))}
      </div>
      {data.songs.length > 3 && (
        <section className="artist-related">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                MORE FROM {data.artist.name.toUpperCase()}
              </span>
              <h2>Recommended tracks</h2>
            </div>
          </div>
          <div className="artist-related-grid">
            {data.songs.slice(0, 4).map((s) => (
              <article className="related-song-card" key={`related-${s._id}`}>
                <img
                  src={mediaUrl(s.coverImage)}
                  alt=""
                  onClick={() => nav(`/song/${s._id}`)}
                />
                <div onClick={() => nav(`/song/${s._id}`)}>
                  <b>{s.title}</b>
                  <span>
                    {s.genre} • {s.plays || 0} plays
                  </span>
                </div>
                <button onClick={() => playWithId(s._id)}>
                  <FaPlay />
                </button>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
