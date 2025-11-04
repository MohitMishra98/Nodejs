import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTweet = asyncHandler(async (req, res) => {
  //TODO: create tweet
  const { content } = req.body;

  if (!content) {
    throw new ApiError(400, "content not provided");
  }

  const tweet = await Tweet.create({
    content,
    owner: req.user._id,
  });

  if (!tweet) {
    throw new ApiError(500, "tweet cannot be created");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, tweet, "tweet created successfully"));
});

const getUserTweets = asyncHandler(async (req, res) => {
  // TODO: get user tweets
  const { userId, limit = 10, page = 1 } = req.query;

  const limitNo = parseInt(limit) || 10;
  const pageNo = parseInt(page) || 1;
  const skipBy = (pageNo - 1) * limitNo;

  if (!userId) {
    throw new ApiError(400, "user id is not provided");
  }

  const data = await Tweet.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(String(userId)),
      },
    },
    {
      $skip: skipBy,
    },
    {
      $limit: limitNo,
    },
  ]);

  if (data.length === 0) {
    throw new ApiError(400, "no tweets found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, data, "tweets fetched successfully"));
});

const updateTweet = asyncHandler(async (req, res) => {
  //TODO: update tweet
  const { content, tweetId } = req.body;

  if (!content) {
    throw new ApiError(400, "content was not provided");
  }

  const tweet = await Tweet.findById(tweetId);

  if (!tweet.owner.equals(req.user._id)) {
    throw new ApiError(400, "user is not the owner of tweet");
  }

  tweet.content = content;
  await tweet.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "tweet updated successfully"));
});

const deleteTweet = asyncHandler(async (req, res) => {
  //TODO: delete tweet
  const { tweetId } = req.body;

  if (!tweetId) {
    throw new ApiError(400, "tweet id is not provided");
  }

  const tweet = await Tweet.findOneAndDelete({
    $and: [
      { owner: req.user._id },
      { _id: new mongoose.Types.ObjectId(String(tweetId)) },
    ],
  });

  if (!tweet) {
    throw new ApiError(
      400,
      "tweet not found or user is not the owner of tweet"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "tweet deleted successfully"));
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };
