const Address = require("../models/Address");

/** ADD */
exports.addAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const payload = { ...req.body, userId };

    const address = await Address.create(payload);
    res.json({ success: true, address , message: "Address added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};


/** LIST */
exports.getAddresses = async (req, res) => {
  const addresses = await Address.findAll({
    where: { userId: req.user.id }
  });
  res.json(addresses);
};

/** UPDATE */
exports.updateAddress = async (req, res) => {
  await Address.update(req.body, {
    where: { id: req.params.id, userId: req.user.id }
  });
  res.json({ message: "Address updated successfully" });
};

/** DELETE */
exports.deleteAddress = async (req, res) => {
  await Address.destroy({
    where: { id: req.params.id, userId: req.user.id }
  });
  res.json({ message: "Address deleted successfully" });
};
