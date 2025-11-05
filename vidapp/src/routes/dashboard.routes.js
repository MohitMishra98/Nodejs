import { Router } from "express";
import {
  getChannelStats,
  getChannelVideos,
} from "../controllers/dashboard.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

// secured routes
router.route("/get-stats").get(verifyJWT, getChannelStats);
router.route("/get-channel-videos").get(verifyJWT, getChannelVideos);

export default router;
