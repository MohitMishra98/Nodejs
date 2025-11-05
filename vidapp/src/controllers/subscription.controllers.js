import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.models.js";
import { Subscription } from "../models/subscription.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  // TODO: toggle subscription

  if (!channelId) {
    throw new ApiError(400, "channel id is not provided");
  }

  if (!isValidObjectId(channelId)) {
    throw new ApiError(400, "channel id is not valid");
  }

  let sub = await Subscription.findOne({
    channel: channelId,
    subscriber: req.user._id,
  });

  if (!sub) {
    sub = await Subscription.create({
      channel: channelId,
      subscriber: req.user._id,
    });

    if (!sub) {
      throw new ApiError(500, "subscription cannot be created");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, sub, "subscription created successfully"));
  }

  sub = await Subscription.findOneAndDelete({
    channel: channelId,
    subscriber: req.user._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, sub, "subscription deleted successfully"));
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  if (!channelId) {
    throw new ApiError(400, "channel id was not provided");
  }

  if (!isValidObjectId(channelId)) {
    throw new ApiError(400, "channel id is not valid");
  }

  const data = await Subscription.aggregate([
    {
      $match: {
        channel: { $exists: true, $ne: null },
        subscriber: { $exists: true, $ne: null },
        channel: new mongoose.Types.ObjectId(String(channelId)),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "subscriber",
        foreignField: "_id",
        as: "subscribers",
      },
    },
    {
      $addFields: {
        user: {
          $arrayElemAt: ["$subscribers", 0],
        },
      },
    },
    {
      $replaceRoot: { newRoot: "$user" },
    },
    {
      $project: {
        username: 1,
        coverImage: 1,
        avatar: 1,
        fullname: 1,
      },
    },
  ]);

  if (data.length === 0) {
    throw new ApiError(404, "data not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, data, "subscriptions fetched successfully"));
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.params;

  if (!subscriberId) {
    throw new ApiError(400, "subscriber id not provided");
  }

  if (!isValidObjectId(subscriberId)) {
    throw new ApiError(400, "subscriber id is not valid");
  }

  const data = await Subscription.aggregate([
    {
      $match: {
        subscriber: new mongoose.Types.ObjectId(String(subscriberId)),
        channel: { $exists: true, $ne: null },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "channel",
        foreignField: "_id",
        as: "channels",
      },
    },
    {
      $addFields: {
        user: { $arrayElemAt: ["$channels", 0] },
      },
    },
    {
      $replaceRoot: { newRoot: "$user" },
    },
    {
      $project: {
        username: 1,
        coverImage: 1,
        avatar: 1,
        fullname: 1,
      },
    },
  ]);

  if (data.length === 0) {
    throw new ApiError(404, "data not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, data, "channels fetched successfully"));
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
