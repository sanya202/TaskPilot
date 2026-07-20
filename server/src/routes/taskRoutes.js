const express = require("express");

const router = express.Router();

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

// create task
router.post("/", createTask);

// get tasks by user
router.get("/:userId", getTasks);

// update task
router.put("/:id", updateTask);

// delete task
router.delete("/:id", deleteTask);

module.exports = router;
