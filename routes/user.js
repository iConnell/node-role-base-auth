const express = require("express");
const profile = require("../controllers/user");

const router = express.Router();

router.route("").get(profile);

module.exports = router;
