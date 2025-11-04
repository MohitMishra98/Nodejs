import mongoose from "mongoose";
import { Comment } from "../models/comment.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getVideoComments = asyncHandler(async (req, res) => {
  //TODO: get all comments for a video
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  if (!videoId) {
    throw new ApiError(400, "video id is not provided");
  }

  const pageNo = parseInt(page) || 1;
  const limitNo = parseInt(limit) || 10;

  const skipby = (pageNo - 1) * limitNo;

  const data = await Comment.aggregate([
    {
      $match: {
        video: new mongoose.Types.ObjectId(String(videoId)),
      },
    },
    {
      $skip: skipby,
    },
    {
      $limit: limitNo,
    },
  ]);

  if (data.length === 0) {
    throw new ApiError(400, "no comments found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, data, "comments fetched successfully"));
});

const addComment = asyncHandler(async (req, res) => {
  // TODO: add a comment to a video
  const { videoId, content } = req.body;

  if (!videoId) {
    throw new ApiError(400, "video id is not provided");
  }

  const comment = await Comment.create({
    content,
    video: new mongoose.Types.ObjectId(String(videoId)),
    owner: req.user._id,
  });

  if (!comment) {
    throw new ApiError(500, "comment cannot be created");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, comment, "comment added successfully"));
});

const updateComment = asyncHandler(async (req, res) => {
  // TODO: update a comment
  const { commentId, content } = req.body;

  if (!commentId || !content) {
    throw new ApiError(400, "no comment id or content provided");
  }

  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new ApiError(404, "comment not found");
  }

  if (!comment.owner.equals(req.user._id)) {
    throw new ApiError(400, "user is not a owner of the comment");
  }

  comment.content = content;
  await comment.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "comment updated successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
  // TODO: delete a comment
  const { commentId } = req.body;

  if (!commentId) {
    throw new ApiError(400, "comment id is not provided");
  }

  const comment = await Comment.findOneAndDelete({
    $and: [
      { owner: req.user._id },
      { _id: new mongoose.Types.ObjectId(String(commentId)) },
    ],
  });

  if (!comment) {
    throw new ApiError(400, "comment not found or owner did not match");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, comment, "comment removed successfully"));
});

export { getVideoComments, addComment, updateComment, deleteComment };
