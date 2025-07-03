import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { seedMusicIfEmpty } from './seed/musicSeeder.js';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/Sonic_beats')
  .then(async () => {
    console.log('MongoDB connection successful');
    await seedMusicIfEmpty();
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Import Routes
import user_routes from './routes/user.js';
import admin_routes from './routes/admin.js';
import music_routes from './routes/music.js';
import favourite_routes from './routes/favourite.js'; 

// Use Routes
app.use('/user', user_routes);
app.use('/admin', admin_routes);
app.use('/music', music_routes);
 app.use('/favourite', favourite_routes);  

// Fallback Route
app.get('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
