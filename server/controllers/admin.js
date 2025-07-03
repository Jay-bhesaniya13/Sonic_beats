import Admin from '../models/admin.js';

// Fetch all admins
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    console.error('Error fetching admins:', error);
    res.status(500).json({ message: 'Error fetching admins', error });
  }
};

//get admin by ID
export const getAdminById = async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await User.findById(id);

    if (!admin) {
      return res.status(404).json({ message: 'admin not found' });
    }
    else{
      res.status(200).json(admin);
    }
  } catch (error) {
    console.error('Error fetching admin:', error);
    res.status(500).json({ message: 'Error fetching admin', error });
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

// Update an admin
export const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.status(200).json(updatedAdmin);
  } catch (error) {
    console.error('Error updating admin:', error);
    res.status(500).json({ message: 'Error updating admin', error });
  }
};

// Delete an admin by ID 
export const deleteAdminById = async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

  
    // Delete the admin
    await Admin.findByIdAndDelete(id);

    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
    console.error('Error deleting admin:', error);
    res.status(500).json({ error: 'An error occurred while deleting the admin' });
  }
};
