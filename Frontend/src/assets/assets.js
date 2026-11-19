// music cover image
import img1 from "./image/cover_song/song1.jpg";
import img2 from "./image/cover_song/song2.jpg";
import img3 from "./image/cover_song/song3.jpg";
import img4 from "./image/cover_song/song4.jpg";
import img5 from "./image/cover_song/song5.jpg";
import img6 from "./image/cover_song/song6.jpg";
import img7 from "./image/cover_song/song7.jpg";
import img8 from "./image/cover_song/song8.jpg";
import img9 from "./image/cover_song/song9.jpg";
import img10 from "./image/cover_song/song10.jpg";
import img11 from "./image/cover_song/song11.jpg";
import img12 from "./image/cover_song/song12.jpg";
import img13 from "./image/cover_song/song13.jpg";
import img14 from "./image/cover_song/song14.jpg";
import img15 from "./image/cover_song/song15.jpg";
import img16 from "./image/cover_song/song16.jpg";
import img17 from "./image/cover_song/song17.jpg";
import img18 from "./image/cover_song/song18.jpg";
import img19 from "./image/cover_song/song19.jpg";
import img20 from "./image/cover_song/song20.jpg";
import img21 from "./image/cover_song/song21.jpg";
import img22 from "./image/cover_song/song22.jpg";
import img23 from "./image/cover_song/song23.jpg";
import img24 from "./image/cover_song/song24.jpg";
import img25 from "./image/cover_song/song25.jpg";
import img26 from "./image/cover_song/song26.jpg";
import img27 from "./image/cover_song/song27.jpg";
import img28 from "./image/cover_song/song28.jpg";
import img29 from "./image/cover_song/song29.jpg";
import img30 from "./image/cover_song/song30.jpg";
import img31 from "./image/cover_song/song31.jpg";
import img32 from "./image/cover_song/song32.jpg";

// album1 cover image
import album1 from "./image/cover_album/album1.jpg";
import album2 from "./image/cover_album/album2.jpg";
import album3 from "./image/cover_album/album3.jpg";
import album4 from "./image/cover_album/album4.jpg";
import album5 from "./image/cover_album/album5.jpg";
import album6 from "./image/cover_album/album6.jpg";
import album7 from "./image/cover_album/album7.jpg";

import song1 from "./songs/song1.mp3"; // Lana X Arctic Monkeys
import song2 from "./songs/song2.mp3"; // Moth To A Flame
import song3 from "./songs/song3.mp3"; // Snowman
import song4 from "./songs/song4.mp3"; // Into It
import song5 from "./songs/song5.mp3"; // Hotel Room
import song6 from "./songs/song6.mp3"; // Lovers Rock
import song7 from "./songs/song7.mp3"; // 505
import song8 from "./songs/song8.mp3"; // Double take
import song9 from "./songs/song9.mp3"; // Dracula
import song10 from "./songs/song10.mp3"; // Golden Brown
import song11 from "./songs/song11.mp3"; // Good For You x One Of The Girls
import song12 from "./songs/song12.mp3"; // Let It Happen
import song13 from "./songs/song13.mp3"; // Loser
import song14 from "./songs/song14.mp3"; // Losing Interest
import song15 from "./songs/song15.mp3"; // No Idea
import song16 from "./songs/song16.mp3"; // On My Way
import song17 from "./songs/song17.mp3"; // Our Time
import song18 from "./songs/song18.mp3"; // Play Date
import song19 from "./songs/song19.mp3"; // Reminder
import song20 from "./songs/song20.mp3"; // Ride It
import song21 from "./songs/song21.mp3"; // Roi
import song22 from "./songs/song22.mp3"; // Senorita
import song23 from "./songs/song23.mp3"; // Shadows
import song24 from "./songs/song24.mp3"; // Stereo Love
import song25 from "./songs/song25.mp3"; // Telepatia
import song26 from "./songs/song26.mp3"; // The Less I Know The Better
import song27 from "./songs/song27.mp3"; // Alone, Pt II
import song28 from "./songs/song28.mp3"; // White Tee
import song29 from "./songs/song29.mp3"; // Wait For Me
import song30 from "./songs/song30.mp3"; // We don't talk anymore
import song31 from "./songs/song31.mp3"; // How Long
import song32 from "./songs/song32.mp3"; // Attention
import song33 from "./songs/song33.mp3"; // São Paulo
import song34 from "./songs/song34.mp3"; // Starboy

export const albumsData = [
  {
    id: 0,
    name: "Top 50 Global",
    image: album1,
    desc: "The biggest songs from around the world",
    bgColor: "#2a4365",
    category: "Global",
    likes: "2,845,321",
    followers: "1.8M",
    totalSongs: 50,
    totalHours: "2 hr 58 min",
    updated: "Today",
    owner: "Spotify",
    verified: true,
    songs: [0, 3, 5, 8, 12, 15, 18, 21],
  },

  {
    id: 1,
    name: "Top 50 India",
    image: album2,
    desc: "The biggest hits from India",
    bgColor: "#22543d",
    category: "India",
    likes: "1,924,782",
    followers: "1.2M",
    totalSongs: 50,
    totalHours: "2 hr 47 min",
    updated: "Today",
    owner: "Spotify",
    verified: true,
    songs: [1, 4, 7, 10, 13, 16, 19, 22],
  },

  {
    id: 2,
    name: "Trending India",
    image: album3,
    desc: "Trending songs everyone is listening to",
    bgColor: "#742a2a",
    category: "Trending",
    likes: "1,583,421",
    followers: "956K",
    totalSongs: 40,
    totalHours: "2 hr 15 min",
    updated: "Today",
    owner: "Spotify",
    verified: true,
    songs: [2, 5, 8, 11, 14, 17, 20, 23],
  },

  {
    id: 3,
    name: "Trending Global",
    image: album5,
    desc: "Global songs taking over the charts",
    bgColor: "#44337a",
    category: "Trending",
    likes: "3,421,890",
    followers: "2.4M",
    totalSongs: 50,
    totalHours: "2 hr 52 min",
    updated: "Today",
    owner: "Spotify",
    verified: true,
    songs: [0, 2, 6, 9, 12, 15, 18, 22],
  },

  {
    id: 4,
    name: "Mega Hits",
    image: album4,
    desc: "The biggest hits of all time",
    bgColor: "#234e52",
    category: "Hits",
    likes: "4,782,615",
    followers: "3.1M",
    totalSongs: 60,
    totalHours: "3 hr 34 min",
    updated: "Yesterday",
    owner: "Spotify",
    verified: true,
    songs: [1, 3, 6, 10, 14, 17, 20, 23],
  },

  {
    id: 5,
    name: "Happy Favorites",
    image: album6,
    desc: "Feel-good songs for a better day",
    bgColor: "#744210",
    category: "Mood",
    likes: "987,654",
    followers: "745K",
    totalSongs: 35,
    totalHours: "1 hr 58 min",
    updated: "2 days ago",
    owner: "Spotify",
    verified: true,
    songs: [0, 4, 7, 11, 16, 19, 21, 23],
  },
];

export const songsData = [
  {
    id: 0,
    name: "Music to watch boys to",
    image: img1,
    file: song1,
    desc: "Put a smile on your face",
    duration: "3:00",
    plays: "12.5M",
    likes: "845K",
  },

  {
    id: 1,
    name: "Moth To A Flame (with The Weeknd)",
    image: img2,
    file: song2,
    desc: "A dark and beautiful vibe",
    duration: "3:54",
    plays: "18.2M",
    likes: "1.2M",
  },

  {
    id: 2,
    name: "Snowman",
    image: img3,
    file: song3,
    desc: "Winter memories",
    duration: "2:32",
    plays: "25.7M",
    likes: "1.8M",
  },

  {
    id: 3,
    name: "Into It",
    image: img4,
    file: song4,
    desc: "Lost in the moment",
    duration: "2:50",
    plays: "9.8M",
    likes: "632K",
  },

  {
    id: 4,
    name: "Hotel Room",
    image: img5,
    file: song5,
    desc: "Late night thoughts",
    duration: "3:10",
    plays: "7.4M",
    likes: "521K",
  },

  {
    id: 5,
    name: "Lovers Rock",
    image: img6,
    file: song6,
    desc: "A nostalgic love song",
    duration: "2:45",
    plays: "32.6M",
    likes: "2.4M",
  },

  {
    id: 6,
    name: "505",
    image: img7,
    file: song7,
    desc: "A beautiful summer memory",
    duration: "4:25",
    plays: "45.8M",
    likes: "3.2M",
  },

  {
    id: 7,
    name: "Double Take",
    image: img8,
    file: song8,
    desc: "When you know too much",
    duration: "3:36",
    plays: "52.4M",
    likes: "4.1M",
  },

  {
    id: 8,
    name: "Dracula",
    image: img9,
    file: song9,
    desc: "I still come back",
    duration: "4:13",
    plays: "61.2M",
    likes: "5.3M",
  },

  {
    id: 9,
    name: "Golden Brown",
    image: img10,
    file: song10,
    desc: "Late night questions",
    duration: "4:32",
    plays: "72.5M",
    likes: "6.1M",
  },

  {
    id: 10,
    name: "Good For You x One Of The Girls",
    image: img11,
    file: song11,
    desc: "A beautiful dark feeling",
    duration: "4:03",
    plays: "29.8M",
    likes: "2.2M",
  },

  {
    id: 11,
    name: "Let It Happen",
    image: img12,
    file: song12,
    desc: "Midnight atmosphere",
    duration: "4:19",
    plays: "38.7M",
    likes: "3.4M",
  },

  {
    id: 12,
    name: "Loser",
    image: img13,
    file: song13,
    desc: "Take me to the west coast",
    duration: "4:16",
    plays: "41.3M",
    likes: "3.1M",
  },

  {
    id: 13,
    name: "Losing Interest",
    image: img14,
    file: song14,
    desc: "Midnight conversations",
    duration: "2:41",
    plays: "55.9M",
    likes: "4.6M",
  },

  {
    id: 14,
    name: "No Idea",
    image: img15,
    file: song15,
    desc: "A dreamy retro feeling",
    duration: "5:51",
    plays: "33.5M",
    likes: "2.7M",
  },

  {
    id: 15,
    name: "On My Way",
    image: img16,
    file: song16,
    desc: "Lost among the stars",
    duration: "1:51",
    plays: "28.4M",
    likes: "2.1M",
  },

  {
    id: 16,
    name: "Our Time",
    image: img17,
    file: song17,
    desc: "Do you really want me?",
    duration: "3:21",
    plays: "48.2M",
    likes: "3.8M",
  },

  {
    id: 17,
    name: "Play Date",
    image: img18,
    file: song18,
    desc: "Dreaming by the ocean",
    duration: "3:45",
    plays: "11.7M",
    likes: "904K",
  },

  {
    id: 18,
    name: "Reminder",
    image: img19,
    file: song19,
    desc: "Lights and lonely nights",
    duration: "4:03",
    plays: "43.6M",
    likes: "3.5M",
  },

  {
    id: 19,
    name: "Ride It",
    image: img20,
    file: song20,
    desc: "Beautiful but heartbreaking",
    duration: "3:54",
    plays: "21.8M",
    likes: "1.7M",
  },

  {
    id: 20,
    name: "Roi",
    image: img21,
    file: song21,
    desc: "A lonely night at the party",
    duration: "4:03",
    plays: "36.4M",
    likes: "2.8M",
  },

  {
    id: 21,
    name: "Senorita",
    image: img22,
    file: song22,
    desc: "Don't leave me alone",
    duration: "3:48",
    plays: "67.3M",
    likes: "5.7M",
  },

  {
    id: 22,
    name: "Shadows",
    image: img23,
    file: song23,
    desc: "A soft and dreamy feeling",
    duration: "3:35",
    plays: "17.5M",
    likes: "1.3M",
  },

  {
    id: 23,
    name: "Stereo Love",
    image: img24,
    file: song24,
    desc: "A love that stays",
    duration: "3:04",
    plays: "82.6M",
    likes: "7.4M",
  },

  {
    id: 24,
    name: "Until I Found You",
    image: img25,
    file: song25,
    desc: "A song about finding someone special",
    duration: "2:57",
    plays: "76.3M",
    likes: "6.8M",
  },

  {
    id: 25,
    name: "The Less I Know The Better",
    image: img26,
    file: song26,
    desc: "A warm golden moment",
    duration: "3:29",
    plays: "91.5M",
    likes: "8.2M",
  },

  {
    id: 26,
    name: "Alone, Pt II",
    image: img27,
    file: song27,
    desc: "A cool autumn feeling",
    duration: "4:00",
    plays: "88.7M",
    likes: "7.9M",
  },

  {
    id: 27,
    name: "White Tee",
    image: img28,
    file: song28,
    desc: "A powerful emotional song",
    duration: "4:04",
    plays: "95.2M",
    likes: "8.7M",
  },

  {
    id: 28,
    name: "Wait For Me",
    image: img29,
    file: song29,
    desc: "A dreamy emotional journey",
    duration: "3:49",
    plays: "63.4M",
    likes: "5.6M",
  },

  {
    id: 29,
    name: "We Don't Talk Anymore",
    image: img30,
    file: song30,
    desc: "Floating through the night",
    duration: "5:20",
    plays: "102.8M",
    likes: "9.4M",
  },

  {
    id: 30,
    name: "How Long",
    image: img31,
    file: song31,
    desc: "Floating through the night",
    duration: "5:20",
    plays: "102.8M",
    likes: "9.4M",
  },

  {
    id: 31,
    name: "Attention",
    image: img32,
    file: song32,
    desc: "Floating through the night",
    duration: "5:20",
    plays: "102.8M",
    likes: "9.4M",
  },

  {
    id: 32,
    name: "São Paulo",
    image: img32,
    file: song33,
    desc: "Floating through the night",
    duration: "5:20",
    plays: "102.8M",
    likes: "9.4M",
  },

  {
    id: 33,
    name: "Starboy",
    image: img32,
    file: song34,
    desc: "Floating through the night",
    duration: "5:20",
    plays: "102.8M",
    likes: "9.4M",
  },
];
