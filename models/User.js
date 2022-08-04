const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: 3,
    maxlength: 100,
    required: true,
  },
  lastName: {
    type: String,
    minlength: 3,
    maxlength: 100,
    required: true,
  },
  email: {
    type: String,
    minlength: 3,
    maxlength: 200,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  },
  username: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  userType: {
    type: String,
    enum: ["R", "M", "S", "A"],
    required: true,
    default: "R",
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.checkPassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);

  return isMatch;
};

UserSchema.methods.createToken = async function () {
  return jwt.sign(
    { username: this.username, id: this.id, userType: this.userType },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

module.exports = mongoose.model("User", UserSchema);
