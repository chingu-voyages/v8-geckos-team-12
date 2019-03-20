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
      <div>
        <h2>Current Weather: {forecast.main.temp} Deg Fahrenheit</h2>
      </div>
    </ForecastWrapper>
  ) : (
    <ForecastLoadingWrapper>Forecast Loading</ForecastLoadingWrapper>
  )
}

const ForecastWrapper = styled.div`
  //add styles here for current location info
  background: rgba(255, 255, 255, 0.8);
  height: 20vh;
  width: 90vw;
  margin: 0 auto;
`

const ForecastLoadingWrapper = styled.div`
  //add styles here for current location loading placeholder
`
