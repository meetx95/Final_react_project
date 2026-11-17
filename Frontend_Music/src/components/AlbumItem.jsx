import React from "react";
import { useNavigate } from "react-router-dom";

function AlbumItem({ image, name, desc, id }) {
  const navigate = useNavigate();

  return (
    <div
      className="album-item"
      onClick={() => navigate(`/album/${id}`)}
    >
      <img
        src={image}
        alt={name}
        className="album-image"
      />

      <p className="album-name">{name}</p>

      <p className="album-description">{desc}</p>
    </div>
  );
}

export default AlbumItem;