import mongoose from "mongoose";
const albumSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    artist: { type: mongoose.Schema.Types.ObjectId, ref: "Artist" },
    coverImage: { type: String, default: "" },
    description: { type: String, default: "" },
    genre: { type: String, default: "Pop" },
  },
  { timestamps: true },
);
export default mongoose.model("Album", albumSchema);
