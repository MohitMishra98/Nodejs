import { Router } from "express";
import {
  createTweet,
  deleteTweet,
  getUserTweets,
  updateTweet,
} from "../controllers/tweet.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

// unsecured routes
router.route("/get-tweets").get(getUserTweets);

// secured routes
router.route("/create-tweet").post(verifyJWT, createTweet);
router.route("/update-tweet").patch(verifyJWT, updateTweet);
router.route("/delete-tweet").delete(verifyJWT, deleteTweet);

export default router;
