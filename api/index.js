import express from "express";
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import relationshipRoutes from "./routes/relationships.js";
import adminRoutes from "./routes/admin.js";

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true // Allow credentials to be sent
}));
app.use(cookieParser());
app.use(express.json());

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/public/upload"); // Ensure this path is correct
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage });

// Upload endpoint
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json("No file uploaded!");
  res.status(200).json(req.file.filename);
});

// Route declarations
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/relationships", relationshipRoutes);
app.use("/api/admin", adminRoutes);

// Start the server
app.listen(8800, () => {
  console.log("API running on port 8800!");
});
