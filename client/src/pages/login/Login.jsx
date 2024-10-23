import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import "./login.scss";
import DropdownFunction from "../../components/loginfunction/DropdownFunction";
import { AuthContext } from "../../context/authContext";

const Login = () => {
  const { login } = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    role: 1, // Default role
    username: "",
    password: "",
  });

  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRoleChange = (value) => {
    setInputs((prev) => ({ ...prev, role: value })); // Update role based on dropdown selection
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs); // Try to login
      navigate('/'); // Navigate after successful login
    } catch (err) {
      setErr(err.response?.data || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>IPSA HUB</h1>
          <p>Continuous & rigorous training & development regime hones the communication, leadership & entrepreneurial skills of students ensuring creation of quality job offers as well as promising entrepreneurs.</p>
          <span>Don't have an Account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
          <Link to="/admin/login" className="admin-login-link">
            <button className="admin-login-button">Admin Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <DropdownFunction setSelectedValue={handleRoleChange} />
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <button type="submit">Login</button>
          </form>
          {err && <span className="error">{err}</span>}
        </div>
      </div>
    </div>
  );
};

export default Login;
