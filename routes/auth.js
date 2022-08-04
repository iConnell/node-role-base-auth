const express = require("express");
const {
  register,
  login,
  logout,
  resetPassword,
  changePassword,
  getAllUsers,
  deleteAll,
} = require("../controllers/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/reset-password/", resetPassword);
router.post("/reset-password/:token", changePassword);

router.route("/all").get(getAllUsers).delete(deleteAll);

module.exports = router;
