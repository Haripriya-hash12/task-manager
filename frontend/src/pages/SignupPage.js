import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../api";

function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const name = formData.name.trim();
    const email = formData.email.trim();
    const password = formData.password.trim();

    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await apiRequest("/auth/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });
      setSuccess("Signup successful. Please login.");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page">
      <div className="card auth-card">
        <h2>Signup</h2>
        <p className="muted-text">Create your account to manage tasks easily.</p>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="full-btn">
            Signup
          </button>
        </form>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <p className="auth-link-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
