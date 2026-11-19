import Song from "../models/Song.js";
import ListeningHistory from "../models/ListeningHistory.js";
import Artist from "../models/Artist.js";

const populate = (query) =>
  query
    .populate("artist", "name image bio followers")
    .populate("album", "title coverImage description genre");

export const getSongs = async (req, res) => {
  try {
    res.json(await populate(Song.find().sort({ createdAt: -1 })));
  } catch (e) {
    res
      .status(500)
      .json({ message: "Failed to fetch songs", error: e.message });
  }
};

export const getSongById = async (req, res) => {
  try {
    const song = await populate(Song.findById(req.params.id));
    if (!song) return res.status(404).json({ message: "Song not found" });
    res.json(song);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch song", error: e.message });
  }
};

export const searchSongs = async (req, res) => {
  try {
    const q = req.query.q?.trim();
    if (!q) return res.json([]);
    const artists = await Artist.find({
      name: { $regex: q, $options: "i" },
    }).select("_id");
    const artistIds = artists.map((artist) => artist._id);
    const songs = await populate(
      Song.find({
        $or: [
          { title: { $regex: q, $options: "i" } },
          { genre: { $regex: q, $options: "i" } },
          ...(artistIds.length ? [{ artist: { $in: artistIds } }] : []),
        ],
      })
        .sort({ plays: -1, createdAt: -1 })
        .limit(30),
    );
    res.json(songs);
  } catch (e) {
    res.status(500).json({ message: "Search failed", error: e.message });
  }
};

export const playSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(
      req.params.id,
      { $inc: { plays: 1 } },
      { new: true },
    );
    if (!song) return res.status(404).json({ message: "Song not found" });
    if (req.userId)
      await ListeningHistory.create({ user: req.userId, song: song._id });
    res.json(song);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Failed to update play count", error: e.message });
  }
};

export const recommendations = async (req, res) => {
  try {
    let genre = null;
    if (req.userId) {
      const last = await ListeningHistory.findOne({ user: req.userId })
        .sort({ playedAt: -1 })
        .populate("song", "genre");
      genre = last?.song?.genre;
    }
    const filter = genre ? { genre } : {};
    const songs = await populate(
      Song.find(filter).sort({ plays: -1 }).limit(12),
    );
    res.json(songs);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Recommendation failed", error: e.message });
  }
};

// Return a fresh random selection for the Home page.
export const getRandomSongs = async (req, res) => {
  try {
    const requested = Number.parseInt(req.query.limit, 10);
    const limit = Number.isFinite(requested)
      ? Math.min(Math.max(requested, 1), 40)
      : 16;
    const randomSongs = await Song.aggregate([{ $sample: { size: limit } }]);
    const songs = await Song.populate(randomSongs, [
      { path: "artist", select: "name image bio followers" },
      { path: "album", select: "title coverImage description genre" },
    ]);
    res.json(songs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch random songs", error: error.message });
  }
};
