import React from 'react'

import { useParams, Link } from 'react-router-dom';
import { Loading } from '../component/Loading';

export const Article = ({ articles, loading }) => {
  const { id } = useParams();


  const article = articles.find((art) => art.id === id);

  return (
    <main className="article-page">
      {loading && <Loading />}
      <div className='article'>
        <img src={article.imageUrl} alt={article.title} />
        <h1>{article.title}</h1>      
        <p>{article.content}</p>
        <p>{article.author.name}</p>

        <p>{new Date(article.publishedAt).toLocaleDateString()}</p>
        <p>{article.readingTime}||| 40 min read</p>

        <Link to={`/edit-article/${article.id}`}>
          <button>Edit Article</button>
        </Link>
        <button>Delete Article</button>

      </div>
    </main>
  )
}
