import React from 'react'
import AlgoliaPlaces from 'algolia-places-react'
import styled from 'styled-components'
import moduleName from 'react-spring'
export default ({ setLocation }) => {
  return (
    <Modal>
      <Header>
        <h1>where you at?</h1>
        <h2>location was unavailable from browser</h2>
      </Header>
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
        }) => setLocation({ latitude: lat, longitude: lng, available: true })}
      />
    </Modal>
  )
}

const Header = styled.div`
  position: relative;
  color: rgba(255, 255, 255, 0.9);
  margin: 10vmin auto;
  & h1 {
    font-size: 4em;
    @media screen and (orientation: portrait) {
      margin-top: 10vh;
    }
  }
  & h2 {
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

const Modal = styled.div`
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
  opacity: 0.9;
  color: #203a43;
  width: 75vw;
  margin-bottom: auto;
  @media screen and (orientation: portrait) {
    width: 90vw;
  }
`
