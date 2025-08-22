import React, { useState } from "react";
import "../styles/article.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteArticle } from "../api/articles";
import { useAuth } from "../context/AuthContext";

import { Loading } from "../component/Loading";

export const Article = ({ articles, loading, setLoading }) => {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const article = articles.find((art) => art.id === id);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this article?"))
      return;

    try {
      setLoading(true);
      await deleteArticle(id, token);
      toast.success("Article deleted successfully!");
      navigate("/author/home");
    } catch (error) {
      console.error("Error deleting article:", error);
      toast.error("Failed to delete article.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ State for See More / See Less
  const [showFullContent, setShowFullContent] = useState(false);

  if (!article) {
    return <main className="article-page">{loading && <Loading />}</main>;
  }

  return (
    <main className="article-page">
      {loading && <Loading />}

      {!loading && (
        <>
          <div className="article-actions">
            <Link to="/author/home">
              <button className="back-btn">Back to Articles</button>
            </Link>
            <Link to={`/edit-article/${article.id}`}>
              <button className="edit-btn">Edit Article</button>
            </Link>
            <button className="delete-btn" onClick={handleDelete}>
              Delete Article
            </button>
          </div>

          {article ? (
            <div className="article-card">
              {/* Action Buttons */}

              {/* Article Image */}
              {article.imageUrl && (
                <div className="article-image">
                  <img src={article.imageUrl} alt={article.title} />
                </div>
              )}

              {/* Article Content */}
              <div className="article-content">
                <h1 className="article-title">{article.title}</h1>

                {/* ✅ See More / See Less */}
                <p className="article-body">
                  {showFullContent
                    ? article.content
                    : `${article.content.slice(0, 250)}...`}
                </p>
                {article.content.length > 250 && (
                  <button
                    className="see-more-btn"
                    onClick={() => setShowFullContent(!showFullContent)}
                  >
                    {showFullContent ? "See Less" : "See More"}
                  </button>
                )}

                {/* Meta Info */}
                <div className="article-meta">
                  <span className="author">{article.author?.name}</span>
                  <span className="date">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </span>
                  <span className="reading-time">
                    {article.readingTime || "40 min read"}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            !loading && <p className="not-found">Article not found</p>
          )}
        </>
      )}
    </main>
  );
};
