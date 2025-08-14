import React from 'react'

import { useParams, Link, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import { deleteArticle } from '../api/articles';
import { useAuth } from '../context/AuthContext';

import { Loading } from '../component/Loading';

export const Article = ({ articles, loading, setLoading }) => {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const article = articles.find((art) => art.id === id);

  const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this article?")) return;

     try{
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
  }

  return (
    <main className="article-page">
      {loading && <Loading />}
      
    {!loading && <>
     {article ? (
  <div className='article'>
    {article.imageUrl && (
      <img src={article.imageUrl} alt={article.title} />
    )}
    <h1>{article.title}</h1>      
    <p>{article.content}</p>
    <p>{article.author?.name}</p>
    <p>{new Date(article.publishedAt).toLocaleDateString()}</p>
    <p>{article.readingTime} | 40 min read</p>
    <Link to={`/edit-article/${article.id}`}>
      <button>Edit Article</button>
    </Link>
    <button onClick={handleDelete}>Delete Article</button>
  </div>
) : (
  !loading && <p>Article not found</p>
)}
      <Link to="/author/home">
        <button>Back to Articles</button>
      </Link>
    
    </>}

    </main>
  )
}
