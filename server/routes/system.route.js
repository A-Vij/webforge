import express from "express";
import { completeQuest } from "../controllers/system.controller.js";

const router = express.Router();

// router.post("/get-quest", getQuest);
router.post("/complete-quest", completeQuest);

export default router;