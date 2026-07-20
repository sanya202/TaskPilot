const { tool } = require("@langchain/core/tools");
const { z } = require("zod");

const Task = require("../models/Task");

// ================= CREATE TASK =================

const createCreateTaskTool = (userId) =>
  tool(
    async ({ title, priority }) => {
      console.log("CREATE USER:", userId);

      const task = await Task.create({
        userId,
        title,
        priority,
        description: "Created by TaskPilot AI",
      });

      return `Created task: ${task.title}`;
    },

    {
      name: "create_task",

      description: "Create a new task for the user.",

      schema: z.object({
        title: z.string(),
        priority: z.enum(["Low", "Medium", "High"]),
      }),
    },
  );

// ================= GET ALL TASKS =================

const createGetTasksTool = (userId) =>
  tool(
    async () => {
      console.log("GET TASK USER ID:", userId);

      const tasks = await Task.find({
        userId,
      });

      console.log("FOUND TASKS:", tasks);

      return JSON.stringify(tasks);
    },

    {
      name: "get_tasks",

      description: "Retrieve all tasks of the user.",

      schema: z.object({
        dummy: z.string().optional(),
      }),
    },
  );

// ================= SEARCH TASK =================

const createSearchTaskTool = (userId) =>
  tool(
    async ({ keyword }) => {
      console.log("SEARCH USER:", userId);
      console.log("SEARCH KEYWORD:", keyword);

      const tasks = await Task.find({
        userId,

        title: {
          $regex: keyword,
          $options: "i",
        },
      });

      console.log("SEARCH RESULTS:", tasks);

      if (tasks.length === 0) {
        return "No matching tasks found";
      }

      return JSON.stringify(
        tasks.map((task) => ({
          taskId: task._id.toString(),
          title: task.title,
          status: task.status,
          priority: task.priority,
        })),
      );
    },

    {
      name: "search_task",

      description:
        "Delete an existing task. Always use the exact taskId returned by search_task. Never create your own taskId or use task title as taskId.",

      schema: z.object({
        keyword: z.string(),
      }),
    },
  );

// ================= UPDATE TASK =================

const updateTask = (userId) =>
  tool(
    async ({ taskId, status, priority }) => {
      console.log("UPDATE USER:", userId);
      console.log("UPDATE TASK ID:", taskId);

      const updatedTask = await Task.findOneAndUpdate(
        {
          _id: taskId,
          userId,
        },

        {
          ...(status && { status }),
          ...(priority && { priority }),
        },

        {
          returnDocument: "after",
        },
      );

      if (!updatedTask) {
        return "Task not found";
      }

      return JSON.stringify({
        title: updatedTask.title,

        status: updatedTask.status,

        priority: updatedTask.priority,
      });
    },

    {
      name: "update_task",

      description:
        "Update an existing task. Requires taskId returned from search_task.",

      schema: z.object({
        taskId: z.string(),

        status: z.enum(["Pending", "Completed"]).optional(),

        priority: z.enum(["Low", "Medium", "High"]).optional(),
      }),
    },
  );

// ================= DELETE TASK =================
const deleteTask = (userId) =>
  tool(
    async ({ taskId }) => {
      console.log("DELETE USER:", userId);
      console.log("DELETE TASK ID:", taskId);

      const deletedTask = await Task.findOneAndDelete({
        _id: taskId,
        userId,
      });

      if (!deletedTask) {
        return "Task not found";
      }

      return JSON.stringify({
        message: "Task deleted successfully",
        title: deletedTask.title,
      });
    },

    {
      name: "delete_task",

      description:
        "Delete an existing task. Use this only when the user wants to remove/delete a task.",

      schema: z.object({
        taskId: z.string(),
      }),
    },
  );

module.exports = {
  createCreateTaskTool,

  createGetTasksTool,

  createSearchTaskTool,

  updateTask,

  deleteTask,
};
