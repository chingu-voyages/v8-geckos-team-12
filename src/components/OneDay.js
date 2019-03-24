import React, { useState } from 'react'
import styled from 'styled-components'

export default ({ latitude, longitude }) => {
  const [forecast, setForecast] = useState()
  const [weatherIcons, setWeatherIcons] = useState(
    <i className='fas fa-cloud-sun fa-2x' />
  )
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
  // const weatherIcon = main => {
  //   if (main == 'clouds') {
  //     return <i className='fas fa-cloud' />
  //   } else if (main == 'rain') {
  //     return <i className='fas fa-tint' />
  //   } else if (main == 'snow') {
  //     return <i className='far fa-snowflake' />
  //   } else if (main == "sunny" || main =="clear"){
  //     return <i className="fas fa-sun"></i>
  //   }
  // }
  return forecast ? (
    <ForecastWrapper>
      {console.log(forecast)}
      <div>
        <h2>Weather Info</h2>
        <h2>
          {weatherIcons} {forecast.weather[0].main}
        </h2>
        <section>
          <h1>{forecast.main.temp}&#176; F</h1>
          <p>
            H {forecast.main.temp_max}&#176; / L {forecast.main.temp_min}&#176;
          </p>
        </section>
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
  /* line-height: 20px; */
  padding: 1%;
  box-shadow: 0 0 35px rgba(50, 50, 50, 0.4), 0 0 10px rgba(20, 20, 20, 0.4);
  border-radius: 5px;
  background-color: rgba(var(--rgb-main-light), 0.5);
  color: var(--main-dark);
  section h1 {
    font-size: 26px;
  }
  p,
  h2,
  h1 {
    padding: 2% 0.5%;
    color: var(--main-dark);
  }
  h2 {
    font-size: 1.25em;
  }
`
const ForecastLoadingWrapper = styled.div`
  //add styles here for current location loading placeholder
  background-color: rgba(var(--rgb-main-light), 0.5);
  grid-column: span 4;
  grid-row: span 2;
`