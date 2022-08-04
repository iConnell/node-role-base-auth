const express = require("express");
const {
  allStaff,
  getStaff,
  updateStaff,
  deleteStaff,
  createStaff,
} = require("../controllers/manager");

const router = express.Router();

router.route("/all-staff").get(allStaff).post(createStaff);
router.route("staff").get(getStaff).patch(updateStaff).delete(deleteStaff);
