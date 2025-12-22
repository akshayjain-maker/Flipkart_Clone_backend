const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // check exists
    const exist = await User.findOne({ where: { email } });
    if (exist) {
      res.status(400);
      throw new Error("User already exists");
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPass });

    res.status(201).json({
      message: "User registered successfully",
      user
    });
  } catch (err) {
    next(err);
  }
};


exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 🔐 JWT me role bhi include karo
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role   // 👈 IMPORTANT
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role   // 👈 FRONTEND KE LIYE
      }
    });
  } catch (err) {
    next(err);
  }
};

