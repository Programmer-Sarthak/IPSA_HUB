import express from "express";
import { getUser, getUser2, searchUsers, updateUser, deleteUser } from "../controllers/user.js";

const router = express.Router();

// Route to find a user by ID
router.get("/find/:userId", getUser);

// Route to get suggested users
router.get("/suggestions/:userId", getUser2);

// Route to search users by username
router.get("/search", searchUsers);

// Route to update user details
router.put("/", updateUser);

// Route to delete a user
router.delete("/:userId", deleteUser);

export default router;
