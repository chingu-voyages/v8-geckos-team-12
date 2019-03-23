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
    today,
  }) =>
    setForecast({
      weather,
      main,
      visibility,
      wind,
      clouds,
      sys,
      today: weatherIcon(weather[0].main),
    })
  if (!forecast) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${
        process.env.REACT_APP_OWM_API_KEY
      }`
    )
      .then(response => response.json())
      .then(result => setDestructuredForecast(result))
  }

  const weatherIcon = main => {
    if (main == 'clouds') {
      return <i class='fas fa-cloud' />
    } else if (main == 'rain') {
      return <i class='fas fa-tint' />
    } else if (main == 'snow') {
      return <i class='far fa-snowflake' />
    }
  }
  return forecast ? (
    <ForecastWrapper>
      {console.log(forecast)}
      <div>
        <h2>Weather Info</h2>
        <a href=''>Today</a>&nbsp;&nbsp;|&nbsp;&nbsp; <a href=''>5 days</a>
        <h2>{forecast.main.temp}&#176; F</h2>
        <h1>
          {forecast.today}
          {forecast.weather[0].main}
        </h1>
        <p>
          H {forecast.main.temp_max}&#176; / L {forecast.main.temp_max}&#176;
        </p>
      </div>
    </ForecastWrapper>
  ) : (
    <ForecastLoadingWrapper>Forecast Loading</ForecastLoadingWrapper>
  )
}

const ForecastWrapper = styled.div`
  //add styles here for current location info
  background: rgba(255, 255, 255, 0.8);
  grid-column: span 4;
  grid-row: span 2;
  margin: 0 2%;
  line-height: 20px;
  padding: 1%;
  box-shadow: 0 0 35px rgba(50, 50, 50, 0.4), 0 0 10px rgba(20, 20, 20, 0.4);
  border-radius: 5px;
  background-color: rgba(var(--rgb-main-light), 0.5);
  color: var(--main-dark);
`
const ForecastLoadingWrapper = styled.div`
  //add styles here for current location loading placeholder
  background-color: rgba(var(--rgb-main-light), 0.5);
  grid-column: span 4;
  grid-row: span 2;
`
