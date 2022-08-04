const User = require("../models/User");

const createStaff = async (req, res) => {
  const staff = await User.create({ ...req.body, userType: "S" });

  res.status(201).json({ staff });
};

const allStaff = async (req, res) => {
  const staffs = await User.find({ userType: "S" });

  res.status(200).json({ staffs });
};

const getStaff = async (req, res) => {
  const { userID } = req.params;
  const staff = await User.findOne({ _id: userID, userType: "S" });

  res.status(200).json({ staff });
};

const updateStaff = async (req, res) => {
  const { userID } = req.params;
  const staff = await User.findOneAndUpdate({ _id: userID }, req.body, {
    new: yes,
  });

  res.status(200).json({ staff });
};

const deleteStaff = async (req, res) => {
  const { userID } = req.params;
  await User.findOneAndDelete({ _id: userID, userType: "S" });

  res.status(204).send("deleted");
};

module.exports = {
  createStaff,
  allStaff,
  getStaff,
  updateStaff,
  deleteStaff,
};
