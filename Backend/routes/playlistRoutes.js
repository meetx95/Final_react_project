import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getPlaylists,
  getPlaylist,
  createPlaylist,
  addSong,
  removeSong,
  deletePlaylist,
} from "../controllers/playlistController.js";

const router = express.Router();
router.use(authMiddleware);
router.get("/", getPlaylists);
router.get("/:id", getPlaylist);
router.post("/", createPlaylist);
router.post("/:id/songs/:songId", addSong);
router.delete("/:id/songs/:songId", removeSong);
router.delete("/:id", deletePlaylist);
export default router;
