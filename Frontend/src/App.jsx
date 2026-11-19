import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/sidebar.jsx";
import Player from "./components/Player.jsx";
import Display from "./components/Display.jsx";
import { PlayerContext } from "./contex/PlayerContex.jsx";
import { useAuth } from "./contex/AuthContext.jsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";

function MusicApp() {
  const { audioRef, track } = useContext(PlayerContext);
  return (
    <div className="main">
      <div className="app">
        <div className="app-content">
          <Sidebar />
          <main className="content-shell">
            <Display />
          </main>
        </div>
        <Player />
        {track && (
          <audio
            ref={audioRef}
            src={
              track.audioUrl?.startsWith("http")
                ? track.audioUrl
                : `http://localhost:5000${track.audioUrl || ""}`
            }
            preload="auto"
          />
        )}
      </div>
    </div>
  );
}

function ProtectedApp() {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading-page">Loading...</div>;
  return user ? <MusicApp /> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={<ProtectedApp />} />
    </Routes>
  );
}
