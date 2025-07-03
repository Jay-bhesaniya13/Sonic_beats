import User from '../models/user.js';
import Music from '../models/music.js';

// Controller to get user's favourites
export const getFavouritesByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate('favourites');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ favourites: user.favourites || [] });
  } catch (error) {
    console.error('Error fetching favourites:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Add song to user's favourites (no duplicate)
export const addSongToFavouritesByUser = async (req, res) => {
  const { userId, musicId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.favourites) {
      user.favourites = [];
    }

    const songExists = user.favourites.some(id => id.toString() === musicId);
    if (songExists) {
      return res.status(200).json({ message: 'Song is already in favourites', alreadyExists: true });
    }

    user.favourites.push(musicId);
    await user.save();

    const populatedUser = await user.populate('favourites');
    res.status(200).json({ message: 'Song added to favourites', favourites: populatedUser.favourites });
  } catch (error) {
    res.status(500).json({ message: 'Error adding song to favourites', error });
  }
};


// Remove song from user's favourites
export const removeSongFromFavouritesByUser = async (req, res) => {
  const { userId, musicId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user || !user.favourites) {
      return res.status(404).json({ message: 'User or favourites not found' });
    }

    user.favourites = user.favourites.filter(id => id.toString() !== musicId);
    await user.save();

    const populatedUser = await user.populate('favourites');

    res.status(200).json({ message: 'Song removed from favourites', favourites: populatedUser.favourites });
  } catch (error) {
    res.status(500).json({ message: 'Error removing song from favourites', error });
  }
};
