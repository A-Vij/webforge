import express from "express"
import { createTut, fetchTut, fetchPop } from "../controllers/tutorial.controller.js";

const router = express.Router();

router.post("/create-tutorial", createTut);
router.post("/:slug", fetchTut);
router.get("/popular", fetchPop);

export default router;