import React, { useState } from 'react'
import styled from 'styled-components'

export default ({ latitude, longitude }) => {
  const [forecast, setForecast] = useState()
  const setDestructuredForecast = ({ list }) =>
    setForecast({
      list,
    })
  if (!forecast) {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${
        process.env.REACT_APP_OWM_API_KEY
      }`
    )
      .then(response => response.json())
      .then(result => setDestructuredForecast(result))
  }
  return forecast ? (
    <ForecastWrapper>
      {console.log(forecast)}
      <h2>Weather Info</h2>
      {forecast.list.map(singleDay => {
        return (
          <div>
            <p>{singleDay.dt_txt.split(' ')[0]}</p>
            <p>
              {' '}
              H {singleDay.main.temp_max} / L {singleDay.main.temp_min}
            </p>
          </div>
        )
      })}
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
  overflow: scroll;
  /* line-height: 20px; */
  padding: 1%;
  box-shadow: 0 0 35px rgba(50, 50, 50, 0.4), 0 0 10px rgba(20, 20, 20, 0.4);
  border-radius: 5px;
  background-color: rgba(var(--rgb-main-light), 0.85);
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
  p {
    display: inline;
  }
`
const ForecastLoadingWrapper = styled.div`
  //add styles here for current location loading placeholder
  background-color: rgba(var(--rgb-main-light), 0.85);
  grid-column: span 4;
  grid-row: span 2;
`
