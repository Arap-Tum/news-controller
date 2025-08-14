import React from 'react'
import {Link} from 'react-router-dom'

export const ListOfNews = ({ articles }) => {
  return (
    <div><h1>My Articles</h1>
      {articles.length === 0 ? (
        <p>No articles found</p>
      ) : (
        <div>
          <p>Total Articles: {articles.length}</p>
          <ul>
          {articles.map(article => (
            <li key={article.id}>
              <Link to={`/article/${article.id}`}>{article.title}</Link>
            </li>
          ))}
        </ul>
        </div>
      )}
    </div>
  )
}
