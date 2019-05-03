import React, { useState } from 'react'
import styled from 'styled-components'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
library.add(faCog)

export default ({ profileLink, user, unsplashLink, toggleShowSettings }) => {
  return (
    <Foot>
      <div className='attribution'>
        Background photo by{' '}
        <a href={profileLink} rel='noopener noreferrer' target='_blank'>
          {user}
        </a>{' '}
        on{' '}
        <a href={unsplashLink} rel='noopener noreferrer' target='_blank'>
          Unsplash
        </a>
      </div>
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
  padding: 1em;
  text-align: center;
  margin-top: 7em;

  & a,
  a:visited {
    color: var(--brand-color);
  }

  @media screen and (orientation: portrait) {
    div.attribution {
      width: 66%;
      text-align: left;
      margin-left: 0.4em;
      line-height: 1.2;
    }
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
  padding: 0.6em;
  bottom: 1.2em;
  right: 0;
  z-index: 6000;
  cursor: pointer;
`
