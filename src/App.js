import React, { useState } from 'react'
import { geolocated } from 'react-geolocated'
import LocationModal from './components/LocationModal.js'
import Weather from './components/Weather'
import CurrentLocation from './components/CurrentLocation'
import Unsplash from './components/Unsplash.js'
import News from './components/News'
import LoadingAnimation from './components/LoadingAnimation'
import styled from 'styled-components'

const App = ({
  coords,
  isGeolocationAvailable, // boolean flag indicating that the browser supports the Geolocation API
  isGeolocationEnabled, // boolean flag indicating that the user has allowed the use of the Geolocation API
  positionError, // object with the error returned from the Geolocation API call
}) => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    available: !isGeolocationAvailable || !isGeolocationEnabled,
  })
  const [unsplashQuery, setUnsplashQuery] = useState(null)
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

  return (
    <>
      <LocationModal
        setLocation={setLocation}
        shown={
          !location.available &&
          (!isGeolocationAvailable || !isGeolocationEnabled)
        }
      />

      {location.available || coords || location.latitude ? (
        <>
          <Unsplash query={unsplashQuery} />
          <AppWrapper>
            <CurrentLocation
              latitude={location.latitude}
              longitude={location.longitude}
              setUnsplashQuery={setUnsplashQuery}
            />
            <Weather
              latitude={location.latitude}
              longitude={location.longitude}
            />
            <News query={unsplashQuery} />
          </AppWrapper>
        </>
      ) : (
        <LoadingAnimation />
      )}
    </>
  )
}

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(App)
