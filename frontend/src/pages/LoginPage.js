import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../api";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const email = formData.email.trim();
    const password = formData.password.trim();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const data = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page">
      <div className="card auth-card">
        <h2>Login</h2>
        <p className="muted-text">Welcome back! Please sign in to continue.</p>
        <form onSubmit={handleSubmit} className="form">
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
            Login
          </button>
        </form>
        {error && <p className="error">{error}</p>}
        <p className="auth-link-text">
          Do not have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
