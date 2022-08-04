const User = require("../models/User");

const getAllUsers = async (req, res) => {
  const users = await User.find({});

  res.status(200).json({ users });
};

const getAUser = async (req, res) => {
  const { userID } = req.params;

  const user = await User.findById({ _id: userID });

  res.status(200).json({ user });
};

const updateAUser = async (req, res) => {
  const { userID } = req.params;

  const user = await User.findByIdAndUpdate({ _id: userID }, req.body, {
    new: true,
  });

  res.status(200).json({ user });
};

const deleteAUser = async (req, res) => {
  const { userID } = req.params;

  const user = await User.findByIdAndDelete({ _id: userID });

  console.log("I reach here oo");
  console.log(user);

  res.status(204).send("");
};

module.exports = {
  getAllUsers,
  getAUser,
  updateAUser,
  deleteAUser,
};
