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
  }) =>
    setForecast({
      weather,
      main,
      visibility,
      wind,
      clouds,
      sys,
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
    let icon = main.toLowerCase()
    if (icon == 'clouds') {
      return 'fas fa-cloud fa-3x'
    } else if (icon == 'rain') {
      return 'fas fa-cloud-rain fa-3x'
    } else if (icon == 'snow') {
      return 'far fa-snowflake fa-3x'
    } else if (icon == 'sunny' || icon == 'clear') {
      return 'fas fa-sun fa-3x'
    } else {
      return 'fas fa-cloud-sun fa-3x'
    }
  }
  return forecast ? (
    <TodayWrapper>
      <div>
        <i className={weatherIcon(forecast.weather[0].main)} />{' '}
        <h1>{forecast.weather[0].main}</h1>
        <section>
          <h1>{forecast.main.temp}&#176; F</h1>
          <p>
            H {forecast.main.temp_max}&#176; / L {forecast.main.temp_min}&#176;
          </p>
        </section>
      </div>
    </TodayWrapper>
  ) : (
    <ForecastLoadingWrapper>Forecast Loading</ForecastLoadingWrapper>
  )
}

const TodayWrapper = styled.div`
  i {
    color: var(--main-dark);
  }
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ForecastLoadingWrapper = styled.div`
  //add styles here for current location loading placeholder
  background-color: rgba(var(--rgb-main-light), 0.85);
  grid-column: span 4;
  grid-row: span 2;
`
