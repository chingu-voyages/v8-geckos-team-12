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

  return articles ? (
    <ArticleWrapper>
      <ul>
        {articles.length > 0 ? (
          articles.map((article, i) => {
            return article.title ? (
              <Article key={`article-${i}`}>
                <a href={article.url} target={`__newtab${i}`}>
                  <h5>{article.title}</h5>
                  {article.author ? (
                    <ArticleText auth>By {article.author}</ArticleText>
                  ) : null}
                  <ArticleText desc>
                    {article.content
                      ? article.content.split('[')[0]
                      : article.description
                      ? article.description
                      : 'No description available.'}
                  </ArticleText>
                  <ArticleText auth>{article.source.name}</ArticleText>
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
    </ArticleWrapper>
  ) : (
    'Articles Loading'
  )
}

const ArticleWrapper = styled.div`
  color: var(--main-dark);

  & ul {
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    height: 50vh;
    overflow-y: scroll;
    font-size: 17px;
  }

  & li {
    padding: 10px 20px;
    position: relative;
    width: 90%;
    overflow-wrap: break-word;
    border-radius: 15px;
    margin: 10px 5px;
  }
`

const Article = styled.li`
  box-shadow: 0 0 35px rgba(50, 50, 50, 0.4), 0 0 10px rgba(20, 20, 20, 0.4);
  background-color: rgba(var(--rgb-main-light), 0.7);
  line-height: 130%;
  transition: 0.1s;

  & a {
    color: var(--main-dark);

    & h5 {
      font-size: 20px;
      margin-bottom: 10px;
    }
  }
  :hover {
    transform: translateY(-7px);
    cursor: pointer;
  }
`

const ArticleText = styled.p`
  ${props => (props.auth ? 'font-style: italic' : null)};
  ${props => (props.desc ? 'margin: 15px 0' : null)};
  ${props => (props.auth ? 'color: var(--accent-dark)' : null)}
`
const Error = styled.li`
  background-color: rgba(var(--rgb-accent-dark), 0.7);
  color: var(--main-light);
  max-height: 40px;
  text-align: center;
`
