import "dotenv/config";
import mongoose from "mongoose";
import Artist from "./models/Artist.js";
import Album from "./models/Album.js";
import Song from "./models/Song.js";
await mongoose.connect(process.env.MONGO_URI);
const names = [
  "Lana Del Rey",
  "The Weeknd",
  "Arctic Monkeys",
  "Sabrina Carpenter",
  "Cigarettes After Sex",
];
const artists = [];
for (const name of names)
  artists.push(
    await Artist.findOneAndUpdate(
      { name },
      { name, bio: `Music by ${name}` },
      { upsert: true, new: true },
    ),
  );
const demoSongs = [
  [
    "Music to watch boys to",
    artists[0],
    "Pop",
    "/media/songs/song1.mp3",
    "/media/images/song1.jpg",
  ],
  [
    "Moth To A Flame",
    artists[1],
    "Pop",
    "/media/songs/song1.mp3",
    "/media/images/song1.jpg",
  ],
  [
    "505",
    artists[2],
    "Alternative",
    "/media/songs/song1.mp3",
    "/media/images/song1.jpg",
  ],
  [
    "Snowman",
    artists[3],
    "Pop",
    "/media/songs/song1.mp3",
    "/media/images/song1.jpg",
  ],
  [
    "Lovers Rock",
    artists[4],
    "Indie",
    "/media/songs/song1.mp3",
    "/media/images/song1.jpg",
  ],
];

for (const [title, artist, genre, audioUrl, coverImage] of demoSongs)
  await Song.findOneAndUpdate(
    { title },
    { title, artist: artist._id, genre, audioUrl, coverImage },
    { upsert: true, new: true },
  );
console.log("Demo seed complete");
await mongoose.disconnect();
