import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getComments = (req, res) => {
  const q = `SELECT c.*, u.userId AS userId, username, profilePic FROM comments AS c JOIN user AS u ON (u.userId = c.userid)
    WHERE c.postid = ? ORDER BY c.createdAt DESC
    `;
    
  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};



export const addComment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO comments(`desc`, `createdAt`, `userid`, `postid`) VALUES (?,?,?,?)";
    const values = [
      req.body.desc,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
      req.body.postId
    ];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Comment has been created.");
    });
  });
};

export const deleteComment = (req, res) => {
  // Ensure token name is consistent
  const token = req.cookies.accessToken; // Use accessToken if consistent with the rest of your app

  if (!token) {
    return res.status(401).json({ message: "Not authenticated!" });
  }

  // Use the correct secret key for token verification
  jwt.verify(token, "secretkey", (err, userInfo) => { // Ensure this is the same key used for token signing
    if (err) {
      console.log("Token verification error:", err);
      return res.status(403).json({ message: "Token is not valid!" });
    }

    const commentId = req.params.id; 
 // Ensure userInfo contains the right data
    
    // SQL query to delete the comment where the comment's userId matches the current user's ID
    const q = "DELETE FROM comments WHERE `id` = ? AND `userid` = ?";

    db.query(q, [commentId, userInfo.id], (err, data) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).json({ message: "Internal server error." });
      }
      
   
      
      // Check if any rows were affected (i.e., comment deleted)
      if (data.affectedRows > 0) {
        return res.json({ message: "Comment has been deleted!" });
      }

      return res.status(403).json({ message: "You can only delete your own comments!" });
    });
  });
};

