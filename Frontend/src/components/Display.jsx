import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";
import SongDetails from "../pages/SongDetails";
import ArtistPage from "../pages/ArtistPage";
import Artists from "../pages/Artists";
import Library from "../pages/Library";
import History from "../pages/History";
import Liked from "../pages/Liked";
import Playlists from "../pages/Playlists";
import Browse from "../pages/Browse";
import Profile from "../pages/Profile";

function Display() {
  const ref = useRef();
  const loc = useLocation();
  useEffect(() => {
    if (ref.current) ref.current.style.background = "#121212";
  }, [loc.pathname]);

  return (
    <div ref={ref} className="display">
      <Routes>
        <Route path="/home" element={<DisplayHome />} />
        <Route path="/album/:id" element={<DisplayAlbum />} />
        <Route path="/song/:id" element={<SongDetails />} />
        <Route path="/artist/:id" element={<ArtistPage />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/library" element={<Library />} />
        <Route path="/liked" element={<Liked />} />
        <Route path="/history" element={<History />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </div>
  );
}
export default Display;
