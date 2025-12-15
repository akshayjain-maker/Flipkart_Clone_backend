const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findByPk(decoded.id);

      return next();
    } catch (error) {
      res.status(401);
      return res.json({ message: "Not authorized, token failed" });
    }
  }

  res.status(401).json({ message: "No token provided" });
};
