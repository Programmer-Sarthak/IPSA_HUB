import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";


export const getPosts = (req, res) => {
  const userId = req.query.userId;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      userId !== "undefined"
        ? `SELECT p.*, u.userId AS userId, username, profilePic FROM posts AS p JOIN user AS u ON (u.userId = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC`
        : `SELECT p.*, u.userId AS userId, u.username, u.profilePic 
FROM posts AS p
JOIN user AS u ON u.userId = p.userId
LEFT JOIN relationships AS r ON r.followedUserId = p.userId
WHERE r.followerUserId = ? OR p.userId = ?
GROUP BY p.id
ORDER BY p.createdAt DESC;
`;

    const values =
      userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "DELETE FROM posts WHERE `id`=? AND `userId` = ?";

    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if(data.affectedRows>0) return res.status(200).json("Post has been deleted.");
      return res.status(403).json("You can delete only your post")
    });
  });
};



export const addPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid or has expired!");

    const { desc, img } = req.body;

    // Ensure post contains either description or image
    if (!desc && !img) {
      return res.status(400).json("Post must contain either text or an image!");
    }

    const q = "INSERT INTO posts (`desc`, `img`, `userid`, `createdAt`) VALUES (?, ?, ?, ?)";

    const values = [
      desc || null, // Store null if no description
      img || null,  // Store null if no image
      userInfo.id,  // Retrieved from the JWT token
      moment().format("YYYY-MM-DD HH:mm:ss"), // Current timestamp
    ];

    db.query(q, values, (err, data) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json("An error occurred while creating the post.");
      }
      return res.status(200).json("Post has been successfully created");
    });
  });
};


