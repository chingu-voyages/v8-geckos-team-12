import React, { useState } from 'react'
import styled from 'styled-components'

export default ({ latitude, longitude, setUnsplashQuery }) => {
  const [currentLocation, setCurrentLocation] = useState()
  const setDestructuredLocation = ({
    country,
    city,
    postcode,
    county,
    administrative,
  }) => {
    setCurrentLocation({
      city: city[0],
      postcode: postcode[0],
      county: county[0],
      administrative: administrative[0],
      country,
    })
    setUnsplashQuery(administrative[0])
  }
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
    <CurrentLocationWrapper>
      <LocationIcon>
        <img
          src={require('../images/location-arrow-solid.svg')}
          alt='Location Icon'
        />
      </LocationIcon>
      <LocationText>
        <CityWrapper>
          {currentLocation.city}
          <span>,</span>
        </CityWrapper>
        <StateWrapper>{currentLocation.administrative}</StateWrapper>
      </LocationText>
    </CurrentLocationWrapper>
  ) : (
    <CurrentLocationLoading>Current Location Loading</CurrentLocationLoading>
  )
}

const CurrentLocationWrapper = styled.div`
  display: flex;
  color: rgba(255, 255, 255, 0.5);

  @media screen and (max-width: 420px) {
    justify-content: center;
  }
`

const LocationText = styled.div`
  text-align: right;

  @media screen and (max-width: 420px) {
    text-align: center;
  }
`

const LocationIcon = styled.div`
  width: 32px;
  margin-right: 8px;

  @media screen and (max-width: 420px) {
    width: 16px;
  }
`

const CityWrapper = styled.span`
  // Add span styles if necessary
  display: block;
  @media screen and (max-width: 420px) {
    display: inline-block;
  }
`
const StateWrapper = styled.span`
  // Add span styles if necessary
  display: block;
  @media screen and (max-width: 420px) {
    display: inline-block;
  }
`

const CurrentLocationLoading = styled.div`
  //add styles here for current location loading placeholder
`
