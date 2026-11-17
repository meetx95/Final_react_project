import React, { useContext } from "react";
import { PlayerContext } from "../contex/PlayerContex";

function SongsItem({ image, name, desc, id }) {
  const { playWithId } = useContext(PlayerContext);

  return (
    <div onClick={() => playWithId(id)} className="song-item">
      <img className="song-image" src={image} alt={name} />
      <p className="song-name">{name}</p>
      <p className="song-description">{desc}</p>
    </div>
  );
}

export default SongsItem;
