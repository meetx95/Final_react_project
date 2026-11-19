import Artist from "../models/Artist.js";
import Song from "../models/Song.js";
import User from "../models/User.js";

const populateSongs = (query) =>
  query
    .populate({ path: "artist", select: "name image bio followers" })
    .populate("album", "title coverImage");

export const getArtists = async (req, res) => {
  try {
    const artists = await Artist.find().sort({ followers: -1, name: 1 });
    res.json(artists);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getArtist = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) return res.status(404).json({ message: "Artist not found" });
    const songs = await populateSongs(
      Song.find({ artist: artist._id }).sort({ plays: -1 }),
    );
    const followerCount = await User.countDocuments({
      followedArtists: artist._id,
    });
    res.json({
      artist: { ...artist.toObject(), followers: followerCount },
      songs,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const followArtist = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) return res.status(404).json({ message: "Artist not found" });
    const user = await User.findById(req.userId);
    const already = user.followedArtists.some(
      (id) => id.toString() === artist._id.toString(),
    );
    if (already) {
      user.followedArtists.pull(artist._id);
      await user.save();
    } else {
      user.followedArtists.addToSet(artist._id);
      await user.save();
    }
    const followers = await User.countDocuments({
      followedArtists: artist._id,
    });
    await Artist.findByIdAndUpdate(artist._id, { followers });
    res.json({ following: !already, followers });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
