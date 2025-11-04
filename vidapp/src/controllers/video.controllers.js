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

  const pageNo = parseInt(page);
  const limitNo = parseInt(limit);

  const skipby = (pageNo - 1) * limitNo;

  // dynamic pipeline constructor
  const pipeline = {};

  if (userId) {
    pipeline.owner = new mongoose.Types.ObjectId(String(userId));
  }
  if (query) {
    pipeline.$or = [
      { title: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
    ];
  }

  // this basically creates a pipeline like this
  // (object.name creates a new field in that object)
  // (pipeline.owner will create a new key value pair owner as key object id as value)
  // {
  //   $match: {
  //     owner: new mongoose.Types.ObjectId(String(userId)),
  //     $or = [
  //       { title: { $regex: query, $options: "i" } },
  //       { description: { $regex: query, $options: "i" } },
  //     ]
  //   }
  // }

  const data = await Video.aggregate([
    {
      $match: pipeline,
    },
    {
      $sort: {
        [sortBy || "createdAt"]: sortType === "desc" ? -1 : 1,
      },
    },
    {
      $skip: skipby || 0,
    },
    {
      $limit: limitNo || 10,
    },
  ]);

  if (data.length === 0) {
    throw new ApiError(404, "No videos with given parameters found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, data, "video fetched successfully"));
});

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
  if (!videoId) {
    throw new ApiError(400, "video id not provided");
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "video not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, video, "video fetched successfully"));
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: update video details like title, description, thumbnail

  if (!videoId) {
    throw new ApiError(400, "video is is not provided");
  }

  const { title, description } = req.body;

  if (!title || !description) {
    throw new ApiError(400, "title or description is not provided");
  }

  const thumbnailPath = req.files?.thumbnail[0].path;
  if (!thumbnailPath) {
    throw new ApiError(404, "thumbnail path is not found");
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "video not found");
  }

  console.log(video.owner, req.user._id);

  if (!video.owner.equals(req.user._id)) {
    throw new ApiError(401, "video does not belongs to user");
  }

  const thumbnailCloud = await uploadOnCloudinary(thumbnailPath);

  if (!thumbnailCloud.url) {
    throw new ApiError(400, "not uploaded to cloud");
  }

  const newVideo = await Video.findByIdAndUpdate(
    videoId,
    {
      description,
      title,
      thumbnail: thumbnailCloud.url,
    },
    { new: true }
  );

  if (!newVideo) {
    throw new ApiError(400, "video not updated");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, newVideo, "video updated successfully"));
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: delete video

  if (!videoId) {
    throw new ApiError(400, "video id is not provided");
  }

  const video = await Video.findOneAndDelete({
    $and: [
      { _id: videoId },
      { owner: new mongoose.Types.ObjectId(String(req.user._id)) },
    ],
  });

  if (!video) {
    throw new ApiError(400, "video not found or not owned by user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "video deleted successfully"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!videoId) {
    throw new ApiError(400, "video id not found");
  }

  const video = await Video.findById(videoId);

  if (!video.owner.equals(req.user._id)) {
    throw new ApiError(401, "User is not the owner of video");
  }

  video.isPublished = !video?.isPublished;

  await video.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, [], "published status toggled"));
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
