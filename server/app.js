import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { seedMusicIfEmpty } from './seed/musicSeeder.js';


// Create an Express application
const app = express();


// Middleware to parse JSON data
app.use(bodyParser.json());

// Allow all origins
app.use(cors({
  origin: '*',
}));

// Connect to MongoDB

mongoose.connect('mongodb://localhost:27017/Sonic_beats')
  .then(async () => {
    console.log('MongoDB connection successful');
     await seedMusicIfEmpty(); // 👈 Seed only if empty
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });



// Import and use API routes
import user_routes from './routes/user.js';
import admin_routes from './routes/admin.js';
import music_routes from './routes/music.js';
import playlist_routes from './routes/playlist.js';

app.use('/user', user_routes);
app.use('/admin', admin_routes);
app.use('/music', music_routes);
app.use('/playlist', playlist_routes);

// Serve a basic message or error for undefined routes
app.get('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
