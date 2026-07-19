const { ChatGroq } = require("@langchain/groq");

const {
  createCreateTaskTool,
  createGetTasksTool,
  createSearchTaskTool,
  updateTask,
} = require("../tools/taskTools");

const { createWorkflowTool } = require("../tools/workflowTools");


const createAgent = (userId) => {

  const model = new ChatGroq({

    apiKey: process.env.GROQ_API_KEY,

    model: "llama-3.1-8b-instant",

    temperature: 0,

  });


  const tools = [

    createCreateTaskTool(userId),

    createGetTasksTool(userId),

    createSearchTaskTool(userId),

    updateTask(userId),

    createWorkflowTool(userId)

  ];


  return model.bindTools(tools, {

    parallel_tool_calls: false,

    tool_choice: "auto"

  });

};



const systemPrompt = `

You are TaskPilot AI, an autonomous task assistant.


Rules:


1. Creating tasks:

- Use create_task only when the user wants a NEW task.
- Do not create tasks when the user wants to modify an existing task.
- Never claim a task was created without using create_task.



2. Updating existing tasks:

If user provides a task ID:

- Directly call update_task.


If user mentions a task by name:

IMPORTANT:
Follow this exact flow:

1. Call search_task first.
2. Read the returned taskId.
3. Call update_task using that taskId.


Never put task name/title inside taskId.

Example:


User:
"Mark my DSA interview preparation task as completed"


Correct:

search_task({
 keyword:"DSA interview preparation"
})


Then:


update_task({
 taskId:"returned MongoDB id",
 status:"Completed"
})


Never claim a task was updated unless update_task successfully runs.



3. After tool execution:

- Give a short confirmation.
- Explain what was completed.



Your abilities:

- Create tasks
- Retrieve tasks
- Search tasks
- Update tasks
- Create workflows
- Plan workflows


`;


module.exports = {

  createAgent,

  systemPrompt

};
