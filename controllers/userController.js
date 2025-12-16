const User = require('../models/User');


exports.getProfile = async (req, res) => {
  res.json({
    message: "User profile fetched",
    user: req.user
  });
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { name, phone, gender } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (gender) user.gender = gender;

    await user.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        gender: user.gender
      }
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};