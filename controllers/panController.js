const { Pan } = require('../models'); // ✅ destructure to get the actual model

exports.getPan = async (req, res) => {
  try {
    const userId = req.user.id;
    const pan = await Pan.findOne({ where: { userId } }); // ✅ now findOne exists
    res.json({ success: true, data: pan || {} });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to fetch PAN info' });
  }
};

exports.savePan = async (req, res) => {
  try {
    const userId = req.user.id;
    const { panNumber, fullName } = req.body;

    let pan = await Pan.findOne({ where: { userId } });

    if (pan) {
      pan.panNumber = panNumber;
      pan.fullName = fullName;
      await pan.save();
      res.json({ success: true, message: 'PAN info updated', data: pan });
    } else {
      pan = await Pan.create({ panNumber, fullName, userId });
      res.json({ success: true, message: 'PAN info saved', data: pan });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to save PAN info' });
  }
};
