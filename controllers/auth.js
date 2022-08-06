const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, email, password, type } = req.body;

  if (!username || !password || !email) {
    return res.status(400).send("One or more required fields missing");
  }

  const user = await User.create({ ...req.body });

  res.status(201).send("Sign Up successful, proceed to login");
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("You must enter username and password");
  }

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).send("User with username not found, sign up");
  }

  const isMatch = await user.checkPassword(password);

  if (!isMatch) {
    return res.status(401).send("Username or Password incorrect");
  }

  const token = await user.createToken();

  res.status(200).json({ msg: "Login Successful", token });
};

const resetPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  try {
    await sendEmail(email, token);
  } catch (err) {
    console.log(err);
  }

  res
    .status(200)
    .send("A Password reset email will be sent if user with that email exists");
};

const changePassword = async (req, res) => {
  const { token } = req.params;

  const { password1, password2 } = req.body;
  if (password1 != password2) {
    return res.status(400).send("Passwords do not match");
  }

  try {
    const { email } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ email });

    user.password = password1;
    user.save();

    res.status(200).send("Password Changed Successfully");
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};

const getAllUsers = async (req, res) => {
  users = await User.find({});

  res.status(200).json(users);
};

const deleteAll = async (req, res) => {
  await User.deleteMany({});

  res.status(200).json({ msg: "done" });
};

module.exports = {
  register,
  login,
  resetPassword,
  changePassword,

  getAllUsers,
  deleteAll,
};
