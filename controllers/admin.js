const User = require("../models/User");

const getAllUsers = async (req, res) => {
  const users = await User.find({});

  res.status(200).json({ users });
};

const getAUser = async (req, res) => {
  const { userID } = req.params;

  const user = await User.findById({ userID });

  res.status(200).json({ user });
};

const updateAUser = async (req, res) => {
  const { userID } = req.params;

  const user = await User.findByIdAndUpdate({ userID, ...req.body });

  res.status(200).json({ user });
};

const deleteAUser = async (req, res) => {
  const { userID } = req.params;

  await User.findByIdAndDelete({ userID });

  res.status(204);
};
