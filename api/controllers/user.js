import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const token = req.cookies.accessToken; // Get token from cookies

  if (!token) {
    return res.status(401).json({ message: "Not authenticated!" });
  }

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid!" });
    }

    const userId = req.params.userId;

    // Check if the logged-in user is trying to access their own profile or another user's profile
  

    const q = "SELECT * FROM user WHERE userId = ?";

    db.query(q, [userId], (err, data) => {
      if (err) return res.status(500).json(err);
      if (!data.length || !data[0].isApproved) return res.status(403).json("User not approved."); // Check approval
      const { password, ...info } = data[0];
      return res.json(info);
    });
  });
};

export const getUser2 = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated!" });
  }

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid!" });
    }

    const loggedInUserId = userInfo.id; // Use the logged-in user's ID from the token

    // Fetch approved users excluding the logged-in user and users they already follow
    const q = `
      SELECT userId, username, profilePic 
      FROM user 
      WHERE isApproved = 1 
      AND userId != ? 
      AND userId NOT IN (SELECT followedUserId FROM relationships WHERE followerUserId = ?)
      ORDER BY RAND() LIMIT 10`; // Randomize results, limit to 10 users

    db.query(q, [loggedInUserId, loggedInUserId], (err, data) => {
      if (err) return res.status(500).json({ message: "Database error." });
      if (data.length === 0) return res.status(403).json("No suggested users found.");

      return res.json(data); // Return the list of suggested users
    });
  });
};




export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated!" });
  }

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid!" });
    }

    const { username, coverPic, profilePic, bio } = req.body;

    // Prepare the SQL query to update only the specified fields
    const q = `
      UPDATE user 
      SET username = ?, coverPic = ?, profilePic = ?, descr = ?
      WHERE userId = ?;
    `;

    db.query(
      q,
      [username, coverPic, profilePic, bio, userInfo.id],
      (err, data) => {
        if (err) {
          console.error("Database update error:", err);
          return res.status(500).json({ message: "Internal server error." });
        }

        return res.status(200).json({
          message: "Profile updated successfully!",
          username,
          coverPic,
          profilePic,
          descr: bio,
        });
      }
    );
  });
};

export const searchUsers = (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json("Search query is required");
  }

  // Update the SQL query to filter for approved users
  const q = "SELECT userId, username, profilePic FROM user WHERE username LIKE ? AND isApproved = 1"; // Assuming isApproved is a boolean (1 for true)
  const values = [`%${query}%`]; // Use the search query with wildcards

  db.query(q, values, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Search failed" });
    }
    res.status(200).json(data); // Send the found users back to the frontend
  });
};


export const deleteUser = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated!" });
  }

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid!" });
    }

    const userId = req.params.userId; // Get the user ID from the request parameters

    // Ensure only the user is able to delete their own account
    const q = "DELETE FROM user WHERE userId = ? AND userId = ?";
    db.query(q, [userId, userInfo.userId], (err, result) => {
      if (err) {
        console.error("Database delete error:", err);
        return res.status(500).json({ message: "Internal server error." });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found or not authorized to delete." });
      }

      return res.status(200).json({ message: "User deleted successfully!" });
    });
  });
};
