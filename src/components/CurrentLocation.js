import React, { useState } from 'react'

export default ({ latitude, longitude }) => {
  const [currentLocation, setCurrentLocation] = useState()
  const setDestructuredLocation = ({
    country,
    city,
    postcode,
    county,
    administrative,
  }) => setCurrentLocation({ city: city[0], postcode: postcode[0], county: county[0], administrative: administrative[0], country })
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
      .then(({ hits }) => setDestructuredLocation(hits[0]))
  }
  return currentLocation ? (
    <div>Current Location: {JSON.stringify(currentLocation)}</div>
  ) : (
    <div>Current Location Loading</div>
  )
}
