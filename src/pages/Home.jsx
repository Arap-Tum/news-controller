import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import { Hero } from "../component/Hero";
import { ListOfNews } from "../component/ListOfNews";

import { getMyArticles } from "../api/articles";

import "../styles/home.css";

export const Home = ({ onLogout }) => {
  const { user } = useAuth(); // Get user from context

  const [articles, setArticles] = React.useState([]);

  const location = useLocation();
  const isNewUser = location.state?.isNewUser;

  useEffect(() => {
    const fetchMyArticles = async () => {
      try {
        const response = await getMyArticles();
        setArticles(response.data);
        console.log("✅ My articles fetched successfully", response.data);
      } catch (error) {
        console.error("Error fetching my articles:", error);
        console.error("❌ My articles Error:", error.message);
        console.log("🔍 URL:", error.config?.baseURL + error.config?.url);
      }
    };

    fetchMyArticles();
  }, []);

  return (
    <>
      <div className="author-home">
        {/* Hero Section */}
        <Hero
          name={user?.name || "Author Name"}
          isNewUser={isNewUser}
          onLogout={onLogout}
        />

        {/* Articles Section */}
        <section className="authored-news">
          <div className="articles-wrapper">
            <ListOfNews articles={articles} />
          </div>
        </section>
      </div>
    </>
  );
};
