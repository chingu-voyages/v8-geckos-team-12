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
  position: fixed;
  bottom: 0;
  width: 100vw;
  background-color: var(--main-dark);
  color: var(--main-light);
  font-size: 0.85em;
  padding: 0.4em;
  text-align: center;
  margin-top: 7em;

  & a,
  a:visited {
    color: var(--brand-color);
  }
`
