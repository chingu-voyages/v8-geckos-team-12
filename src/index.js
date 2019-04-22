import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import LogRocket from 'logrocket'
import setupLogRocketReact from 'logrocket-react'
console.log(process.env)
if (process.env.NODE_ENV !== `development`) {
  LogRocket.init('t7irp1/geckos')
  setupLogRocketReact(LogRocket)
  if (process.env.BRANCH !== `master`) {
    const name = window.prompt(`name: `, localStorage.getItem(`name`))
    const device = window.prompt(
      `describe device: `,
      localStorage.getItem(`device`)
    )
    localStorage.setItem(`name`, name)
    localStorage.setItem(`device`, device)
    LogRocket.identify('THE_USER_ID_IN_YOUR_APP', {
      name: name,
      email: device,
    })
  }
} else {
}

ReactDOM.render(
  <>
    <App />
  </>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
