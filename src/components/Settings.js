import React, { useState } from 'react'
import styled from 'styled-components'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { useScrollYPosition } from 'react-use-scroll-position'

library.add(faCog)

export default function Settings({ widgets }) {
  const localSetting = JSON.parse(localStorage.getItem(`widgetToggleSettings`))

  const filteredWidgets = (widgets, localSetting) => {
    if (!localSetting) {
      return { active: widgets, inactive: [] }
    }
    const savedActive = localSetting.active
    const active = []
    const inactive = []
    widgets.map(widget =>
      savedActive.indexOf(widget.name) === -1
        ? inactive.push(widget)
        : active.push(widget)
    )
    return { active, inactive }
  }

  const [widgetStatus, setWidgetStatus] = useState(
    filteredWidgets(widgets, localSetting)
  )
  const updateLocalStorage = state =>
    localStorage.setItem(
      `widgetToggleSettings`,
      JSON.stringify({
        active: state.active.map(({ name }) => name),
        inactive: state.inactive.map(({ name }) => name),
      })
    )

  // if (widgetStatus.active.length === 0 && widgetStatus.inactive.length === 0) {
  //   setWidgetStatus({ active: widgets, inactive: [] })
  // }

  const activateWidget = inactiveIndex => {
    setWidgetStatus(({ active, inactive }) => {
      active.push(...inactive.splice(inactiveIndex, 1))
      updateLocalStorage({ active, inactive })
      return { active, inactive }
    })
  }

  const deactivateWidget = activeIndex => {
    setWidgetStatus(({ active, inactive }) => {
      inactive.push(...active.splice(activeIndex, 1))
      updateLocalStorage({ active, inactive })
      return { active, inactive }
    })
  }

  const SettingsWidgets = [
    WidgetSelector({ widgetStatus, activateWidget, deactivateWidget }),
  ]

  const [showOptions, setOptions] = useState(false)
  const toggleOptionsModal = () => setOptions(state => !state)
  return [
    ...widgetStatus.active.map(({ component }) => component),
    <SettingsWrapper
      showOptions={showOptions}
      toggleOptions={toggleOptionsModal}
    >
      {SettingsWidgets}
    </SettingsWrapper>,
  ]
}
const SettingsWrapper = ({ children, showOptions, toggleOptions }) => {
  return (
    <>
      <ToggleButton onClick={toggleOptions}>
        <FontAwesomeIcon icon='cog' />
      </ToggleButton>
      {showOptions ? (
        <SettingsModal show={showOptions}>{children}</SettingsModal>
      ) : (
        ''
      )}
    </>
  )
}

const SettingsModal = styled.div`
  transition: all 0.3s ease;
  background: var(--brand-color);
  background: -webkit-linear-gradient(
    to top left,
    rgba(var(--rgb-accent-dark), 0.8),
    rgba(var(--rgb-brand-color), 0.9),
    rgba(var(--rgb-main-dark), 0.7)
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to top left,
    rgba(var(--rgb-accent-dark), 0.9),
    rgba(var(--rgb-brand-color), 0.95),
    rgba(var(--rgb-main-dark), 0.8)
  );
  opacity: ${({ show }) => (show ? 1 : 0)};
  position: fixed;
  top: 0;
  z-index: 5000;
  left: 0;
  min-height: 100vh;
  width: 100vw;
  display: grid;
  padding: 3vmax;
  grid-auto-flow: row dense;
  grid-gap: 1vw;
  grid-template-columns: repeat(8, 1fr);
  grid-auto-rows: 11.25vw;
  @media screen and (orientation: portrait) {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 25vw;
  }
`

const WidgetSelector = ({ widgetStatus, activateWidget, deactivateWidget }) => {
  return (
    <>
      <SelectorWrap>
        <h1>Toggle Widgets</h1>
        <h2>Active</h2>
        <ul>
          {widgetStatus.active.map(({ name }, index) => (
            <li onClick={() => deactivateWidget(index)}>{name}</li>
          ))}
        </ul>
        <h2>Inactive</h2>
        <ul>
          {widgetStatus.inactive.map(({ name }, index) => (
            <li onClick={() => activateWidget(index)}>{name}</li>
          ))}
        </ul>
      </SelectorWrap>
    </>
  )
}

const ToggleButton = styled.button`
  padding: 24px 12px;
  background: transparent;
  border: none;
  color: var(--main-light);
  font-size: 2em;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 6000;
`

const SelectorWrap = styled.div`
  padding: 1vmax;
  background: rgba(var(--rgb-main-dark), 0.95);
  color: var(--main-light);
  border-radius: 5px;
  grid-column: span 2;
  grid-row: span 2;
  @media screen and (orientation: portrait) {
    grid-row: span 2;
  }
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 1.25em;
    margin-bottom: 1vmax;
  }
  h2 {
    font-size: 1em;
    color: var(--brand-color);
    margin: 1vmax 0;
  }
  ul {
    li {
      color: var(--main-light);
      cursor: pointer;
      padding: 0.5vmax 1vmax;
      &:hover {
        background: var(--accent-light);
        color: var(--main-dark);
      }
    }
  }
`
