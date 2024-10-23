import { db } from "../connect.js";
import jwt from "jsonwebtoken";

// Get likes for a specific post
export const getLikes = (req, res) => {
  const q = "SELECT userid FROM likes WHERE postid = ?";

  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.map(like => like.userid));
  });
};

// Add a like to a post
export const addLike = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    // Check if the like already exists
    const checkQuery = "SELECT * FROM likes WHERE userid = ? AND postid = ?";
    db.query(checkQuery, [userInfo.id, req.body.postId], (err, results) => {
      if (err) return res.status(500).json(err);

      // If the like already exists, send a response
      if (results.length > 0) {
        return res.status(400).json("You have already liked this post.");
      }

      const q = "INSERT INTO likes (`userid`, `postid`) VALUES (?, ?)";
      const values = [userInfo.id, req.body.postId];

      db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Post has been liked.");
      });
    });
  });
};

// Remove a like from a post
export const deleteLike = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM likes WHERE `userid` = ? AND `postid` = ?";
    db.query(q, [userInfo.id, req.query.postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been disliked.");
    });
  });
};
