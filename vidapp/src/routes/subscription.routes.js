import { Router } from "express";
import {
  getSubscribedChannels,
  getUserChannelSubscribers,
  toggleSubscription,
} from "../controllers/subscription.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

// unsecured routes
router.route("/get-subscribers/:channelId").get(getUserChannelSubscribers);
router
  .route("/get-subscribed-channels/:subscriberId")
  .get(getSubscribedChannels);

// secured routes
router
  .route("/toggle-subscription/:channelId")
  .post(verifyJWT, toggleSubscription);

export default router;
