import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./LoginScreen.css";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginHandler = async e => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json"
      }
    };

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        config
      );
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("MenuOptionCache", "User Executive");
      history.push("/admin");
      window.location.reload();
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  //set path to employee register page on button click
  const routeChange = () => {
    let path = `/EmployeeReport`;
    history.push(path);
  };

  return (
    <div className="login-screen">
      <form onSubmit={loginHandler} className="login-screen__form">
        <h3 className="login-screen__title">Login</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Email address"
            onChange={e => setEmail(e.target.value)}
            value={email}
            tabIndex={1}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password:{" "}
            <Link to="/forgotpassword" className="login-screen__forgotpassword">
              Forgot Password?
            </Link>
          </label>
          <input
            type="password"
            required
            id="password"
            autoComplete="true"
            placeholder="Enter password"
            onChange={e => setPassword(e.target.value)}
            value={password}
            tabIndex={2}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <span className="login-screen__subtext">
          Don't have an account? <Link to="/register">Register As Admin</Link>
        </span>
        or
        <span className="login-screen__subtext">
          <Link to="/employeeregister">Register As Employee</Link>
        </span>
        <button className="btn btn-primary" onClick={routeChange}>
          Employee Reports Portal
        </button>
      </form>
    </div>
  );
};

export default LoginScreen;
