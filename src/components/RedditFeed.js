import React, { useState } from 'react'
import styled from 'styled-components'
export default function RedditFeed() {
  const [feed, setFeed] = useState([])
  const fetchData = async (query = `javascript`) => {
    const response = await fetch(`https://www.reddit.com/r/${query}/.json`)
    const json = await response.json()
    const data = await json.data
    setFeed(data.children.slice(0, 10))
  }
  if (!feed.length) {
    fetchData()
  }
  const [currentSub, setCurrentSub] = useState(`r/javascript`)

  const fetchAutoComplete = async query => {
    const response = await fetch(
      `https://www.reddit.com/api/subreddit_autocomplete_v2.json?query=${query}&include_over_18=false&include_categories=false&include_profiles=false&limit=10`
    )
    const json = await response.json()
    const data = await json.data.children.map(({ data }) => data)
    return data
  }
  const [suggestions, setSuggestions] = useState([])
  const [subredditAutocompleteQuery, setSubredditAutocompleteQuery] = useState(
    ``
  )
  const updateAutoComplete = async ({ target: { value } }) => {
    setSubredditAutocompleteQuery(value)
    if (subredditAutocompleteQuery.length > 0) {
      const suggestions = await fetchAutoComplete(value)
      console.log(suggestions)

      const returnedSuggestions = suggestions
        .filter(({ subreddit_type }) => subreddit_type !== `private`)
        .map(({ display_name }) => display_name)
      setSuggestions(returnedSuggestions)
    } else {
      setSuggestions([])
    }
  }

  const [toggle, setToggle] = useState(false)
  return (
    <Postwrap>
      <Options>
        <OptionSelector>
          <SearchBox
            toggle={!toggle}
            placeholder={!toggle ? currentSub : `Select subreddit:`}
            onChange={updateAutoComplete}
            onFocus={() => setToggle(state => !state)}
            onBlur={() =>
              setTimeout(() => {
                setSubredditAutocompleteQuery(``)
                setToggle(state => !state)
              }, 100)
            }
            value={subredditAutocompleteQuery}
            resultsShown={
              suggestions.length !== 0 && subredditAutocompleteQuery
            }
          />
          {!toggle ? <CloseIcon>X</CloseIcon> : ``}
          {suggestions.length !== 0 && subredditAutocompleteQuery ? (
            <SuggestionDropdown>
              {suggestions.map(suggestion => (
                <li
                  onClick={() => {
                    fetchData(suggestion)
                    setSuggestions([])
                    setSubredditAutocompleteQuery(``)
                    setCurrentSub(`r/${suggestion}`)
                    //setToggle(state => !state)
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </SuggestionDropdown>
          ) : (
            ``
          )}
        </OptionSelector>
      </Options>
      <PostList>
        <Spacer position={`left`} />
        {feed.map(PostTile)}
        <Spacer position={`right`} />
      </PostList>
    </Postwrap>
  )
}

const CloseIcon = styled.button`
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  color: var(--branc-color);
  background: transparent;
  border: none;
`
const CurrentSub = ({ sub, close }) => {
  return (
    <CurrentSubBox onClick={close}>
      {sub}
      <CloseSub>X</CloseSub>
    </CurrentSubBox>
  )
}

const CurrentSubBox = styled.div`
  cursor: pointer;
  box-shadow: 0 0 35px rgba(50, 50, 50, 0.4), 0 0 10px rgba(20, 20, 20, 0.4);
  background: var(--main-dark);
  color: var(--brand-color);
  padding: 0.25vmax;
  border-radius: 5px;
  font-size: 1em;
`
const CloseSub = styled.button`
  padding: 0.25vmax 0.25vmax 0.25vmax 2vmax;
  background: none;
  color: var(--brand-color);
  border: none;
  cursor: pointer;
`

const Options = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 20%;
`
const Spacer = ({ position }) => (
  <PostCard position={position}>
    <Post position={position} />
  </PostCard>
)
const SuggestionDropdown = styled.ul`
  border-radius: 0 0 5px 5px;
  padding: 0.5vmax 0.25vmax;
  z-index: 10;
  background: linear-gradient(to bottom right, var(--main-dark), black);
  color: var(--brand-color);
  width: 100%;
  position: absolute;
  & li {
    cursor: pointer;
    &:hover {
      background: #aaa;
    }
  }
`

const SearchBox = styled.input`
  cursor: ${({ toggle }) => (toggle === true ? `pointer` : `auto`)};
  z-index: 150;
  border-radius: ${({ resultsShown }) =>
    resultsShown ? `5px 5px 0 0` : `5px`};
  box-shadow: 0 0 35px rgba(50, 50, 50, 0.4), 0 0 10px rgba(20, 20, 20, 0.4);
  background: var(--main-dark);
  color: var(--accent-light);
  padding: 0.25vmax;
  border: none;
  font-size: 1em;

  &::placeholder {
    color: var(--brand-color);
    font-size: 1em;
  }

  &:focus {
    outline: none;
    border: none;
    box-shadow: 0 0 35px rgba(var(--rgb-brand-color), 0.4),
      0 0 10px rgba(var(--rgb-brand-color), 0.4);
  }
`

const OptionSelector = styled.div`
  position: relative;
`
const Postwrap = styled.div`
  grid-column: span 4;
  grid-row: span 2;
  display: flex;
  flex-direction: column;
`
const PostList = styled.ul`
  height: 80%;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  -webkit-scroll-snap-type: x mandatory;
  -webkit-scroll-snap-points-x: repeat(100%);
  -webkit-scroll-snap-destination: 50% 50%;
  scroll-snap-type: x mandatory;
  scroll-snap-points-x: repeat(100%);
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
`

const PostTile = ({
  data: { author, id, score, selftext, subreddit, title, url },
}) => (
  <PostCard key={id}>
    <Post>
      <div>r/{subreddit}</div>
      <h5>{title}</h5>
      <div>{author}</div>
      <div>
        {score === 0 ? '' : score > 0 ? '+' : '-'}
        {score}
      </div>
      {/* <div>{selftext}</div> */}
      <a href={url} target='__newtab'>
        Read
      </a>
    </Post>
  </PostCard>
)

const PostCard = styled.li`
  -webkit-scroll-snap-coordinate: 50% 50%;
  scroll-snap-align: center;
  display: inline-block;
  vertical-align: top;
  padding: ${({ position }) =>
    position === `left`
      ? `0 0.5vmax 0 0`
      : position === `right`
      ? `0 0 0 0.5vmax`
      : `0 0.5vmax`};
  width: ${({ position }) => (position ? `10%` : `80%`)};
  height: 100%;
`

const Post = styled.div`
   padding: 10px 20px;
   height: 100%;
    position: relative;
    overflow-wrap: break-word;
    overflow: hidden;
    box-shadow: 0 0 35px rgba(50, 50, 50, 0.4), 0 0 10px rgba(20, 20, 20, 0.4);
    border-radius: ${({ position }) =>
      position === `left`
        ? `0 5px 5px 0`
        : position === `right`
        ? `5px 0 0 5px`
        : `5px`};
    background-color: rgba(var(--rgb-main-light), 0.85);
    margin: 0 0 1vw 0;
    color: var(--main-dark);
    & h5 {
      font-size: 19px;
      margin-bottom: 10px;
      width: 100%;
      overflow-wrap: break-word;
      word-wrap:break-word;
      white-space:normal;
    }

    & a, a:visited {
      color: var(--brand-color);
    }
  }

`
