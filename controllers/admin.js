import Admin from '../models/admin.js'; // Capitalize the model name

export const allAdmins = async (req, res) => {
  try {
    const admins = await Admin.find(); // Use the correct model name
    console.log(admins); // Log admins for debugging
    res.status(200).json(admins); // Send the retrieved admins as the response
  } catch (error) {
    console.error('Error retrieving admins:', error); // Log error for debugging
    res.status(500).json({ error: 'An error occurred while retrieving admins.' });
  }
};


export const addAdmin = async (req, res) => {
    try {
      const adminData = req.body;
  
      // Ensure only one admin exists
      const existingAdmin = await Admin.findOne();
   
       
      // Create a new admin
      const newAdmin = new Admin(adminData);
      await newAdmin.save();
  
      res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
      console.error('Error creating admin:', error);
      res.status(500).json({ error: 'An error occurred while creating the admin.' });
    }
  };
  
export const delAdmin = async (req, res) => {
  try {
    const { username } = req.body; // Change to 'username' to match the schema

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
    console.error('Error fetching and deleting admin:', error); // Log error for debugging
    res.status(500).json({ error: 'An error occurred while fetching and deleting the admin.' });
  }
};
