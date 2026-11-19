import User from "../models/User.js";
import Song from "../models/Song.js";
import Artist from "../models/Artist.js";
import ListeningHistory from "../models/ListeningHistory.js";

export const toggleLike = async (req, res) => {
  const user = await User.findById(req.userId);
  const song = await Song.findById(req.params.songId);
  if (!song) return res.status(404).json({ message: "Song not found" });
  const liked = user.likedSongs.some(
    (id) => id.toString() === song._id.toString(),
  );
  if (liked) user.likedSongs.pull(song._id);
  else user.likedSongs.addToSet(song._id);
  await user.save();
  res.json({ liked: !liked });
};

export const likedSongs = async (req, res) => {
  const user = await User.findById(req.userId).populate({
    path: "likedSongs",
    populate: [
      { path: "artist", select: "name image" },
      { path: "album", select: "title coverImage" },
    ],
  });
  res.json(user?.likedSongs || []);
};

export const history = async (req, res) => {
  const rows = await ListeningHistory.find({ user: req.userId })
    .sort({ playedAt: -1 })
    .limit(50)
    .populate({
      path: "song",
      populate: [
        { path: "artist", select: "name image" },
        { path: "album", select: "title coverImage" },
      ],
    });
  res.json(rows);
};

export const me = async (req, res) => {
  const user = await User.findById(req.userId)
    .select("-password")
    .populate("followedArtists", "name image followers");
  res.json(user);
};
