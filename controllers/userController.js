const { User } = require('../models');

// ✅ GET profile
exports.getProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,
      gender: req.user.gender,
      role: req.user.role
    }
  });
};

// ✅ UPDATE profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, phone, gender } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    await user.update({
      name: name ?? user.name,
      phone: phone ?? user.phone,
      gender: gender ?? user.gender
    });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
