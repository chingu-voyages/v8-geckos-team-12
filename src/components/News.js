import React, { useState } from 'react'
import NewsAPI from 'newsapi'
import styled from 'styled-components'

const newsapi = new NewsAPI(process.env.REACT_APP_NEWS_API_KEY)
export default ({ query }) => {
  const [articles, setArticles] = useState(null)
  if (!articles) {
    newsapi.v2
      .topHeadlines({
        q: query,
        language: 'en',
      })
      .then(response => {
        setArticles(response.articles)
      })
  }
  return articles ? (
    <ArticleWrapper>
      Articles:{' '}
      <ul>
        {articles.map(article => (
          <li>{JSON.stringify(article)}</li>
        ))}
      </ul>
    </ArticleWrapper>
  ) : (
    'Articles Loading'
  )
}

const ArticleWrapper = styled.div`
  // add styling for div here
  & ul {
    //add styling for child ul here
    & li {
      //add stying for child li here
    }
  }
`
