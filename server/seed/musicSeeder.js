import Music from '../models/music.js'; 

const musicSeedData = [
  {
    title: "Blue-Eyes",
    artist: "Honey-singh",
    duration: 300,
    musicImg: "cover/Blue-Eyes.jpg",
    filePath: "song/Blue-Eyes.mp3",
    genre: "Pop",
  },
  {
    title: "all is well",
    artist: "a r rehman",
    duration: 350,
    musicImg: "cover/all is well.png",
    filePath: "song/all is well.mp3",
    genre: "Party&pop",
  },
  {
    title: "Halaji-Tara",
    artist: "Aadiyadan-Gadhvi",
    duration: 140,
    musicImg: "cover/Halaji-Tara.jpg",
    filePath: "song/Halaji-Tara.mp3",
    genre: "Bhajan",
  },
  {
    title: "Hass-Hass",
    artist: "Diljit Dosanj",
    duration: 350,
    musicImg: "cover/Hass-Hass.jpg",
    filePath: "song/Hass-Hass.mp3",
    genre: "Party&pop",
  },
  {
    title: "nain ta heere",
    artist: "Guru Randhava",
    duration: 300,
    musicImg: "cover/nain ta heere.jpg",
    filePath: "song/nain ta heere.mp3",
    genre: "Party&pop",
  },
  {
    title: "piya aye na",
    artist: "K K",
    duration: 320,
    musicImg: "cover/piya aye na.jpg",
    filePath: "song/piya aye na.mp3",
    genre: "Emotional",
  },
  {
    title: "saans",
    artist: "Shreya Ghosal",
    duration: 310,
    musicImg: "cover/saans.jpg",
    filePath: "song/saans.mp3",
    genre: "Pop",
  },
  {
    title: "tujh bin",
    artist: "Bharat-Saurabh",
    duration: 400,
    musicImg: "cover/tujh bin.jpg",
    filePath: "song/tujh bin.mp3",
    genre: "Romantic",
  },
  {
    title: "Vishvambhari-Stuti",
    artist: "Kinjal-Dave",
    duration: 400,
    musicImg: "cover/Vishvambhari-Stuti.jpeg",
    filePath: "song/Vishvambhari-Stuti.mp3",
    genre: "Aarti",
  },
  {
    title: "dk",
    artist: "fvn",
    duration: 243,
    musicImg: "dk.jpg",
    filePath: "dk.mp3",
    genre: "popop",
  }
];

export const seedMusicIfEmpty = async () => {
  const count = await Music.countDocuments();
  if (count === 0) {
    await Music.insertMany(musicSeedData);
    console.log('✅ Music collection seeded.');
  } else {
    console.log('ℹ️ Music collection already has data. Skipping seed.');
  }
};
