const express = require("express");
const taskController = require("../controllers/task.controller");
const verifyToken = require("../middleware/auth.middleware");

const router = express.Router();

router.use(verifyToken);

router.post("/", taskController.createTask);
router.get("/", taskController.getTasks);
router.get("/:id", taskController.getTaskById);
router.patch("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
