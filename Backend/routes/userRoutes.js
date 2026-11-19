import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  toggleLike,
  likedSongs,
  history,
  me,
} from "../controllers/userController.js";
const router = express.Router();
router.use(authMiddleware);
router.get("/me", me);
router.get("/liked-songs", likedSongs);
router.get("/history", history);
router.post("/liked-songs/:songId/toggle", toggleLike);
export default router;
