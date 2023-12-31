import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";
const Login = () => {
  const nav = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState();
  const handleChange = (e) => {
    e.preventDefault();
    setError('')
    setCredentials((prevdata) => ({
      ...prevdata,
      [e.target.name]: e.target.value,
    }));
  };
  const [show, setShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = credentials;
    try {
      const res = await axios.post("http://localhost:5000/users/login", {
        username: username,
        password: password,
      });
      if (res.status === 200) {
        const {
          data: { role },
        } = res;
        return role === "admin"
          ? nav(`/admindashboard`)
          : nav(`/userdashboard/${username}`);
      } else setError("check with Admin");
    } catch (error) {
      setError("*Invalid user or password");
      console.log(error.message);
    }
  };
  return (
    <div className="login-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="title-container">
          <h2 className="title-header">Sign in</h2>
        </div>
        <div className="login-username-container">
          <label htmlFor="inpt-username" className="username-lable">
            Username
          </label>
          <input
            name="username"
            className="inpt-username"
            type="text"
            value={credentials.username}
            placeholder="Username"
            onChange={handleChange}
            required
          />
        </div>
        <div className="login-password-container">
          <label htmlFor="inpt-password" className="pass-lable">
            Password
          </label>
          <div className="passspan">
          <input
            name="password"
            className="inpt-password"
            type={show ? "text" : "password"}
            value={credentials.password}
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button
          type="button"
            className="btn show-password"
            onClick={() => {
              setShow(!show);
            }}
          >
            {show === false ? (
              <span className="material-symbols-outlined">visibility_off</span>
            ) : (
              <span className="material-symbols-outlined">visibility</span>
            )}
          </button>
          </div>
        </div>
        {error ? <p className="login-error">{error}</p> : ""}
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
