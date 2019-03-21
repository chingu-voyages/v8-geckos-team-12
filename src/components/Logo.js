import React from 'react'
import styled from 'styled-components'

const Logo = () => (
  <LogoWrapper>
    <img src={require('../images/logo.svg')} alt='Dashboard Logo' />
  </LogoWrapper>
)

const LogoWrapper = styled.div`
  & img {
    @media screen and (max-width: 530px) {
       {
        width: 210px;
      }
    }
    // @media screen and (max-width: 420px) {
    //    {
    //     width: 180px;
    //   }
    // }
  }
`

export default Logo
