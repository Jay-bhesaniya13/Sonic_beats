import Admin from '../models/admin.js'; // Ensure the correct model import

// Fetch all admins
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().populate('playlists');
    res.status(200).json(admins);
  } catch (error) {
    console.error('Error fetching admins:', error);
    res.status(500).json({ message: 'Error fetching admins', error });
  }
};

// Create a new admin
export const createAdmin = async (req, res) => {
  const adminData = req.body;

  try {
    const newAdmin = new Admin(adminData);
    await newAdmin.save();
    res.status(201).json(newAdmin);
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).json({ message: 'Error creating admin', error });
  }
};

// Delete an admin
export const deleteAdmin = async (req, res) => {
  const { username } = req.body; // Extract username from request body

  try {
    if (!username) {
      return res.status(400).json({ error: 'Username is required.' }); // Bad request if username is not provided
    }

    // Find the admin by username
    const admin = await Admin.findOne({ username }); // Use the correct model name

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found.' }); // Not found if admin does not exist
    }

    // Delete the admin
    await Admin.deleteOne({ username }); // Use the correct model name

    res.status(200).json({ message: 'Admin deleted successfully' }); // Confirm deletion
  } catch (error) {
    console.error('Error deleting admin:', error); // Log error for debugging
    res.status(500).json({ error: 'An error occurred while deleting the admin.' });
  }
};

// Update admin details
export const updateAdmin = async (req, res) => {
  const { username, updateData } = req.body; // Extract username and updateData from request body

  try {
    if (!username || !updateData) {
      return res.status(400).json({ error: 'Username and update data are required.' }); // Bad request if username or updateData is not provided
    }

    // Find admin by username and update it
    const updatedAdmin = await Admin.findOneAndUpdate(
      { username: username }, // Find by username
      updateData,             // Update fields
      { new: true }           // Return the updated document
    );

    if (updatedAdmin) {
      res.status(200).json(updatedAdmin);
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    console.error('Error updating admin:', error);
    res.status(500).json({ message: 'Error updating admin', error });
  }
};
