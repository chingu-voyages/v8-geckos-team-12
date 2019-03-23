import React, { useState } from 'react'
import styled from 'styled-components'

export default ({ latitude, longitude }) => {
  const [forecast, setForecast] = useState()
  const setDestructuredForecast = ({
    weather,
    main,
    visibility,
    wind,
    clouds,
    sys,
  }) => setForecast({ weather, main, visibility, wind, clouds, sys })
  if (!forecast) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${
        process.env.REACT_APP_OWM_API_KEY
      }`
    )
      .then(response => response.json())
      .then(result => setDestructuredForecast(result))
  }
  return forecast ? (
    <ForecastWrapper>
      {console.log(forecast)}

      <h2>Current Weather: {forecast.main.temp} Deg Fahrenheit</h2>
    </ForecastWrapper>
  ) : (
    <ForecastLoadingWrapper>Forecast Loading</ForecastLoadingWrapper>
  )
}

const ForecastWrapper = styled.div`
  //add styles here for current location info
  grid-column: span 4;
  grid-row: span 2;
  background: white;
`

const ForecastLoadingWrapper = styled.div`
  //add styles here for current location loading placeholder
  background: white;
  grid-column: span 4;
  grid-row: span 2;
`
