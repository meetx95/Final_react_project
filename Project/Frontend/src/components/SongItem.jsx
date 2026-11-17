import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlayerContext } from "../contex/PlayerContex";
import { FaEllipsis, FaPlay, FaPlus } from "react-icons/fa6";
import { mediaUrl } from "../api/api";

function SongItem({ id, name, desc, image }) {
  const { playWithId, addToQueue, playNext } = useContext(PlayerContext);
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);

  return (
    <article className="song-card" onMouseLeave={() => setMenu(false)}>
      <div
        className="song-image-wrapper"
        onClick={() => navigate(`/song/${id}`)}
      >
        <img src={image || mediaUrl()} alt={name} className="song-image" />
        <button
          aria-label={`Play ${name}`}
          className="song-play-button"
          onClick={(e) => {
            e.stopPropagation();
            playWithId(id);
          }}
        >
          <FaPlay />
        </button>
        <button
          aria-label="More options"
          className="song-more-button"
          onClick={(e) => {
            e.stopPropagation();
            setMenu((v) => !v);
          }}
        >
          <FaEllipsis />
        </button>
        {menu && (
          <div
            className="song-context-menu"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                playNext(id);
                setMenu(false);
              }}
            >
              <FaPlay /> Play next
            </button>
            <button
              onClick={() => {
                addToQueue(id);
                setMenu(false);
              }}
            >
              <FaPlus /> Add to queue
            </button>
            <button
              onClick={() => {
                navigate(`/song/${id}`);
                setMenu(false);
              }}
            >
              View song
            </button>
          </div>
        )}
      </div>
      <h3 onClick={() => navigate(`/song/${id}`)} title={name}>
        {name}
      </h3>
      <p title={desc}>{desc}</p>
    </article>
  );
}
export default SongItem;
