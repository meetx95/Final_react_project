import express from "express";

import {
  getAlbums,
  getAlbumById,
  createAlbum,
} from "../controllers/albumController.js";

const router = express.Router();

router.get("/", getAlbums);
router.get("/:id", getAlbumById);
router.post("/", createAlbum);

export default router;
