const { tool } = require("@langchain/core/tools");
const { z } = require("zod");

const Task = require("../models/Task");

const createWorkflowTool = (userId) =>
  tool(
    async ({ tasks }) => {
      console.log("WORKFLOW USER:", userId);

      const createdTasks = await Task.insertMany(
        tasks.map((task) => ({
          userId,
          title: task.title,
          priority: task.priority,
          description: "Created by TaskPilot AI workflow",
        })),
      );

      return JSON.stringify(
        createdTasks.map((task) => ({
          title: task.title,
          priority: task.priority,
        })),
      );
    },

    {
      name: "create_workflow",

      description: "Create multiple tasks from a user goal or plan.",

      schema: z.object({
        tasks: z.array(
          z.object({
            title: z.string(),

            priority: z.enum(["Low", "Medium", "High"]),
          }),
        ),
      }),
    },
  );

module.exports = {
  createWorkflowTool,
};
