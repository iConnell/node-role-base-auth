const jwt = require("jsonwebtoken");
// const Token = require("../models/Token");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("Authorization credentials invalid");
  }

  const inputToken = authHeader.split(" ")[1];

  try {
    const userDetails = jwt.verify(inputToken, process.env.JWT_SECRET);

    req.user = userDetails;
    next();
  } catch (error) {
    return res.status(401).send("Invalid Token");
  }
};

const staffMiddleware = async (req, res, next) => {
  if (req.user.userType != "S") {
    return res
      .status(401)
      .send("you're not authorized to access this resource");
  }
  next();
};

const managerMiddleware = async (req, res, next) => {
  if (req.user.userType != "M") {
    return res
      .status(401)
      .send("You're not authorized to access this resource");
  }
  next();
};

const adminMiddleware = async (req, res, next) => {
  if (req.user.userType != "A") {
    return res
      .status(401)
      .send("You're not authorized to access this resource");
  }
  next();
};
module.exports = {
  authMiddleware,
  staffMiddleware,
  managerMiddleware,
  adminMiddleware,
};
