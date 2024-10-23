import express from "express";
import { pendingUser, approvedUser, approveUser, adminLogin, adminLogout } from "../controllers/admin.js"; // Import approvedUser

const router = express.Router();

// Admin login route
router.post("/login", adminLogin);

// Admin logout route (optional, just for demonstration)
router.post("/logout", adminLogout); // Define this in your controller if needed

// Route to get pending users
router.get('/users/pending', pendingUser);

// Route to get approved users
router.get('/users/approved', approvedUser); // New route for approved users

// Route to approve user
router.post('/users/approve/:userId', approveUser);

export default router;
