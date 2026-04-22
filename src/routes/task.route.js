const express = require("express");
const taskController = require("../controllers/task.controller");
const verifyToken = require("../middleware/auth.middleware");
const {
  validateTaskCreateInput,
  validateTaskUpdateInput,
  validateObjectIdParam,
} = require("../middleware/validate.middleware");

const router = express.Router();

router.use(verifyToken);

router.post("/", validateTaskCreateInput, taskController.createTask);
router.get("/", taskController.getTasks);
router.get("/:id", validateObjectIdParam("id"), taskController.getTaskById);
router.patch(
  "/:id",
  validateObjectIdParam("id"),
  validateTaskUpdateInput,
  taskController.updateTask
);
router.delete("/:id", validateObjectIdParam("id"), taskController.deleteTask);

module.exports = router;
