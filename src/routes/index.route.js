const express = require("express");
const userRoutes = require("./user.route");
const authRoutes = require("./auth.route");
const taskRoutes = require("./task.route");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/tasks", taskRoutes);

module.exports = router;
