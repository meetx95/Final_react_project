import Album from "../models/Album.js";
import Song from "../models/Song.js";

// get all albums
export const getAlbums = async (req, res) => {
  try {
    const albums = await Album.find()
      .populate("artist", "name image")
      .sort({ createdAt: -1 });

    res.json(albums);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get single album with songs
export const getAlbumById = async (req, res) => {
  try {
    const album = await Album.findById(req.params.id).populate(
      "artist",
      "name image bio",
    );

    if (!album) {
      return res.status(404).json({
        message: "Album not found",
      });
    }

    const songs = await Song.find({
      album: album._id,
    }).populate("artist", "name image");

    res.json({
      ...album.toObject(),
      songs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// creat album
export const createAlbum = async (req, res) => {
  try {
    const { title, artist, coverImage, description, genre } = req.body;

    const album = await Album.create({
      title,
      artist,
      coverImage,
      description,
      genre,
    });

    res.status(201).json({
      message: "Album created successfully",
      album,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
