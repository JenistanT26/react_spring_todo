import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"; // custom styles
import "bootstrap/dist/css/bootstrap.min.css";

const SERVER_URL = "http://localhost:8080";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    fetch(`${SERVER_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject("Login failed")))
      .then((data) => {
        localStorage.setItem("token", data.token);
        navigate("/todos");
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card shadow p-4 p-md-5 login-card">
        <h2 className="text-center mb-4">Login</h2>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button
          className="btn btn-primary w-100"
          onClick={handleLogin}
        >
          Login
        </button>
        <p className="text-center mt-3">
          Don't have an account?{" "}
          <Link to="/register" className="text-decoration-none">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
