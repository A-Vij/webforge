import express from "express";

import { verifyToken } from "../middlewares/verifyToken.js";
import { getProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/get-profile", verifyToken, getProfile);

export default router;