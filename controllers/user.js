const User = require("../models/User");

const profile = async (req, res) => {
  const userID = req.user.id;

  const user = await User.findById({ _id: userID });

  res.status(200).json({ user });
};

module.exports = profile;
