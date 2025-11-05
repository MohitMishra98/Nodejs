import mongoose, { isValidObjectId } from "mongoose";
import { Playlist } from "../models/playlist.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  //TODO: create playlist
  if (!name || !description) {
    throw new ApiError(400, "name or description not provided");
  }

  const playlist = await Playlist.create({
    name,
    description,
    owner: req.user._id,
  });

  if (!playlist) {
    throw new ApiError(500, "playlist cannot be created");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "playlist created successfully"));
});

const getUserPlaylists = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  //TODO: get user playlists

  if (!userId) {
    throw new ApiError(400, "user id is not provided");
  }

  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "invalid user id");
  }

  const playlist = await Playlist.find({
    owner: userId,
  });

  if (!playlist) {
    throw new ApiError(404, "playlists not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "playlists fetched successfully"));
});

const getPlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  //TODO: get playlist by id

  if (!playlistId) {
    throw new ApiError(400, "playlist id is not provided");
  }

  if (!isValidObjectId(playlistId)) {
    throw new ApiError(400, "invalid playlist id");
  }

  const playlist = await Playlist.findById(playlistId);

  if (!playlist) {
    throw new ApiError(404, "playlist not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "playlist fetched successfully"));
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.body;

  if (!playlistId || !videoId) {
    throw new ApiError(400, "playlist id or video id is not provided");
  }

  if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
    throw new ApiError(400, "invalid playlist id or video id");
  }

  const playlist = await Playlist.findById(playlistId);

  if (!playlist.owner.equals(req.user._id)) {
    throw new ApiError(400, "user is not the owner of playlist");
  }

  playlist.videos.push(videoId);

  await playlist.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "video added successfully"));
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.body;
  // TODO: remove video from playlist

  if (!playlistId || !videoId) {
    throw new ApiError(400, "playlist id or video id is not provided");
  }

  if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
    throw new ApiError(400, "invalid playlist id or video id");
  }

  const playlist = await Playlist.findById(playlistId);

  if (!playlist.owner.equals(req.user._id)) {
    throw new ApiError(400, "user is not the owner of playlist");
  }

  playlist.videos = playlist.videos.filter((vidId) => !vidId.equals(videoId));

  await playlist.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "video removed successfully"));
});

const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  // TODO: delete playlist

  if (!playlistId) {
    throw new ApiError(400, "playlist id is not provided");
  }

  if (!isValidObjectId(playlistId)) {
    throw new ApiError(400, "invalid playlist id");
  }

  const playlist = await Playlist.findById(playlistId);

  if (!playlist) {
    throw new ApiError(404, "playlist not found");
  }

  if (!playlist.owner.equals(req.user._id)) {
    throw new ApiError(400, "user is not the owner of playlist");
  }

  await Playlist.findByIdAndDelete(playlistId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "playlist deleted successfully"));
});

const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;
  //TODO: update playlist

  if (!name || !description) {
    throw new ApiError(400, "name or description is not provided");
  }

  if (!playlistId) {
    throw new ApiError(400, "playlist id is not provided");
  }

  if (!isValidObjectId(playlistId)) {
    throw new ApiError(400, "invalid playlist id");
  }

  const playlist = await Playlist.findById(playlistId);

  if (!playlist) {
    throw new ApiError(404, "playlist not found");
  }

  if (!playlist.owner.equals(req.user._id)) {
    throw new ApiError(400, "user is not the owner of playlist");
  }

  playlist.description = description;
  playlist.name = name;

  await playlist.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "playlist updated successfully"));
});

export {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};
