import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";
import { PlayerContext } from "../contex/PlayerContex";
import { api, mediaUrl } from "../api/api";
import { FaPlay, FaBolt, FaMusic } from "react-icons/fa6";

const shuffleList = (items) => [...items].sort(() => Math.random() - 0.5);

function DisplayHome() {
  const { songs, playWithId } = useContext(PlayerContext);
  const navigate = useNavigate();
  const [recommended, setRecommended] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [randomSongs, setRandomSongs] = useState([]);
  const [hero, setHero] = useState(null);

  useEffect(() => {
    let active = true;
    Promise.all([
      api("/songs/random?limit=16"),
      api("/albums"),
      api("/songs/recommendations"),
    ])
      .then(([random, albumData, recommendations]) => {
        if (!active) return;
        const shuffled = shuffleList(random);
        setRandomSongs(shuffled);
        setHero(shuffled[0] || null);
        setAlbums(shuffleList(albumData));
        setRecommended(recommendations);
      })
      .catch((error) => console.error("Home data could not be loaded:", error));
    return () => {
      active = false;
    };
  }, []);

  // Fallback while the random endpoint is loading or if the request fails.
  useEffect(() => {
    if (!hero && songs.length) {
      const pick = songs[Math.floor(Math.random() * songs.length)];
      setHero(pick);
    }
    if (!randomSongs.length && songs.length) {
      setRandomSongs(shuffleList(songs).slice(0, 16));
    }
  }, [songs, hero, randomSongs.length]);

  const featuredSong = hero || songs[0];

  return (
    <div className="display-home">
      <Navbar />
      {featuredSong && (
        <section className="home-hero">
          <div className="hero-copy">
            <span className="eyebrow">
              <FaBolt /> FEATURED TODAY
            </span>
            <h1>
              Find your next
              <br />
              <em>favorite song.</em>
            </h1>
            <p>Picked for your next listening moment: {featuredSong.title}.</p>
            <div className="hero-actions">
              <button
                className="hero-play"
                onClick={() => playWithId(featuredSong._id)}
              >
                <FaPlay /> Play now
              </button>
              <button
                className="hero-secondary"
                onClick={() => navigate("/browse")}
              >
                <FaMusic /> Explore music
              </button>
            </div>
          </div>
          <img
            src={mediaUrl(featuredSong.coverImage)}
            alt={featuredSong.title}
            onError={(event) => {
              event.currentTarget.src = "/MusicLogoI.jpg";
            }}
          />
        </section>
      )}

      <section className="album-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">DISCOVER</span>
            <h2>Featured Albums</h2>
          </div>
          <button className="section-link" onClick={() => navigate("/browse")}>
            Explore all
          </button>
        </div>
        <div className="album-list">
          {albums.map((album) => (
            <AlbumItem
              key={album._id}
              id={album._id}
              name={album.title}
              desc={album.description}
              image={mediaUrl(album.coverImage)}
            />
          ))}
        </div>
      </section>

      <section className="album-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">FOR YOU</span>
            <h2>Today's biggest hits</h2>
          </div>
          <button
            className="section-link"
            onClick={() => setRandomSongs(shuffleList(songs).slice(0, 16))}
          >
            Shuffle
          </button>
        </div>
        <div className="song-grid">
          {randomSongs.map((song) => (
            <SongItem
              key={song._id}
              id={song._id}
              name={song.title}
              desc={song.artist?.name || song.genre}
              image={mediaUrl(song.coverImage)}
            />
          ))}
        </div>
      </section>

      {recommended.length > 0 && (
        <section className="album-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">PERSONALIZED</span>
              <h2>Made for you</h2>
            </div>
          </div>
          <div className="song-grid">
            {recommended.map((song) => (
              <SongItem
                key={song._id}
                id={song._id}
                name={song.title}
                desc={song.artist?.name || song.genre}
                image={mediaUrl(song.coverImage)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
export default DisplayHome;
