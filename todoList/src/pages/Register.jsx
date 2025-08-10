import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";
import "bootstrap/dist/css/bootstrap.min.css";

const SERVER_URL =import.meta.env.VITE_SERVER_URL;

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    fetch(`${SERVER_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (res.ok) {
          alert("Registration successful! You can now log in.");
          navigate("/login");
        } else if (res.status === 409) {
          alert("Email already exists. Please try a different one.");
        } else {
          return res
            .json()
            .then((data) =>
              Promise.reject(data.message || "Registration failed")
            );
        }
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card shadow p-4 p-md-5 register-card">
        <h2 className="text-center mb-4">Register</h2>
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
          className="btn btn-success w-100"
          onClick={handleRegister}
        >
          Register
        </button>
        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-decoration-none">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
