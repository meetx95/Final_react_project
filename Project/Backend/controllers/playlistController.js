import Playlist from "../models/Playlist.js";
import Song from "../models/Song.js";

const populatePlaylist = (query) =>
  query.populate({
    path: "songs",
    populate: [
      { path: "artist", select: "name image" },
      { path: "album", select: "title coverImage" },
    ],
  });

export const getPlaylists = async (req, res) => {
  try {
    const playlists = await populatePlaylist(
      Playlist.find({ owner: req.userId }).sort({ updatedAt: -1 }),
    );
    res.json(playlists);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getPlaylist = async (req, res) => {
  try {
    const playlist = await populatePlaylist(
      Playlist.findOne({ _id: req.params.id, owner: req.userId }),
    );
    if (!playlist)
      return res.status(404).json({ message: "Playlist not found" });
    res.json(playlist);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const createPlaylist = async (req, res) => {
  try {
    const name = req.body.name?.trim();
    if (!name)
      return res.status(400).json({ message: "Playlist name is required" });
    const playlist = await Playlist.create({
      name,
      description: req.body.description?.trim() || "",
      owner: req.userId,
      isPublic: Boolean(req.body.isPublic),
    });
    res.status(201).json(playlist);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const addSong = async (req, res) => {
  try {
    const [playlist, song] = await Promise.all([
      Playlist.findOne({ _id: req.params.id, owner: req.userId }),
      Song.findById(req.params.songId),
    ]);
    if (!playlist)
      return res.status(404).json({ message: "Playlist not found" });
    if (!song) return res.status(404).json({ message: "Song not found" });
    playlist.songs.addToSet(song._id);
    await playlist.save();
    res.json(await populatePlaylist(Playlist.findById(playlist._id)));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const removeSong = async (req, res) => {
  try {
    const playlist = await Playlist.findOne({
      _id: req.params.id,
      owner: req.userId,
    });
    if (!playlist)
      return res.status(404).json({ message: "Playlist not found" });
    playlist.songs.pull(req.params.songId);
    await playlist.save();
    res.json(await populatePlaylist(Playlist.findById(playlist._id)));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const deletePlaylist = async (req, res) => {
  try {
    const result = await Playlist.deleteOne({
      _id: req.params.id,
      owner: req.userId,
    });
    if (!result.deletedCount)
      return res.status(404).json({ message: "Playlist not found" });
    res.json({ message: "Playlist deleted" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
