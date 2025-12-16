const Pan = require('../models/Pan');

exports.getPan = async (req, res) => {
  try {
    const userId = req.user.id; // assuming JWT auth or session
    const pan = await Pan.findOne({ where: { userId } });
    res.json(pan || {});
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to fetch PAN info' });
  }
};

exports.savePan = async (req, res) => {
  try {
    const userId = req.user.id;
    const { panNumber, fullName } = req.body;

    // Check if PAN exists
    let pan = await Pan.findOne({ where: { userId } });

    if (pan) {
      // update
      pan.panNumber = panNumber;
      pan.fullName = fullName;
      await pan.save();
      res.json({ success: true, message: 'PAN info updated', pan });
    } else {
      // create
      pan = await Pan.create({ panNumber, fullName, userId });
      res.json({ success: true, message: 'PAN info saved', pan });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to save PAN info' });
  }
};
