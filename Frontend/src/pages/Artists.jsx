import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, mediaUrl } from "../api/api";

export default function Artists() {
  const [artists, setArtists] = useState([]);
  const nav = useNavigate();
  useEffect(() => {
    api("/artists").then(setArtists).catch(console.error);
  }, []);
  return (
    <div className="page-padding">
      <h1>All Artists</h1>
      <p className="muted">Discover artists and follow the ones you like.</p>
      <br />
      <div className="artist-grid">
        {artists.map((a) => (
          <div
            className="artist-card"
            key={a._id}
            onClick={() => nav(`/artist/${a._id}`)}
          >
            <img src={mediaUrl(a.image)} alt={a.name} />
            <h3>{a.name}</h3>
            <p>{a.followers || 0} followers</p>
          </div>
        ))}
      </div>
    </div>
  );
}
