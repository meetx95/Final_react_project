import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
    },
    album: { type: mongoose.Schema.Types.ObjectId, ref: "Album" },
    genre: { type: String, default: "Pop" },
    duration: { type: Number, default: 0 },
    audioUrl: { type: String, required: true },
    coverImage: { type: String, default: "" },
    plays: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.model("Song", songSchema);
