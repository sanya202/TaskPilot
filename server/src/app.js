const express = require("express");
const cors = require("cors");

const agentRoutes = require("./routes/agentRoutes");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/agent", agentRoutes);
app.use("/api/tasks",taskRoutes);
app.use("/api/auth", authRoutes);


app.get("/",(req,res)=>{
    res.json({
        message:"TaskPilot AI Server Running 🚀"
    });
});


module.exports = app;