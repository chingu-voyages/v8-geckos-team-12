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
      <ul>
        {articles.map((article, index) => (
          <li key={`article-${index}`}>
            <h5>{article.title}</h5>
            {article.author ? (
              <ArticleText auth>By {article.author}</ArticleText>
            ) : null}
            <ArticleText desc>
              {article.content
                ? article.content.split('[')[0]
                : article.description}
              <a href={article.url} target='__newtab'>
                Read more
              </a>
            </ArticleText>

            <ArticleText auth>{article.source.name}</ArticleText>
          </li>
        ))}
      </ul>
    </ArticleWrapper>
  ) : (
    <ArticleWrapper>'Articles Loading'</ArticleWrapper>
  )
}

const ArticleWrapper = styled.div`
  grid-column: span 4;
  grid-row: span 4;
  overflow-y: scroll;
  height: 100%;

  color: var(--main-dark);

  & ul {
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    overflow-y: scroll;
  }

  & li {
    padding: 10px 20px;
    position: relative;
    overflow-wrap: break-word;
    box-shadow: 0 0 35px rgba(50, 50, 50, 0.4), 0 0 10px rgba(20, 20, 20, 0.4);
    border-radius: 5px;
    background-color: rgba(var(--rgb-main-light), 0.5);
    margin: 0 0 1vw 0;
    line-height: 130%;

    & h5 {
      font-size: 19px;
      margin-bottom: 10px;
    }

    & a {
      color: var(--brand-color);
    }
  }

  & li:hover {
    transform: translateY(-10px);
  }
`

const ArticleText = styled.p`
  ${props => (props.auth ? 'font-style: italic' : '')};
  ${props => (props.desc ? 'margin: 15px 0' : '')};
`
