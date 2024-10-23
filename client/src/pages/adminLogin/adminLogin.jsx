import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./adminLogin.scss";


const AdminLogin = () => {
  const { adminLogin } = useContext(AuthContext); // Use adminLogin function for admin authentication
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  // Handle input field changes
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await adminLogin(inputs); // Call admin login function from AuthContext
      navigate("/admin/dashboard"); // Redirect to admin dashboard on successful login
    } catch (err) {
      setError("Admin login failed. Please check your credentials.");
    }
  };

  return (
    <div className="adminLogin">
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="username"
          placeholder="Admin Username"
          value={inputs.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={inputs.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
