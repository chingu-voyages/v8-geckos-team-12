import React, { useState } from 'react'
import Logo from './Logo'
import styled from 'styled-components'
import CurrentLocation from './CurrentLocation'
import { useScrollYPosition } from 'react-use-scroll-position'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
library.add(faCog)

const Header = props => {
  const position = useScrollYPosition()
  return (
    <HeaderWrapper show={position < 200}>
      <Logo />
      <CurrentLocation
        latitude={props.latitude}
        longitude={props.longitude}
        setUnsplashQuery={props.setUnsplashQuery}
      />
      <ToggleSettingsVisibleButton
        toggleShowSettings={props.toggleShowSettings}
      />
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.header`
  position: -webkit-sticky; /* Safari */
  position: sticky;
  background: var(--main-dark);
  z-index: 1000;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 56px;
  margin: 24px 0;
  opacity: 1;
  transition: all ease 0.5s;
  transform: translateY(0);
  @media screen and (max-width: 420px) {
    display: flex;
    padding: 24px 8px;
    margin: 0 auto;
  }

  @media screen and (orientation: portrait) {
    ${({ show }) => (show ? `` : `transform: translateY(-100%);`)};
    ${({ show }) => (show ? `` : `opacity: 0;`)};
    flex-direction: column;
    justify-content: center;
  }
`
const ToggleSettingsVisibleButton = ({ toggleShowSettings }) => (
  <ToggleButton onClick={toggleShowSettings}>
    <FontAwesomeIcon icon='cog' />
  </ToggleButton>
)

const ToggleButton = styled.button`
  position: relative;
  height: 100%;
  background: transparent;
  border: none;
  color: var(--main-light);
  font-size: 2em;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 6000;
`

export default Header
