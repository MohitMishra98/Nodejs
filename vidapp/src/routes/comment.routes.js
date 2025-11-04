import { Router } from "express";
import {
  getVideoComments,
  addComment,
  updateComment,
  deleteComment,
} from "../controllers/comment.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

// unsecured routes
router.route("/get-comments/:videoId").get(getVideoComments);

// secured routes
router.route("/add-comment").post(verifyJWT, addComment);
router.route("/update-comment").patch(verifyJWT, updateComment);
router.route("/delete-comment").delete(verifyJWT, deleteComment);

export default router;
