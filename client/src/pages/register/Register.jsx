import DropdownFunction from "../../components/loginfunction/DropdownFunction"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./register.scss"
import axios from "axios";

const Register = () => {

const [inputs, setInputs] = useState({
    dep: 1,
    role: 1,
    roleId: "",
    username: "",
    password: ""
  });

  const [selectedValue, setSelectedValue] = useState(1);
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
  // Check if the field is 'dep' and parse it to integer
  const parsedValue = name === "dep" ? parseInt(value, 10) : value;
  setInputs((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const handleRoleChange = (val) => {
    setSelectedValue(val);
    setInputs((prev) => ({
      ...prev,
      role: val === 1 ? 1 : 2,
    }));
  };

  const navigate = useNavigate()

  const handleClick = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post("http://localhost:8800/api/auth/register", inputs);
      navigate("/login")
    } catch (err) {
      setErr(err.response.data);
    }
  };

  console.log(err)


  return (
    <div className="register">
        <div className="card">
          <div className="left">
            <h1>IPSA HUB</h1>
            <p>IPS Academy, a premier institution of Central India, has become a celebrated brand name & has carved a unique identity for itself as a center of excellence in the entire country due to a variety of reasons.
            </p>
            <span>Already have an Account?</span>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>
          <div className="right">
              <h1>Register</h1>
              <form>
                *Select Department
                <select id="dep" name="dep" onChange={handleChange}>
                      <option value="1">Engineering</option>
                      <option value="2">Management</option>
                      <option value="3">Computers</option>
                      <option value="4">Science</option>
                      <option value="5">Pharmacy</option>
                      <option value="6">Fine Arts</option>
                      <option value="7">Commerce</option>
                  </select> 
                  *Select Role
                   <DropdownFunction setSelectedValue={handleRoleChange} />
                    {selectedValue === 1 ? (
                      <input type="text" placeholder="Enrollment No." name="roleId" onChange={handleChange}/>
                    ) : (
                      <input type="text" placeholder="Faculty ID" name="roleId" onChange={handleChange}/>
                    )} 
                  <input type="text" placeholder=" Create username" name="username" onChange={handleChange}/>
                  <input type="password" placeholder="Create password" name="password" onChange={handleChange}/>
                  {err && err}
                  <button onClick={handleClick}>Register</button>
              </form>
            </div>
          </div>
      </div>
  )
}

export default Register
