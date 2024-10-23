import { db } from "../connect.js"; // Ensure to import your db connection
import jwt from "jsonwebtoken";
 // Import bcrypt

// Admin login function
export const adminLogin = (req, res) => {
  const { username, password } = req.body;

  // Query to fetch the admin by username
  const q = "SELECT * FROM admin WHERE username = ?";

  db.query(q, [username], (err, data) => {
    if (err) return res.status(500).json("Server error occurred.");
    if (data.length === 0) return res.status(404).json("Admin not found.");

    const admin = data[0];

    // Compare the provided password with the stored password directly (no bcrypt)
    if (password !== admin.password) {
      return res.status(400).json("Wrong password.");
    }

    // Generate a JWT token for the admin login, with an expiration time
    const token = jwt.sign({ id: admin.id, isAdmin: true }, "secretkey", { expiresIn: "1h" });

    // Set the token in the cookie and send back admin data excluding the password
    res.cookie("accessToken", token, {
      httpOnly: true, // Prevent client-side access
      sameSite: "strict", // Ensure the token is only sent with requests to the same site
    }).status(200).json({ id: admin.id, username: admin.username, isAdmin: true });
  });
};


// Function to approve user
export const approveUser = (req, res) => {
    const userId = req.params.userId; // Get userId from URL params
    const q = "UPDATE user SET isApproved = 1 WHERE userId = ?"; // Ensure this query is correct
  
    db.query(q, [userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User approved successfully."); // Send a success message
    });
  };

  // Function to get approved users
export const approvedUser = (req, res) => {
  const q = `SELECT 
          u.userId, 
          u.enrollment_number, 
          u.faculty_id, 
          u.department_id, 
          u.role_id, 
          u.username, 
          u.password, 
          u.coverPic, 
          u.profilePic, 
          u.descr, 
          u.isApproved, 
          u.isAdmin,
          d.department_name,  -- Assuming you have a department_name column in the department table
          r.role_name          -- Assuming you have a role_name column in the role table
      FROM 
          user AS u
      LEFT JOIN 
          department AS d ON u.department_id = d.department_id  -- Join with department table
      LEFT JOIN 
          role AS r ON u.role_id = r.role_id  -- Join with role table
      WHERE 
          u.isApproved = 1`; // Fetch users who are approved

  db.query(q, (err, data) => {
    if (err) {
      console.error("Database query error:", err); // Log any query error
      return res.status(500).json(err);
    }
    // Log the data retrieved from the database
    return res.status(200).json(data); // Send the data back as JSON
  });
};


// In src/controllers/admin.js
export const adminLogout = (req, res) => {
  // Clear the access token cookie
  res.clearCookie("accessToken", { httpOnly: true, sameSite: "strict" });
  return res.status(200).json("Logged out successfully."); // Send a logout success message
};

  

// Function to get pending users
export const pendingUser = (req, res) => {
  const q = `SELECT 
          u.userId, 
          u.enrollment_number, 
          u.faculty_id, 
          u.department_id, 
          u.role_id, 
          u.username, 
          u.password, 
          u.coverPic, 
          u.profilePic, 
          u.descr, 
          u.isApproved, 
          u.isAdmin,
          d.department_name,  -- Assuming you have a department_name column in the department table
          r.role_name          -- Assuming you have a role_name column in the role table
      FROM 
          user AS u
      LEFT JOIN 
          department AS d ON u.department_id = d.department_id  -- Join with department table
      LEFT JOIN 
          role AS r ON u.role_id = r.role_id  -- Join with role table
      WHERE 
          u.isApproved = 0`;

  db.query(q, (err, data) => {
    if (err) {
      console.error("Database query error:", err); // Log any query error
      return res.status(500).json(err);
    }
    // Log the data retrieved from the database
    return res.status(200).json(data); // Send the data back as JSON
  });
};


export const getApprovedUsers = (req, res) => {
  const q = "SELECT u.userId, u.enrollment_number, u.faculty_id, u.username, d.department_name, r.role_name " +
            "FROM user AS u " +
            "LEFT JOIN department AS d ON u.department_id = d.department_id " +
            "LEFT JOIN role AS r ON u.role_id = r.role_id " +
            "WHERE u.isApproved = 1"; // Fetch users who are approved

  db.query(q, (err, data) => {
    if (err) {
      console.error("Database query error:", err); // Log any query error
      return res.status(500).json(err);
    }
    console.log("Approved Users:", data); // Log the data retrieved from the database
    return res.status(200).json(data); // Send the data back as JSON
  });
};



