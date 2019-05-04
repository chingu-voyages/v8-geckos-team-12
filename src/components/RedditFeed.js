import React, { useState, useRef } from 'react'
import styled, { withTheme } from 'styled-components'
import AutosizeInput from 'react-input-autosize'
import colors from '../theme/colors'

const darken = color =>
  color
    .split(',')
    .map(num => Number(num / 2).toFixed(0))
    .join(',')

const RedditFeed = ({
  theme: {
    name,
    darkMode,
    colors: {
      RGBAccentDark,
      RGBAccentLight,
      RGBBrandColor,
      RGBMainDark,
      RGBMainLight,
    },
  },
}) => {
  const accentDark = `rgb(${darkMode ? darken(RGBAccentLight) : RGBAccentDark})`
  const accentLight = ` rgb(${darkMode ? RGBAccentDark : RGBAccentLight})`
  const brandColor = `rgb(${darkMode ? darken(RGBBrandColor) : RGBBrandColor})`
  const mainDark = `rgb(${darkMode ? darken(RGBMainLight) : RGBMainDark})`
  const mainLight = `rgb(${darkMode ? RGBMainDark : RGBMainLight})`

  const subreddit = localStorage.getItem(`subreddit`) || `javascript`
  const [currentSub, setCurrentSub] = useState(subreddit)

  const [feed, setFeed] = useState([])
  const fetchData = async query => {
    const { data } = await fetch(
      `.netlify/functions/redditFetchFeed?query=${query}`
    ).then(response => response.json())
    setFeed(data)
  }

  if (!feed.length) {
    fetchData(currentSub)
  }

  const fetchAutoComplete = async query => {
    const { data } = await fetch(
      `.netlify/functions/redditAutocomplete?query=${query}`
    ).then(response => response.json())
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

      const returnedSuggestions = suggestions
        .filter(({ subreddit_type }) => subreddit_type !== `private`)
        .map(({ display_name }) => display_name)
      setSuggestions(returnedSuggestions)
    } else {
      setSuggestions([])
    }
  }

  const [toggle, setToggle] = useState(false)

  const postScroll = useRef()
  return (
    <Postwrap>
      <Header>Reddit Feed</Header>
      <Options>
        <OptionSelector>
          <InputWrap>
            <AutosizeInput
              style={{
                border: 'none',
                zIndex: 2000,
                boxShadow: `0 0 35px rgba(${
                  darkMode ? darken(RGBAccentLight) : RGBAccentDark
                }, 0.4), 0 0 10px rgba(${
                  darkMode ? darken(RGBMainLight) : RGBMainDark
                }, 0.4)`,
                color: brandColor,
              }}
              inputStyle={{
                border: 'none',
                borderRadius: 5,
                zIndex: 2000,
                padding: `.25vw ${!toggle ? `4vw` : `0.25vw`} 0.25vw 0.25vw`,
                fontSize: `1em`,
                background: mainDark,
                color: brandColor,
                boxShadow: `0 0 35px rgba(${
                  darkMode ? darken(RGBAccentLight) : RGBAccentDark
                }, 0.4), 0 0 10px rgba(${
                  darkMode ? darken(RGBMainLight) : RGBMainDark
                }, 0.4)`,
                color: brandColor,
              }}
              toggle={!toggle}
              placeholder={!toggle ? `r/${currentSub}` : `Select subreddit:`}
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
          </InputWrap>
          {suggestions.length !== 0 && subredditAutocompleteQuery ? (
            <SuggestionDropdown>
              {suggestions.map(suggestion => (
                <li
                  onClick={() => {
                    fetchData(suggestion)
                    setSuggestions([])
                    setSubredditAutocompleteQuery(``)
                    setCurrentSub(suggestion)
                    localStorage.setItem(`subreddit`, suggestion)
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
          {/* <div>Another Option</div> */}
        </OptionSelector>
      </Options>
      <WrapDiv>
        <PrevButton
          passedRef={postScroll}
          onClick={() =>
            (postScroll.current.scrollLeft -= postScroll.current.getBoundingClientRect().width)
          }
        >
          {'<'}
        </PrevButton>
        <PostList ref={postScroll}>
          <Spacer position={`left`} />
          {feed.map(PostTile)}
          <Spacer position={`right`} />
        </PostList>
        <NextButton
          passedRef={postScroll}
          onClick={() =>
            (postScroll.current.scrollLeft += postScroll.current.getBoundingClientRect().width)
          }
        >
          {'>'}
        </NextButton>
      </WrapDiv>
    </Postwrap>
  )
}

const WrapDiv = styled.div`
  position: relative;
  height: 90%;
  @media screen and (orientation: portrait) {
    height: 95%;
  }
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-y: hidden;
  -webkit-overflow-scrolling: touch;
  -webkit-scroll-snap-type: x mandatory;
  -webkit-scroll-snap-points-x: repeat(100%);
  -webkit-scroll-snap-destination: 50% 50%;
  scroll-snap-type: x mandatory;
  scroll-snap-points-x: repeat(100%);
  white-space: nowrap;
  overflow-y: hidden;

  &::-webkit-scrollbar {
    display: none;
  }
`

const PrevButton = styled.button`
  cursor: pointer;
  font-size: 3em;
  border: none;
  color: var(--main-dark);
  background: transparent;
  z-index: 1000;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;

  &:focus {
    outline: none;
  }
`

const NextButton = styled.button`
  cursor: pointer;
  font-size: 3em;
  border: none;
  color: var(--main-dark);
  background: transparent;
  z-index: 1000;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;

  &:focus {
    outline: none;
  }
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

const InputWrap = styled.div`
  position: relative;
`

const CloseIcon = styled.button`
  pointer-events: none;
  cursor: pointer;
  position: absolute;
  right: 0;
  height: 100%;
  top: 50%;
  transform: translateY(-50%);
  color: var(--brand-color);
  background: transparent;
  border: none;
`

const Options = styled.div`
  background-color: rgba(var(--rgb-main-light), 0.85);
  margin-bottom: 1vw;
  border-radius: 0 0 5px 5px;
  padding: 1vw 1vw;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`
const Spacer = ({ position }) => (
  <PostCard position={position}>
    <Post position={position} />
  </PostCard>
)
const SuggestionDropdown = styled.ul`
  z-index: 200;
  border-radius: 5px;
  padding: 0.25vmax;
  z-index: 0;
  bottom: 0;
  transform: translateY(calc(100% + 0.25vmax));
  background: linear-gradient(to bottom right, var(--main-dark), black);
  color: var(--brand-color);
  width: 24vw;

  @media screen and (orientation: portrait) {
    width: 49.25vw;
  }

  position: absolute;
  & li {
    cursor: pointer;
    padding: 5px;
    transition: all 0.2s ease;
    &:hover {
      background: var(--brand-color);
      color: var(--main-dark);
    }
  }
`

const OptionSelector = styled.div`
  display: flex;
  z-index: 200;
  position: relative;
`
const Postwrap = styled.div`
  position: relative;
  grid-column: span 4;
  grid-row: span 2;

  display: flex;
  flex-direction: column;
`
const PostList = styled.ul`
  position: relative;
  height: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-y: hidden;
  -webkit-overflow-scrolling: touch;
  -webkit-scroll-snap-type: x mandatory;
  -webkit-scroll-snap-points-x: repeat(100%);
  -webkit-scroll-snap-destination: 50% 50%;
  scroll-snap-type: x mandatory;
  scroll-snap-points-x: repeat(100%);
  white-space: nowrap;
  overflow-y: hidden;

  &::-webkit-scrollbar {
    display: none;
  }
`

const PostTile = ({
  data: { author, id, score, selftext, title, permalink, url },
}) => (
  <PostCard key={id}>
    <Post>
      <Author>Posted by u/{author}</Author>
      <Title>
        {title}
        <Score>
          {score === 0 ? '  ' : score > 0 ? ' ▲ ' : ' ▼ '}
          {score}
        </Score>
      </Title>
      <BodyText>
        {selftext.length === 0 ? (
          <a href={url}>{url}</a>
        ) : selftext.length > 250 ? (
          `${selftext.slice(0, 250)}...`
        ) : (
          selftext
        )}
      </BodyText>
      <ReadLink href={`https://www.reddit.com${permalink}`} target='__newtab'>
        Read
      </ReadLink>
    </Post>
  </PostCard>
)

const ReadLink = styled.a`
  align-self: center;
  box-shadow: 0 0 35px rgba(50, 50, 50, 0.4), 0 0 10px rgba(20, 20, 20, 0.4);
  border-radius: 5px;
  padding: 0.5vmax 8vmax;
  background: rgba(var(--rgb-main-dark), 0.5);
  color: var(--main-light) !important;
`
const BodyText = styled.div`
  overflow-wrap: break-word;
  white-space: normal;
  font-size: 1em;
  margin: 1vmax 0;
`

const Title = styled.div`
  overflow-wrap: break-word;
  white-space: normal;
  font-size: 1.25em;
  margin: 0.5vmax 0;
`
const Score = styled.div`
  display: inline-block;
  color: var(--brand-color);
`

const Author = styled.div`
  color: var(--accent-dark);
  font-size: 0.75em;
  margin-bottom: 0.25vmax;
`

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
      : `0 0.5vmax 0 0`};
  width: ${({ position }) => (position ? `10%` : `80%`)};
  height: 100%;
`

const Post = styled.div`
  padding: 10px 20px;
  height: 100%;
  max-height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-wrap: break-word;
  overflow: hidden;
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
    word-wrap: break-word;
    white-space: normal;
  }

  & a,
  a:visited {
    color: var(--brand-color);
  }
`

export default withTheme(RedditFeed)
