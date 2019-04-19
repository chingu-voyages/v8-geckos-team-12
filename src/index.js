import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import LogRocket from 'logrocket'
import setupLogRocketReact from 'logrocket-react'
LogRocket.init('t7irp1/geckos')
setupLogRocketReact(LogRocket)

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
