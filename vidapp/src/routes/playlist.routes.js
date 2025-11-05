import { Router } from "express";
import {
  addVideoToPlaylist,
  createPlaylist,
  deletePlaylist,
  getPlaylistById,
  getUserPlaylists,
  removeVideoFromPlaylist,
  updatePlaylist,
} from "../controllers/playlist.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

// unsecured routes
router.route("/get-user-playlists/:userId").get(getUserPlaylists);
router.route("/get-playlist-by-id/:playlistId").get(getPlaylistById);

// secured routes
router.route("/create-playlist").post(verifyJWT, createPlaylist);
router.route("/add-video").patch(verifyJWT, addVideoToPlaylist);
router.route("/remove-video").patch(verifyJWT, removeVideoFromPlaylist);
router.route("/delete-playlist/:playlistId").delete(verifyJWT, deletePlaylist);
router.route("/update-playlist/:playlistId").patch(verifyJWT, updatePlaylist);

export default router;
