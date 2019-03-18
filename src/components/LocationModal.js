import React, { useState } from 'react'
import AlgoliaPlaces from 'algolia-places-react'
import styled from 'styled-components'
import { useSpring, useTransition, animated, config } from 'react-spring'

export default ({ setLocation, shown }) => {
  const headerProps = useSpring({
    opacity: 1,
    top: 0,
    transform: `scaleX(1)`,
    from: { opacity: 0, top: -50, transform: `scaleX(0)` },
    config: config.wobbly,
  })
  const modalBackground = useSpring({
    background: `linear-gradient(to top left, #2c5364, #203a43, #0f2027)`,
    from: {
      background: `linear-gradient(to top left, #517e91, #6e9fb5, #4b6e7a)`,
    },
    config: config.slow,
  })
  const angoliaAnimate = useSpring({
    position: `relative`,
    transform: `scale(1)`,
    opacity: 1,
    top: 0,
    from: { transform: `scale(0.5)`, top: 15, opacity: 0 },
    config: config.slow,
  })

  const transitions = useTransition(shown, null, {
    from: { opacity: 1 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.slow,
  })
  return transitions.map(
    ({ item, key, props }) =>
      item && (
        <animated.div style={props} key={key}>
          <Modal style={modalBackground}>
            <Header style={headerProps}>
              <animated.h1>where you at? </animated.h1>
              <animated.h2>location was unavailable from browser</animated.h2>
            </Header>
            <animated.div style={angoliaAnimate}>
              <StyledAngoliaBox
                placeholder={`Please enter location`}
                options={{
                  appId: process.env.REACT_APP_ANGOLIA_APP_ID,
                  apiKey: process.env.REACT_APP_ANGOLIO_API_KEY,
                }}
                onChange={({
                  query,
                  rawAnswer,
                  suggestion: {
                    latlng: { lat, lng },
                  },
                  suggestionIndex,
                }) =>
                  setLocation({
                    latitude: lat,
                    longitude: lng,
                    available: true,
                  })
                }
              />
            </animated.div>
          </Modal>
        </animated.div>
      )
  )
}

const Header = styled(animated.div)`
  position: relative;
  color: rgba(255, 255, 255, 0.9);
  margin: 10vmin auto;
  & h1 {
    font-size: 4em;
    font-weight: 100;
    @media screen and (orientation: portrait) {
      margin-top: 10vh;
    }
  }
  & h2 {
    font-weight: 150;
    opacity: 0.5;
    font-size: 1.4em;
    margin: 1em 0;
  }
  @media screen and (orientation: portrait) {
    & h1 {
      font-size: 3em;
    }
    & h2 {
      opacity: 0.5;
      font-size: 1em;
      margin: 0.5em 0;
    }
  }
`

const Modal = styled(animated.div)`
  backface-visibility: hidden;
  z-index: 100;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  background: #0f2027;
  background: -webkit-linear-gradient(
    to top left,
    #2c5364,
    #203a43,
    #0f2027
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to top left, #2c5364, #203a43, #0f2027);

  color: #203a43;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
`

const StyledAngoliaBox = styled(AlgoliaPlaces)`
  position: relative;
  opacity: 0.9;
  color: #203a43;
  width: 75vw;
  margin-bottom: auto;
  @media screen and (orientation: portrait) {
    width: 90vw;
  }
`
