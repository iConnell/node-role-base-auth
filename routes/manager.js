const express = require("express");
const {
  allStaff,
  getStaff,
  updateStaff,
  deleteStaff,
  createStaff,
} = require("../controllers/manager");

const router = express.Router();

router.route("/staffs").get(allStaff).post(createStaff);
router
  .route("/staff/:userID")
  .get(getStaff)
  .patch(updateStaff)
  .delete(deleteStaff);

module.exports = router;
