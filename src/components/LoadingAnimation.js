import React from 'react'
import styled from 'styled-components'

export default () => {
  return <Modal>Loading Animation</Modal>
}

const Modal = styled.div`
  position: fixed;
  top: 0;
  background: navy;
  color: white;
  font-size: 10em;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`
