import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { FaClock, FaPlay } from "react-icons/fa";
import { PlayerContext } from "../contex/PlayerContex";
import { api, mediaUrl } from "../api/api";

function DisplayAlbum() {
  const { id } = useParams();
  const { playWithId } = useContext(PlayerContext);

  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    api(`/albums/${id}`)
      .then(setAlbum)
      .catch((error) => {
        console.error(error);
        setAlbum(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="display-album">Loading album...</div>;
  }

  if (!album) {
    return <div className="display-album">Album not found.</div>;
  }

  return (
    <div className="display-album">
      <Navbar />

      <div className="album-header">
        <img
          className="album-cover"
          src={mediaUrl(album.coverImage)}
          alt={album.title}
        />

        <div className="album-info">
          <p className="album-type">Album</p>
          <h2 className="album-title">{album.title}</h2>
          <h4 className="album-desc">{album.description}</h4>
          <p className="album-category">{album.genre}</p>
          <p className="album-meta">
            <b>{album.artist?.name || "Unknown Artist"}</b>
            {" • "}
            {album.songs?.length || 0} songs
          </p>
        </div>
      </div>

      <div className="album-play-button">
        <button
          onClick={() => {
            if (album.songs?.length) {
              playWithId(album.songs[0]._id);
            }
          }}
        >
          <FaPlay /> Play
        </button>
      </div>

      <div className="song-header">
        <p>#</p>
        <p>Title</p>
        <p>Artist</p>
        <FaClock />
      </div>

      <hr />

      <div className="songs-list">
        {album.songs?.map((song, index) => (
          <div
            className="song-row"
            key={song._id}
            onClick={() => playWithId(song._id)}
          >
            <p>{index + 1}</p>
            <p className="song-title">
              <img
                className="song-row-image"
                src={mediaUrl(song.coverImage)}
                alt={song.title}
              />
              {song.title}
            </p>
            <p>{song.artist?.name || "Unknown Artist"}</p>
            <p className="song-duration">
              {Math.floor(song.duration / 60)}:
              {String(song.duration % 60).padStart(2, "0")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DisplayAlbum;
