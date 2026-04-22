const express = require("express");
const authController = require("../controllers/auth.controller");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../middleware/validate.middleware");

const router = express.Router();

router.post("/register", validateRegisterInput, authController.register);
router.post("/login", validateLoginInput, authController.login);

module.exports = router;
