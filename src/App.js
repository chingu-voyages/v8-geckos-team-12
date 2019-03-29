import React, { useState } from 'react'
import { geolocated } from 'react-geolocated'
import LocationModal from './components/LocationModal.js'
import Header from './components/Header'
import Weather from './components/Weather'
import Unsplash from './components/Unsplash.js'
import News from './components/News'
import LoadingAnimation from './components/LoadingAnimation'
import Footer from './components/Footer'
import styled from 'styled-components'
import RedditFeed from './components/RedditFeed'
import Settings from './components/Settings'

const App = ({
  coords,
  isGeolocationAvailable, // boolean flag indicating that the browser supports the Geolocation API
  isGeolocationEnabled, // boolean flag indicating that the user has allowed the use of the Geolocation API
  positionError, // object with the error returned from the Geolocation API call
}) => {
  const [showLoading, setLoading] = useState(true)
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    available: !isGeolocationAvailable || !isGeolocationEnabled,
  })
  const [unsplashQuery, setUnsplashQuery] = useState(null)
  const [unsplashData, setUnsplashData] = useState(null)
  try {
    const {
      latitude,
      longitude,
      // altitude,
      // accuracy,
      // altitudeAccuracy,
      // heading,
      // speed,
    } = coords
    setLocation({
      latitude,
      longitude,
      available: !isGeolocationAvailable || !isGeolocationEnabled,
    })
  } catch (err) {}
  setTimeout(() => setLoading(false), 2500)
  //Example netlify lambda call
  // fetch('/.netlify/functions/hello')
  //   .then(response => response.json())
  //   .then(console.log)

  /*
Disabled for now, issues with lambda function

  const [colorTheme, setColorTheme] = useState(null)

  const randomColor = () => {
    fetch('/.netlify/functions/randomColors')
      .then(response => response.json())
      .then(json => setColorTheme(json))
  }

  if (!colorTheme) {
    randomColor()
  }
  console.log(colorTheme)
  */

  const [showSettings, setShowSettings] = useState(false)
  const toggleShowSettings = () => setShowSettings(state => !state)
  return (
    <>
      {!showLoading && (
        <LocationModal
          setLocation={setLocation}
          shown={
            !location.available &&
            (!isGeolocationAvailable || !isGeolocationEnabled)
          }
        />
      )}

      {!showLoading && (location.available || coords || location.latitude) ? (
        <>
          <Unsplash setUnsplashData={setUnsplashData} />
          <Header
            latitude={location.latitude}
            longitude={location.longitude}
            setUnsplashQuery={setUnsplashQuery}
            toggleShowSettings={toggleShowSettings}
          />
          <AppWrapper>
            <Settings
              showSettings={showSettings}
              toggleShowSettings={toggleShowSettings}
              widgets={[
                {
                  component: (
                    <Weather
                      latitude={location.latitude}
                      longitude={location.longitude}
                    />
                  ),
                  name: `Weather`,
                },
                {
                  component: <News query={unsplashQuery} />,
                  name: `News Feed`,
                },
                { component: <RedditFeed />, name: `Reddit Feed` },
              ]}
            />
          </AppWrapper>
          <Footer {...unsplashData} />
        </>
      ) : (
        <LoadingAnimation />
      )}
    </>
  )
}

const AppWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: grid;
  grid-auto-flow: row dense;
  grid-gap: 1vw;
  margin: 1.5vw 1.5vw 4.5vmax 1.5vw;
  grid-template-columns: repeat(8, 11.25vw);
  grid-auto-rows: 11.25vw;
  @media screen and (orientation: portrait) {
    grid-template-columns: repeat(4, 23.5vw);
    grid-auto-rows: 25vw;
  }
`

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(App)
