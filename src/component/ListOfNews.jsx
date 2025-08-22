import React from "react";
import { Link } from "react-router-dom";
import "../styles/listArticles.css";

export const ListOfNews = ({ articles }) => {
  // ✅ Sort by createdAt for consistency
  const sortedArticles = [...articles].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="articles-container">
      <h1 className="articles-title">My Articles</h1>

      {sortedArticles.length === 0 ? (
        <p className="articles-empty">No articles found</p>
      ) : (
        <div>
          <header className="section-header">
            <p>Here you can find all the articles you have authored.</p>
          </header>

          {/* ✅ Use sortedArticles.length not raw articles */}
          <p className="articles-count">
            Total Articles: {sortedArticles.length}
          </p>

          <ul className="articles-list">
            {sortedArticles.map((article) => (
              <li key={article.id} className="article-card">
                {/* Image */}
                {article.imageUrl && (
                  <div className="article-image">
                    <img src={article.imageUrl} alt={article.title} />
                  </div>
                )}

                {/* Content */}
                <div className="article-content">
                  <h2 className="article-title">
                    <Link to={`/article/${article.id}`}>
                      {article.title.slice(0, 70)}
                    </Link>
                  </h2>

                  <p className="article-meta">
                    <span>
                      {new Date(article.createdAt).toLocaleDateString()}
                    </span>
                  </p>

                  {article.category?.name && (
                    <span className="article-category">
                      {article.category.name}
                    </span>
                  )}

                  <p className="article-excerpt">
                    {article.content.slice(0, 120)}...
                  </p>

                  {/* Flags */}
                  <div className="article-flags">
                    {article.isFeatured && (
                      <span className="badge featured">Featured</span>
                    )}
                    {article.isTrending && (
                      <span className="badge trending">🔥 Trending</span>
                    )}
                  </div>

                  {/* Read More */}
                  <Link to={`/article/${article.id}`} className="btn-read">
                    Read More →
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
