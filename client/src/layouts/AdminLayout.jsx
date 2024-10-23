// src/layouts/AdminLayout.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './adminLayout.scss';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext'; // Import your AuthContext

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext); // Get logout function from AuthContext

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function from context
      navigate('/'); // Redirect to user login after successful logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="admin-layout">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <nav className="admin-nav">
          <ul>
            <li>
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </nav>
      </header>
      <main className="admin-content">
        {children} {/* Render admin dashboard content */}
      </main>
    </div>
  );
};

export default AdminLayout;
