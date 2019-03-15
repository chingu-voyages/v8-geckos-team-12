import React, { useState } from 'react'

export default ({ latitude, longitude }) => {
  const [forecast, setForecast] = useState()

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
      process.env.REACT_APP_OWM_API_KEY
    }`
  )
    .then(response => response.json())
    .then(result => setForecast(result))
  return forecast ? (
    <div>Weather Forecast: {JSON.stringify(forecast)}</div>
  ) : (
    <div>Forecast Loading</div>
  )
}
