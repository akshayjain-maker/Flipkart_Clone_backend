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
      res.status(400);
      throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400);
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token
    });
  } catch (err) {
    next(err);
  }
};
