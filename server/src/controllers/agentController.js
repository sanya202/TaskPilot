const Memory = require("../models/Memory");
const { ToolMessage } = require("@langchain/core/messages");

const { createAgent, systemPrompt } = require("../agent/agent");

const {
  createCreateTaskTool,
  createGetTasksTool,
  updateTask,
  createSearchTaskTool,
} = require("../tools/taskTools");

const { createWorkflowTool } = require("../tools/workflowTools");

const runAgent = async (req, res) => {
  try {
    const { userId, message } = req.body;

    // FETCH PREVIOUS MEMORY
    const previousMemories = await Memory.find({
      userId,
    })
      .sort({
        createdAt: -1,
      })
      .limit(5);

    const memoryContext = previousMemories
      .map((memory) => `User: ${memory.message}\nAssistant: ${memory.response}`)
      .join("\n\n");

    const tools = {
      create_task: createCreateTaskTool(userId),
      create_workflow: createWorkflowTool(userId),
      get_tasks: createGetTasksTool(userId),
      update_task: updateTask(userId),
      search_task: createSearchTaskTool(userId),
    };

    const agent = createAgent(userId);

    let aiResponse = await agent.invoke([
      {
        role: "system",
        content: `${systemPrompt}

Previous conversation history:

${memoryContext || "No previous conversations."}
`,
      },

      {
        role: "user",
        content: message,
      },
    ]);

    // Execute tools if AI requested them

    while (aiResponse.tool_calls?.length) {
      let toolMessages = [];

      for (const call of aiResponse.tool_calls) {
        const tool = tools[call.name];

        if (tool) {
          console.log("EXECUTING TOOL:", call.name);
          console.log("ARGS:", call.args);

          const result = await tool.invoke(call.args);

          console.log("TOOL RESULT:", result);

          toolMessages.push(
            new ToolMessage({
              content: result,
              tool_call_id: call.id,
            }),
          );
        }
      }

      aiResponse = await agent.invoke([
        {
          role: "system",
          content: `${systemPrompt}

Previous conversation history:

${memoryContext || "No previous conversations."}
`,
        },

        {
          role: "user",
          content: message,
        },

        aiResponse,

        ...toolMessages,
      ]);
    }

    //ending of the fucntion
    console.log("FINAL AI RESPONSE:", aiResponse);
    const response = aiResponse.content;

    if (response) {
      await Memory.create({
        userId,
        message,
        response,
      });
    }

    res.json({
      success: true,
      response,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  runAgent,
};
