const express = require("express");

const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  createUser,
} = require("../controllers/staff");

const router = express.Router();

router.route("/users").get(getUsers);
router.route("/user/:userID").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
