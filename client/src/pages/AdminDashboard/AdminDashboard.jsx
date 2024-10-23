import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './adminDashboard.scss';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [showApproved, setShowApproved] = useState(false); // Start with false to show pending users
  const [error, setError] = useState(null);
  const [filterRole, setFilterRole] = useState('all'); // State for filtering by role

  const fetchUsers = async () => {
    try {
      setError(null); // Clear any previous errors before making a request
      const endpoint = showApproved 
        ? 'http://localhost:8800/api/admin/users/approved' 
        : 'http://localhost:8800/api/admin/users/pending';
        
      const response = await axios.get(endpoint);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error.response ? error.response.data : error.message);
      setError("Failed to fetch users.");
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users whenever the component mounts or showApproved changes
  }, [showApproved]);

  const handleApprove = async (userId) => {
    try {
      await axios.post(`http://localhost:8800/api/admin/users/approve/${userId}`);
      // Re-fetch users after approving
      fetchUsers();
    } catch (error) {
      console.error("Error approving user:", error);
      setError("Failed to approve user.");
    }
  };

  // Function to filter users based on selected role
  const filteredUsers = users.filter(user => {
    if (filterRole === 'all') return true; // Show all users
    return user.role_name.toLowerCase() === filterRole.toLowerCase(); // Filter based on role
  });

  return (
    <div className="admin-dashboard">
      <div className="header">
        <h1>{showApproved ? 'Approved Users' : 'Pending Users'}</h1>
        <button onClick={() => setShowApproved(!showApproved)}>
          {showApproved ? 'Show Pending Users' : 'Show Approved Users'}
        </button>
      </div>
      <div className="filter-options">
        <label htmlFor="roleFilter">Filter by Role:</label>
        <select id="roleFilter" value={filterRole} onChange={e => setFilterRole(e.target.value)}>
          <option value="all">All</option>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
          {/* Add more roles as needed */}
        </select>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="user-list">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Enrollment/Faculty ID</th>
              <th>Department</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <tr key={user.userId}>
                  <td>{user.username}</td>
                  <td>{user.role_id === 1 ? user.enrollment_number : user.faculty_id}</td>
                  <td>{user.department_name}</td>
                  <td>{user.role_name}</td>
                  <td>
                    {!showApproved ? (
                      <button className="approve-button" onClick={() => handleApprove(user.userId)}>Approve</button>
                    ) : (
                      <button className="approved-button" disabled>Approved</button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
