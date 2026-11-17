import { Route, Routes, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";
import { useEffect, useRef } from "react";
import { albumsData } from "../assets/assets";

function Display() {
  const displayref = useRef();
  const location = useLocation();
  // console.log(location);
  const isAlbum = location.pathname.includes("album");
  // console.log(isAlbum);
  const albumId = isAlbum ? location.pathname.slice(-1) : "";
  const bg = albumsData[Number(albumId)].bgColor;

  useEffect(() => {
    if (isAlbum) {
      displayref.current.style.background = `linear-gradient(${bg},#121212)`;
    } else {
      displayref.current.style.background = `#121212`;
    }
  });
  return (
    <div ref={displayref} className="display">
      <Routes>
        <Route path="/" element={<DisplayHome />} />
        <Route path="/album/:id" element={<DisplayAlbum />} />
      </Routes>
    </div>
  );
}

export default Display;
