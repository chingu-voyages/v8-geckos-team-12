import React, { useState } from 'react'
import styled, { withTheme } from 'styled-components'

const CurrentLocation = ({
  latitude,
  longitude,
  setUnsplashQuery,
  theme: {
    darkMode,
    colors: { RGBMainDark, RGBMainLight },
  },
}) => {
  const [currentLocation, setCurrentLocation] = useState()

  const mainLight = `rgb(${darkMode ? RGBMainDark : RGBMainLight})`

  const setDestructuredLocation = ({
    locale_names,
    administrative,
    city: cityName,
  }) => {
    let city
    try {
      city = cityName[0]
    } catch (err) {
      city = locale_names[0]
    }
    setCurrentLocation({
      city,
      administrative: administrative[0],
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
        <Arrow
          aria-hidden='true'
          focusable='false'
          data-prefix='fas'
          data-icon='location-arrow'
          class='svg-inline--fa fa-location-arrow fa-w-16'
          role='img'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 512 512'
        >
          <path
            fill={mainLight}
            d='M444.52 3.52L28.74 195.42c-47.97 22.39-31.98 92.75 19.19 92.75h175.91v175.91c0 51.17 70.36 67.17 92.75 19.19l191.9-415.78c15.99-38.39-25.59-79.97-63.97-63.97z'
          />
        </Arrow>
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
const Arrow = styled.svg`
  height: 100%;
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
  color: var(--main-light);
  display: block;
  @media screen and (max-width: 420px) {
    display: inline-block;
  }
`
const StateWrapper = styled.span`
  // Add span styles if necessary
  color: var(--main-light);
  opacity: 0.5;
  display: block;
  @media screen and (max-width: 420px) {
    display: inline-block;
  }
`

const CurrentLocationLoading = styled.div`
  //add styles here for current location loading placeholder
`
export default withTheme(CurrentLocation)
