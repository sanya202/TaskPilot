const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const {
    runAgent
}=require("../controllers/agentController");

router.post("/", authMiddleware, runAgent);


module.exports=router;