const express = require("express");
const cors = require("cors");

const agentRoutes = require("./routes/agentRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/agent", agentRoutes);
app.use("/api/tasks",taskRoutes);


app.get("/",(req,res)=>{
    res.json({
        message:"TaskPilot AI Server Running 🚀"
    });
});


module.exports = app;