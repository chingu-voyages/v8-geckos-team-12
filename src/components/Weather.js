import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import OneDay from './OneDay'
import FiveDays from './FiveDays'

export default props => {
  return (
    <Router>
      <ForecastWrapper>
        <Header>Weather Info</Header>
        <nav>
          <Link to='/'>Today</Link>
          <Link to='/5days'>5 Days</Link>
        </nav>
        <Route>
          <Route
            path='/'
            exact
            render={() => (
              <OneDay latitude={props.latitude} longitude={props.longitude} />
            )}
          />
          <Route
            path='/5days'
            render={() => (
              <FiveDays latitude={props.latitude} longitude={props.longitude} />
            )}
          />
        </Route>
      </ForecastWrapper>
    </Router>
  )
}

const ForecastWrapper = styled.div`
  //add styles here for current location info
  background: rgba(255, 255, 255, 0.85);
  grid-column: span 4;
  grid-row: span 2;
  overflow-y: scroll;
  /* line-height: 20px; */
  /* padding: 1%; */
  box-shadow: 0 0 35px rgba(50, 50, 50, 0.4), 0 0 10px rgba(20, 20, 20, 0.4);
  border-radius: 5px;
  background-color: rgba(var(--rgb-main-light), 0.85);
  color: var(--main-dark);
  section h1 {
    font-size: 26px;
  }
  p,
  h1 {
    padding: 2% 0.5%;
    color: var(--main-dark);
  }
  h2,
  h1 {
    font-size: 1.25em;
    text-align: center;
  }
  a {
    margin: 2%;
  }
  nav {
    display: flex;
    justify-content: center;
  }
  h2 {
    background: var(--main-dark);
    color: white;
    padding: 2%;
  }
  div {
    width: 100%;
    text-align: center;
  }
`
const ForecastLoadingWrapper = styled.div`
  //add styles here for current location loading placeholder
  background-color: rgba(var(--rgb-main-light), 0.5);
  grid-column: span 4;
  grid-row: span 2;
`
const Header = styled.div`
  font-weight: 400;
  background: var(--main-dark);
  color: var(--main-light);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25em;
  padding: 10px;
  border-radius: 5px 5px 0 0;
`
