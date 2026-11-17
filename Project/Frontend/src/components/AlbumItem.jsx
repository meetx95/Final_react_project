import React from "react";
import { useNavigate } from "react-router-dom";

function AlbumItem({ image, name, desc, id }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="album-item"
      onClick={() => navigate(`/album/${id}`)}
    >
      <img
        src={image}
        alt={name}
        className="album-image"
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = "/MusicLogoI.jpg";
        }}
      />
      <span className="album-name">{name}</span>
      <span className="album-description">
        <span className="marquee-text">
          {desc || "Explore this collection"}
        </span>
      </span>
    </button>
  );
}
export default AlbumItem;
