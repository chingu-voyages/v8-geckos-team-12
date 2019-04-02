import React, { useState } from 'react'
import styled from 'styled-components'

export default ({ latitude, longitude }) => {
  const [forecast, setForecast] = useState()
  const setDestructuredForecast = ({ list }) => {
    console.log(list)
    setForecast({
      list: changeForecast(list),
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
    const changeForecast = list => {
      let newList = []
      let data = {
        date: list[0].dt_txt.split(' ')[0],
        min: [list[0].main.temp_min],
        max: [list[0].main.temp_max],
        weather: '',
      }
      for (let i = 0; i < list.length - 1; i++) {
        if (list[i].dt_txt.split(' ')[0] == list[i + 1].dt_txt.split(' ')[0]) {
          data.min.push(list[i + 1].main.temp_min)
          data.max.push(list[i + 1].main.temp_max)
          if (list[i + 1].dt_txt.split(' ')[1] == '12:00:00') {
            data.weather = list[i + 1].weather[0].main
          }
          if (i + 2 == list.length) {
            newList.push({
              date: data.date,
              min: data.min,
              max: data.max,
              weather: data.weather,
            })
          }
        } else {
          newList.push({
            date: data.date,
            min: data.min,
            max: data.max,
            weather: data.weather,
          })
          data.date = list[i + 1].dt_txt.split(' ')[0]
          data.min = []
          data.max = []
          data.min.push(list[i + 1].main.temp_min)
          data.max.push(list[i + 1].main.temp_max)
        }
      }
      return newList
    }
    return forecast ? (
      <ComponentWrapper>
        <div>
          {console.log(forecast)}
          {forecast.list.map(singleDay => {
            return (
              <DayWrapper>
                <div>
                  <p>Day: {singleDay.date}</p>
                  High: {Math.max(...singleDay.max)}&#176; F
                  <br />
                  <br />
                  Low: {Math.min(...singleDay.min)}&#176; F
                  <br />
                  <br />
                </div>
                <div>
                  <p>{singleDay.weather}</p>
                  <i className={weatherIcon(singleDay.weather)} />
                </div>
              </DayWrapper>
            )
          })}
        </div>
      </ComponentWrapper>
    ) : (
      <ForecastLoadingWrapper>Forecast Loading</ForecastLoadingWrapper>
    )
  }
}

const ComponentWrapper = styled.div``
const DayWrapper = styled.div`
  /* overflow: scroll; */
  background-color: rgba(var(--rgb-main-light), 0.8);
  margin: 1%;
  padding: 2%;
  display: flex;
  justify-content: space-around;
  border-radius: 5px;
  p {
    font-weight: bold;
    padding: 1% 0 3%;
    margin-bottom: 10%;
    text-align: center;
  }
  div {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`
const ForecastLoadingWrapper = styled.div`
  /* add styles here for current location loading placeholder */
  background-color: rgba(var(--rgb-main-light), 0.85);
  grid-column: span 4;
  grid-row: span 2;
`
