import "./register.css";
import React, { useState } from "react";
import Nav from "../admin/adminnav/nav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [error, setError] = useState();
  const nav = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    name: "",
    email: "",
    contactNumber: "",
    password: "",
    role: "",
  });
  const handleChange = (e) => {
    e.preventDefault();
    setCredentials((prevdata) => ({
      ...prevdata,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target.role.value === "None") {
      setError("*Please select Role");
      return;
    }
    else if(credentials.username.length<4){
      setError("*Username must have at least 4 characters");
    }
    else if(credentials.password.length<6){
      setError("*Password must have at least 6 characters");
    }
     else {
      try {
        const res = await axios.post("http://localhost:5000/users/register", {
          credentials,
        });
        if (res.status === 201) {
          alert("User Created");
          return nav("/admindashboard");
        }
      } catch (error) {
        setError("*Username or Email already exist");
        console.log(error.message);
      }
    }
  };
  return (
    <main>
      <Nav active={"register"} pageTitle={"Register User"} />
      <div className="register-container">
        {error ? <p className="error">{error}</p> : ""}
        <form onSubmit={handleSubmit}>
          <div className="register-username-container">
            <label htmlFor="username">Username</label>
            <br />
            <input
              name="username"
              className="register-username"
              type="text"
              value={credentials.username}
              placeholder="Username"
              onChange={handleChange}
              required
            />
          </div>
          <div className="register-name-container">
            <label htmlFor="name">Name</label>
            <br />
            <input
              name="name"
              className="register-name"
              type="text"
              value={credentials.name}
              placeholder="Name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="register-email-container">
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              name="email"
              className="register-email"
              value={credentials.email}
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="register-contactNumber-container">
            <label htmlFor="contactNumber">Contact Number</label>
            <br />
            <input
              type="text"
              name="contactNumber"
              className="register-contactNumber"
              value={credentials.contactNumber}
              placeholder="Contact Number"
              onChange={handleChange}
              required
            />
          </div>
          <div className="register-password-container">
            <label htmlFor="password">Password</label>
            <br />
            <input
              type= 'text'
              name="password"
              className="register-password"
              value={credentials.password}
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>
          <div className="register-role-container">
            <label htmlFor="Role">Role</label>
            <select
              className="register-role-container"
              name="role"
              value={credentials.role}
              onChange={handleChange}
            >
              <option>None</option>
              <option className="ddoption" value="user">
                user
              </option>
              <option className="ddoption" value="admin">
                admin
              </option>
            </select>

            <button type="submit" className="btn-register">
              Register
            </button>
            <div className="register-role-options"></div>
          </div>
        </form>
      </div>
    </main>
  );
};
export default Register;