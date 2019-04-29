import React from 'react'
import styled from 'styled-components'

export default ({ article, articleKey }) => {
  return (
    <Article key={`article-${articleKey}`}>
      <a href={article.url} target={`__newtab${articleKey}`}>
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
  )
}

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
