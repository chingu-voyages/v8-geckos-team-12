import React, { useState } from 'react'

export default ({ latitude, longitude }) => {
  const [currentLocation, setCurrentLocation] = useState()
  if (!currentLocation) {
    fetch(
      `https://places-dsn.algolia.net/1/places/reverse?aroundLatLng=${latitude},${longitude}&hitsPerPage=1&language=en`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Algolia-Application-Id': process.env.REACT_APP_ANGOLIA_APP_ID,
          'X-Algolia-API-Key': process.env.REACT_APP_ANGOLIO_API_KEY,
        },
      }
    )
      .then(response => response.json())
      .then(result => setCurrentLocation(result))
  }
  return currentLocation ? (
    <div>Current Location: {JSON.stringify(currentLocation)}</div>
  ) : (
    <div>Current Location Loading</div>
  )
}
