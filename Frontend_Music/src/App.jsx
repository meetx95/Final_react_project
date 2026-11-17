import React, { useContext } from "react";
import Sidebar from "./components/sidebar.jsx";
import Player from "./components/Player.jsx";
import Display from "./components/Display.jsx";
import { PlayerContext } from "./contex/PlayerContex.jsx";

function App() {
  const { audioRef, track } = useContext(PlayerContext);
  return (
    <div className="main">
      <div className="app">
        <div className="app-content">
          <Sidebar />
          <Display />
        </div>
        <Player />
        <audio ref={audioRef} src={track.file} preload="auto"></audio>
      </div>
    </div>
  );
}

export default App;
