import React, { useState } from 'react'
import styled from 'styled-components'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
library.add(faCog)

export default ({ profileLink, user, unsplashLink, toggleShowSettings }) => {
  return (
    <Foot>
      Background photo by{' '}
      <a href={profileLink} rel='noopener noreferrer' target='_blank'>
        {user}
      </a>{' '}
      on{' '}
      <a href={unsplashLink} rel='noopener noreferrer' target='_blank'>
        Unsplash
      </a>
      <ToggleSettingsVisibleButton toggleShowSettings={toggleShowSettings} />
    </Foot>
  )
}

const Foot = styled.div`
  position: fixed;
  bottom: 0;
  width: 100vw;
  background-color: var(--accent-dark);
  color: var(--main-light);
  font-size: 0.8em;
  padding: 0.4em;
  text-align: center;
  margin-top: 7em;

  & a,
  a:visited {
    color: var(--brand-color);
  }

  @media screen and (orientation: portrait) {
    text-align: left;
  }
`
const ToggleSettingsVisibleButton = ({ toggleShowSettings }) => (
  <ToggleButton onClick={toggleShowSettings}>
    <FontAwesomeIcon icon='cog' /> Settings
  </ToggleButton>
)

const ToggleButton = styled.button`
  position: fixed;
  background: transparent;
  border: none;
  color: var(--main-light);
  font-size: 0.85em;
  padding: 0.4em;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 6000;
`
