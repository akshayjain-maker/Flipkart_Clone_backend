const { Address } = require("../models"); // ✅ CORRECT

/** ADD */
exports.addAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const payload = { ...req.body, userId };

    const address = await Address.create(payload);

    res.status(201).json({
      success: true,
      message: "Address added successfully",
      address
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

/** LIST */
exports.getAddresses = async (req, res) => {
  try {
    const addresses = await Address.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: addresses
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/** UPDATE */
exports.updateAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const address = await Address.findOne({
      where: { id, userId: req.user.id }
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found"
      });
    }

    await address.update(req.body);

    res.json({
      success: true,
      message: "Address updated successfully",
      address
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/** DELETE */
exports.deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const address = await Address.findOne({
      where: { id, userId: req.user.id }
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found"
      });
    }

    await address.destroy();

    res.json({
      success: true,
      message: "Address deleted successfully"
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
