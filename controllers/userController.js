exports.getProfile = async (req, res) => {
  res.json({
    message: "User profile fetched",
    user: req.user
  });
};
