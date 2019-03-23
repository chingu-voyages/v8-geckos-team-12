import React from 'react'
import styled from 'styled-components'

const Logo = () => (
  <Image src={require('../images/logo.svg')} alt='Dashboard Logo' />
)

const Image = styled.img`
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
`

export default Logo
