import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  //TODO: get all videos based on query, sort, pagination
});

// this should be a secured route
// TODO: make sure to add it in the secured route section
// also make sure that the multer is setup properly in the routes as middlewares
const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  // TODO: get video, upload to cloudinary, create video

  if (!title || !description) {
    throw new ApiError(400, "title and description not provided");
  }

  const videoPath = req.files?.video[0].path;
  if (!videoPath) {
    throw new ApiError(400, "video path not obtained");
  }

  const thumbnailPath = req.files?.thumbnail[0].path;
  if (!thumbnailPath) {
    throw new ApiError(400, "thumbnail path not obtained");
  }

  const videoCloud = await uploadOnCloudinary(videoPath);

  if (!videoCloud?.url) {
    throw new ApiError(400, "video upload error");
  }

  const thumbnailCloud = await uploadOnCloudinary(thumbnailPath);

  if (!thumbnailCloud?.url) {
    throw new ApiError(400, "thumbnail upload error");
  }

  const duration = videoCloud.duration;
  if (!duration) {
    throw new ApiError(400, "error finding the duration");
  }

  const ownerId = req.user?._id;

  const video = await Video.create({
    videoFile: String(videoCloud.url),
    thumbnail: String(thumbnailCloud.url),
    title,
    description,
    duration,
    owner: new mongoose.Types.ObjectId(String(ownerId)),
  });

  if (!video) {
    throw new ApiError(500, "error creating video");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, video, "video uploaded successfully"));
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: get video by id
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: update video details like title, description, thumbnail
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: delete video
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
