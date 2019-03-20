import React from 'react'
import styled from 'styled-components'
import sun from '../images/sun_animated.svg'
import { useSpring, useTransition, animated, config } from 'react-spring'

export default () => {
  const loadingAnimation = useSpring({
    position: `relative`,
    transform: `scale(1)`,
    opacity: 1,
    top: 0,
    from: { transform: `scale(0.5)`, top: -100, opacity: 0 },
    config: config.slow,
  })
  const modalBackground = useSpring({
    background: `linear-gradient(to top left, #2c5364, #203a43, #0f2027)`,
    from: {
      background: `linear-gradient(to top left, #517e91, #6e9fb5, #4b6e7a)`,
    },
    config: config.slow,
  })
  return (
    <Modal style={modalBackground}>
      <Loading style={loadingAnimation}>
        <object type={'image/svg+xml'} data={sun}>
          Your browser does not support SVG
        </object>
        <p>Dashboard is loading</p>
      </Loading>
    </Modal>
  )
}

const Modal = styled.div`
  position: fixed;
  top: 0;
  background: #ffffff;
  color: #000000;
  font-family: 'Courier New', Courier, monospace;
  font-size: 16px;
  text-align: center;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0f2027;
  background: -webkit-linear-gradient(
    to top left,
    #2c5364,
    #203a43,
    #0f2027
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to top left, #2c5364, #203a43, #0f2027);
`

const Loading = styled(animated.div)`
  width: 500px;
  margin: auto;
  font-size: 1.3em;
`
