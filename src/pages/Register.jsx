import { useState } from "react";

import { Loading } from "../component/Loading";

const Register = ({ onRegister, loading }) => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onRegister(form);
    setForm({ username: "", email: "", password: "" });
  };

  return (
    <div className="auth-container">
      {/* Loading Effect  */}
      {loading && <Loading />}

      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">Register</h2>

        <div className="form-group">
          <label className="form-label">Name:</label>
          <input
            type="text"
            name="username"
            className="form-input"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email:</label>
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
          <label className="form-label">Password:</label>
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
          Register
        </button>
        <p className="auth-link">
          Already have an account? <a href="/">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
