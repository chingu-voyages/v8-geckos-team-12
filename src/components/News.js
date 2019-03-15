import React, { useState } from 'react'
import NewsAPI from 'newsapi'
const newsapi = new NewsAPI(process.env.REACT_APP_NEWS_API_KEY)
export default ({ query }) => {
  const [articles, setArticles] = useState()
  newsapi.v2
    .topHeadlines({
      q: query,
      language: 'en',
    })
    .then(response => {
      setArticles(response.articles)
    })
  return articles ? (
    <div>
      Articles:{' '}
      <ul>
        {articles.map(article => (
          <li>{JSON.stringify(article)}</li>
        ))}
      </ul>
    </div>
  ) : (
    'Articles Loading'
  )
}
