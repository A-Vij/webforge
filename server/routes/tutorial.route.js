import express from "express"
import { createTut, fetchTut, fetchPop, fetchTitle } from "../controllers/tutorial.controller.js";

const router = express.Router();

router.post("/create-tutorial", createTut);
router.post("/:slug", fetchTut);

router.get("/:topic", fetchTitle);
router.get("/popular", fetchPop);

export default router;