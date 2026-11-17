import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getSongs,
  getSongById,
  searchSongs,
  playSong,
  recommendations,
  getRandomSongs,
} from "../controllers/songController.js";
const router = express.Router();
router.get("/", getSongs);
router.get("/search", searchSongs);
router.get("/random", getRandomSongs);
router.get("/recommendations", recommendations);
router.get("/:id", getSongById);
router.post("/:id/play", (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return playSong(req, res);
  return authMiddleware(req, res, () => playSong(req, res));
});
export default router;
