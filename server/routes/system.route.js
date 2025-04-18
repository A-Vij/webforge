import express from "express";
import { completeQuest, createQuest } from "../controllers/system.controller.js";

const router = express.Router();

// router.post("/get-quest", getQuest);
router.post("/create", createQuest);
router.post("/complete", completeQuest);

export default router;