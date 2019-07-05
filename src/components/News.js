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
        country: 'us',
        pageSize: 10,
        page: 1,
      })
      .then(response => {
        setArticles(response.articles)
      })
      .catch(err => console.log(err))
  }

  return (
    <ArticleWrapper>
      <h2>News Feed</h2>
      {articles ? (
        <ul>
          {articles.length > 0 ? (
            articles.map((article, i) => {
              return article.title ? (
                <Article key={`article-${i}`}>
                  <a href={article.url} target={`__newtab${i}`}>
                    <h5>{article.title}</h5>
                    {article.author ? (
                      <ArticleText misc>By {article.author}</ArticleText>
                    ) : null}
                    <ArticleText desc>
                      {article.content
                        ? article.content.split('[')[0]
                        : article.description
                        ? article.description
                        : 'No description available.'}
                    </ArticleText>
                    <div>
                      <ArticleText misc>{article.source.name}</ArticleText>
                      <ArticleText misc>
                        {new Date(article.publishedAt)
                          .toString()
                          .split(' ')
                          .splice(0, 4)
                          .join(' ')}
                      </ArticleText>
                    </div>
                  </a>
                </Article>
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
  overflow-y: scroll;
  height: 100%;
  color: var(--main-dark);

  & ul {
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
    color: white;
    margin-bottom: 7px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }
`

const Article = styled.li`
  background-color: rgba(var(--rgb-main-light), 0.85);
  line-height: 130%;
  transition: 0.1s;

  & a {
    color: var(--main-dark);
    :visited {
      color: var(--main-dark);
    }
    & h5 {
      font-size: 20px;
      margin-bottom: 10px;
    }

    & a {
      color: #dd443c;
    }
  }

  & li:hover {
    transform: translateY(-10px);
  }
  :hover {
    transform: translateY(-6px);
    cursor: pointer;
  }
`

const ArticleText = styled.p`
  ${props => (props.misc ? 'font-style: italic' : null)};
  ${props => (props.desc ? 'margin: 7px 0' : null)};
  ${props => (props.misc ? 'color: var(--accent-dark)' : null)}
`
const Error = styled.li`
  background-color: rgba(var(--rgb-accent-dark), 0.87);
  color: var(--main-light);
  max-height: 40px;
  text-align: center;
  width: 90%;
`
