import mongoose from "mongoose";
import { Video } from "../models/video.models.js";
import { Subscription } from "../models/subscription.models.js";
import { Like } from "../models/like.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";

const getChannelStats = asyncHandler(async (req, res) => {
  // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.

  const data = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(String(req.user._id)),
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "_id",
        foreignField: "owner",
        as: "videos",
        pipeline: [
          {
            $lookup: {
              from: "likes",
              let: { videoId: "$_id" },
              pipeline: [
                { $match: { $expr: { $eq: ["$video", "$$videoId"] } } },
                { $count: "count" },
              ],
              as: "likes",
            },
          },
          {
            $addFields: {
              noOfLikes: { $ifNull: [{ $first: "$likes.count" }, 0] },
            },
          },
          {
            $project: { noOfLikes: 1, views: 1 },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "channel",
        as: "subs",
      },
    },
    {
      $addFields: {
        totalLikes: { $sum: "$videos.noOfLikes" },
        totalViews: { $sum: "$videos.views" },
        numberOfVideos: { $size: "$videos" },
        numberOfSubs: { $size: "$subs" },
      },
    },
    {
      $project: {
        name: 1,
        numberOfVideos: 1,
        numberOfSubs: 1,
        totalLikes: 1,
        totalViews: 1,
      },
    },
  ]);

  if (data.length === 0) {
    throw new ApiError(404, "channel not found");
  }

  const stats = {
    likes: data[0].totalLikes,
    views: data[0].totalViews,
    videos: data[0].numberOfVideos,
    subscribers: data[0].numberOfSubs,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, stats, "stats fetched successfully"));
});

const getChannelVideos = asyncHandler(async (req, res) => {
  // TODO: Get all the videos uploaded by the channel

  const videos = await Video.find({
    owner: req.user._id,
  });

  if (!videos) {
    throw new ApiError(404, "videos not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, videos, "videos fetched successfully"));
});

export { getChannelStats, getChannelVideos };
