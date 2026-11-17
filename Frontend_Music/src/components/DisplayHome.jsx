import React from "react";
import Navbar from "./Navbar";
import { albumsData, songsData } from "../assets/assets";
import AlbumItem from "./AlbumItem";
import SongsItem from "./SongItem";

function DisplayHome() {
  return (
    <div className="display-home">
      <Navbar />

      {/* Featured Charts */}
      <section className="album-section">
        <h1 className="section-title">Featured Charts</h1>

        <div className="album-list">
          {albumsData.map((item) => (
            <AlbumItem
              key={item.id}
              id={item.id}
              name={item.name}
              desc={item.desc}
              image={item.image}
            />
          ))}
        </div>
      </section>

      {/* Today's Biggest Hits */}
      <section className="album-section">
        <h1 className="section-title">Today's Biggest Hits</h1>

        <div className="album-list">
          {songsData.map((item) => (
            <SongsItem
              key={item.id}
              id={item.id}
              name={item.name}
              desc={item.desc}
              image={item.image}
            />  
          ))}
        </div>
      </section>

      {/* User's playlists */}
      <section className="album-section">
        <h1 className="section-title">Featured Playlists</h1>

        <div className="album-list">
          {albumsData.map((item) => (
            <AlbumItem
              key={item.id}
              id={item.id}
              name={item.name}
              desc={item.desc}
              image={item.image}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default DisplayHome;
