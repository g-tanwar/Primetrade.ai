const express = require("express");
const userController = require("../controllers/user.controller");
const verifyToken = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

const router = express.Router();

router.get("/", verifyToken, authorizeRoles("admin"), userController.getUsers);

module.exports = router;
