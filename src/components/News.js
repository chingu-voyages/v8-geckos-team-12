import React, { useState } from 'react'
import NewsAPI from 'newsapi'
import styled from 'styled-components'
import Article from './Article'
const newsapi = new NewsAPI(process.env.REACT_APP_NEWS_API_KEY)

export default ({ query }) => {
  const [articles, setArticles] = useState(null)

  if (!articles) {
    newsapi.v2
      .topHeadlines({
        q: query,
        language: 'en',
        country: 'us',
        pageSize: 6,
        page: 1,
      })
      .then(response => {
        setArticles(response.articles)
        console.log(response)
      })
      .catch(err => console.log(err))
  }

  return (
    <ArticleWrapper>
      <Header>News Feed</Header>
      {articles ? (
        <ul>
          {articles.length > 0 ? (
            articles.map((article, i) => {
              return article.title ? (
                <Article article={article} articleKey={i} />
              ) : null
            })
          ) : (
            <Error>
              <p>No news articles were found.</p>
            </Error>
          )}
        </ul>
      ) : (
        <Error>
          <p>Articles loading...</p>
        </Error>
      )}
    </ArticleWrapper>
  )
}

const ArticleWrapper = styled.div`
  grid-column: span 4;
  grid-row: span 4;
  height: 100%;
  color: var(--main-dark);

  & ul {
    overflow-y: scroll;
    height: 100%;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    font-size: 17px;
  }

  & li {
    padding: 10px 20px;
    overflow-wrap: break-word;
    border-radius: 5px;
    margin: 0 0 1vw 0;
    width: 100%;

    & div {
      display: flex;
      justify-content: space-between;
    }
  }

  & h2 {
    text-align: center;
    font-size: 1.25em;
    padding: 10px 0;
    background-color: var(--main-dark);
    color: var(--main-light);
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }
`

const Error = styled.li`
  background-color: rgba(var(--rgb-accent-dark), 0.87);
  color: var(--main-light);
  max-height: 40px;
  text-align: center;
  width: 90%;
`

const Header = styled.div`
  font-weight: 400;
  background: var(--main-dark);
  color: var(--main-light);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25em;
  padding: 10px;
  border-radius: 5px 5px 0 0;
`
