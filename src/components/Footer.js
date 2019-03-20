import React, { useState } from 'react'
import styled from 'styled-components'

export default ({ profileLink, user, unsplashLink }) => {
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
    </Foot>
  )
}

const Foot = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  color: #d8d8d8;
  font-size: 0.85em;
  padding: 0.4em;
  text-align: center;
  margin-top: 7em;
`
