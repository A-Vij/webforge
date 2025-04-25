import express from "express";

import { verifyToken } from "../middlewares/verifyToken.js";
import { checkCompletion, collectRewards, completeTut, getProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/get-profile", verifyToken, getProfile);

router.post("/collect-rewards", verifyToken, collectRewards);
router.post("/check-completion", verifyToken, checkCompletion);
router.post("/mark-completed", verifyToken, completeTut);
export default router;