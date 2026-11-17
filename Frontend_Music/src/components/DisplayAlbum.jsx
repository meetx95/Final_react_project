import React, { useContext } from "react";
import Navbar from "./Navbar";
import { FaHeart, FaPlay } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { albumsData, songsData } from "../assets/assets";
import { FaClock, FaSpotify } from "react-icons/fa";
import { PlayerContext } from "../contex/PlayerContex";

function DisplayAlbum() {
  const { id } = useParams();
  const albumData = albumsData[id];
  const { playWithId } = useContext(PlayerContext);

  if (!albumData) {
    return <div className="display-album">Album not found</div>;
  }

  return (
    <div className="display-album">
      <Navbar />

      {/* Album Header */}
      <div className="album-header">
        <img
          className="album-cover"
          src={albumData.image}
          alt={albumData.name}
        />

        <div className="album-info">
          <p className="album-type">Playlist</p>
          <h2 className="album-title">{albumData.name}</h2>
          <h4 className="album-desc">{albumData.desc}</h4>
          <p className="album-category">
            {albumData.category} • Updated {albumData.updated}
          </p>
          <p className="album-meta">
            <FaSpotify className="spotify-icon" />
            <b>{albumData.owner}</b>
            {albumData.verified && <span className="verified-badge">✓</span>}
            <span>•</span>
            {albumData.likes} likes
            <span>•</span>
            <b>{albumData.totalSongs} songs</b>
            <span>•</span>
            {albumData.totalHours}
          </p>
        </div>
      </div>

      {/* Song header */}
      <div className="song-header">
        <p>
          <b>#</b>
          Title
        </p>

        <p>Album</p>

        <p className="date-added">Date Added</p>

        <FaClock className="clock-icon" />
      </div>

      <hr />

      {/* Songs */}
      <div className="songs-list">
        {songsData.map((item, index) => (
          <div
            className="song-row"
            onClick={() => playWithId(item.id)}
            key={index}
          >
            <p className="song-title">
              <b className="song-number">{index + 1}</b>

              <img
                className="song-row-image"
                src={item.image}
                alt={item.name}
              />

              {item.name}
            </p>

            <p className="song-album">{albumData.name}</p>

            <p className="date-added">5 days ago</p>

            <p className="song-duration">{item.duration}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DisplayAlbum;
