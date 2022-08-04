const express = require("express");

const router = express.Router();

const {
  getAllUsers,
  getAUser,
  updateAUser,
  deleteAUser,
} = require("../controllers/admin");

router.route("/users").get(getAllUsers);
router
  .route("/user/:userID")
  .get(getAUser)
  .patch(updateAUser)
  .delete(deleteAUser);

module.exports = router;
