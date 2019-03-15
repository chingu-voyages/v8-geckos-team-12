import React from 'react'
import { geolocated } from 'react-geolocated'

const App = ({
  coords,
  isGeolocationAvailable, // boolean flag indicating that the browser supports the Geolocation API
  isGeolocationEnabled, // boolean flag indicating that the user has allowed the use of the Geolocation API
  positionError, // object with the error returned from the Geolocation API call
}) => {
  try {
    var {
      latitude,
      longitude,
      altitude,
      accuracy,
      altitudeAccuracy,
      heading,
      speed,
    } = coords
  } catch (err) {}
  return !isGeolocationAvailable ? (
    <div>Your browser does not support Geolocation</div>
  ) : !isGeolocationEnabled ? (
    <div>Geolocation is not enabled</div>
  ) : coords ? (
    <ul>
      <li>Latitude: {latitude}</li>
      <li>Longitude: {longitude}</li>
      <li>Accuracy: {accuracy}</li>
      <li>Altitude: {altitude}</li>
      <li>Altitude Accuracy: {altitudeAccuracy}</li>
      <li>Heading: {heading}</li>
      <li>Speed: {speed}</li>
    </ul>
  ) : (
    <div>Getting the location data&hellip; </div>
  )
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(App)
