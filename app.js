const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const managerRoutes = require("./routes/manager");
const staffRoutes = require("./routes/staff");

const {
  authMiddleware,
  staffMiddleware,
  managerMiddleware,
  adminMiddleware,
} = require("./middlewares/auth");

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);
app.use(authMiddleware);
app.use("/admin", adminMiddleware, adminRoutes);
app.use("/manager", managerMiddleware, managerRoutes);
app.use("/staff", staffMiddleware, staffRoutes);

const port = process.env.PORT || 8000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log("Speak for the app is listening");
    });
  } catch (err) {
    console.log(err);
  }
};
start();
