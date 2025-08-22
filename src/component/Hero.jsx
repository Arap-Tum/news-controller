import React from "react";
import { Link } from "react-router-dom";
import "../styles/hero.css";
export const Hero = ({ name, isNewUser, onLogout }) => {
  return (
    <section className="hero-author">
      <header>
        <h1 className="hero-title">
          {isNewUser ? "Welcome to the News App," : "Welcome back,"}
          <span className="hero-name"> {name}</span>
        </h1>
        <p className="hero-subtitle">Manage your news content effectively.</p>
      </header>

      <div className="hero-actions">
        <Link to="/add-article" className="btn-primary">
          Write a New Article
        </Link>
        <button onClick={onLogout} className="btn-secondary">
          Logout
        </button>
      </div>
    </section>
  );
};
