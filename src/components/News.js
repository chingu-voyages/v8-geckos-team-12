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
    'Articles Loading'
  )
}

const ArticleWrapper = styled.div`
  color: black;

  & ul {
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    height: 65vh;
    overflow-y: scroll;
  }

  & li {
    padding: 10px 20px;
    position: relative;
    width: 70%;
    overflow-wrap: break-word;
    border: black solid 2px;
    border-radius: 5px;
    background-color: rgba(232, 234, 236, 0.8);
    margin: 10px 5px;
    line-height: 130%;

    & h5 {
      font-size: 19px;
      margin-bottom: 10px;
    }

    & a {
      color: #dd443c;
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
