import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, password, dep, role, roleId } = req.body;

  // Input Validation
  if (!username || !password || !roleId) {
    return res.status(400).json("All fields are required!");
  }

  // Convert role to integer if it's a string
  const roleInt = parseInt(role, 10);
  if (![1, 2].includes(roleInt)) {
    return res.status(400).json("Invalid role specified.");
  }

  try {
    // CHECK IF USER EXISTS
    const [existingUsers] = await db.promise().query("SELECT * FROM user WHERE username = ?", [username]);

    if (existingUsers.length) {
      return res.status(409).json("User already exists!");
    }

    // HASH THE PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // DEFINE INSERT QUERY BASED ON ROLE
    let insertQuery;
    let values = [];

    if (roleInt === 1) { // Student
      insertQuery =
        "INSERT INTO user (`enrollment_number`, `department_id`, `role_id`, `username`, `password`,`coverPic`,`profilePic`) VALUES (?,?,?,?,?,?,?)";
      values = [roleId, dep, roleInt, username, hashedPassword,"white.jpg","dprofile.jpg"];
    } else if (roleInt === 2) { // Faculty
      insertQuery =
        "INSERT INTO user (`faculty_id`, `department_id`, `role_id`, `username`, `password`,`coverPic`,`profilePic`) VALUES (?,?,?,?,?,?,?)";
      values = [roleId, dep, roleInt, username, hashedPassword,"white.jpg","dprofile.jpg"];
    }

    // EXECUTE INSERT QUERY
    const [result] = await db.promise().query(insertQuery, values);

    if (result.affectedRows === 0) {
      return res.status(500).json({ message: "User creation failed." });
    } else{
      return res.status(201).json({ message: "User has been created." });
    }
  
  } catch (err) {
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const login = (req, res) => {
  console.log(req.body.username)
  const q = "SELECT * FROM user WHERE username = ?"; // Fetch user based on username

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    // Verify the password
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
    if (!isPasswordCorrect) return res.status(400).json("Wrong password or username!");

    // Check if the user is approved
    if (!data[0].isApproved) return res.status(403).json("User is not approved.");

    // Check if the role_id matches the expected value
    const expectedRoleId = req.body.role;  // Assuming role is being sent from frontend
    if (data[0].role_id !== expectedRoleId) {
      return res.status(403).json("Role does not match.");
    }

    // Generate the JWT token using the user's actual ID
    const token = jwt.sign({ id: data[0].userId }, "secretkey", { expiresIn: "1h" });

    // Remove password before sending user info back
    const { password, ...info } = data[0];

    // Set token in cookies
    res.cookie("accessToken", token, {
      httpOnly: true,
      sameSite: "strict",
    }).status(200).json(info); // Send user info back to frontend
  });
};


export const logout = (req, res) => {
  res.clearCookie("accessToken", {
    secure: true,
    sameSite: "none",
  }).status(200).json("User has been logged out.");
};
