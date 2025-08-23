import { useState } from "react";

import { Loading } from "../component/Loading";

import "../styles/landingPage.css";

const Login = ({ onLogin, loading }) => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onLogin(form);
    setForm({ email: "", password: "" });
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">Login</h2>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-input"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-input"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="auth-button">
          <span>Login</span>
        </button>

        <p className="auth-link">
          Don’t have an account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
