import React from 'react'
import Logo from './Logo'
import styled from 'styled-components'
import CurrentLocation from './CurrentLocation'

const Header = props => (
  <HeaderWrapper>
    <Logo />
    <CurrentLocation
      latitude={props.latitude}
      longitude={props.longitude}
      setUnsplashQuery={props.setUnsplashQuery}
    />
  </HeaderWrapper>
)

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 56px;
  margin: 24px 0;

  @media screen and (max-width: 420px) {
     {
      display: block;
      padding: 24px 8px;
      margin: 0 auto;
    }
  }
`

export default Header
