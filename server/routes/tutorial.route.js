import express from "express"
import { createTut, fetchTut, fetchPop, fetchTitle, searchTut } from "../controllers/tutorial.controller.js";

const router = express.Router();

router.get("/popular", fetchPop);
router.get("/:topic", fetchTitle);
router.post("/search-titles", searchTut);

router.post("/create", createTut);
router.post("/:slug", fetchTut);


export default router;