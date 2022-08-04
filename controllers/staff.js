const User = require("../models/User");

const getUsers = async (req, res) => {
  const users = await User.find({ userType: "R" });

  res.status(200).json({ users });
};

const getUser = async (req, res) => {
  const { userID } = req.params;
  const user = await User.findOne({ _id: userID, userType: "R" });

  res.status(200).json({ user });
};

const updateUser = async (req, res) => {
  const { userID } = req.params;
  const user = await User.findOneAndUpdate(
    { _id: userID, userType: "R" },
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json({ user });
};

const deleteUser = async (req, res) => {
  const { userID } = req.params;
  await User.findOneAndDelete({ _id: userID, userType: "R" });

  res.status(204).send("deleted");
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
