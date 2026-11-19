import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getArtists,
  getArtist,
  followArtist,
} from "../controllers/artistController.js";
const router = express.Router();
router.get("/", getArtists);
router.get("/:id", getArtist);
router.post("/:id/follow", authMiddleware, followArtist);
export default router;
