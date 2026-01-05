const { Op } = require("sequelize");
const { User } = require("../../models");
/**
 * ✅ GET ALL USERS (role = USER only)
 * Admin panel listing API
 */
exports.getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const sortBy = req.query.sortBy || "id";
    const sortOrder = req.query.sortOrder === "desc" ? "DESC" : "ASC";

    const offset = (page - 1) * limit;

    const whereCondition = {
      role: "USER",
      ...(search && {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
          { phone: { [Op.like]: `%${search}%` } }
        ]
      })
    };

    const { count, rows } = await User.findAndCountAll({
      where: whereCondition,
      order: [[sortBy, sortOrder]],
      limit,
      offset,
      attributes: { exclude: ["password"] }
    });

    res.status(200).json({
      success: true,
      data: {
        users: rows,
        pagination: {
          totalRecords: count,
          totalPages: Math.ceil(count / limit),
          currentPage: page
        }
      }
    });
  } catch (err) {
    console.error("Admin getUsers error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * ✅ GET SINGLE USER DETAILS
 */
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id, role: "USER" },
      attributes: { exclude: ["password"] }
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * ✅ ACTIVATE / DEACTIVATE USER
 */
exports.toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id, role: "USER" }
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User ${user.isActive ? "activated" : "deactivated"} successfully`
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * ✅ DELETE USER
 */
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id, role: "USER" }
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    await user.destroy();

    res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
