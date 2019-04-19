import React, { useState } from 'react'
import styled from 'styled-components'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { themes } from '../theme/colors'
library.add(faWindowClose)

const ThemeSelector = ({ updateTheme, currentTheme }) => {
  const toggleDark = () => {
    updateTheme({ ...currentTheme, darkMode: !currentTheme.darkMode })
  }
  return (
    <>
      <SelectorWrap>
        <h1>Theme Selector</h1>
        <h2>Current Theme</h2>
        <p>{currentTheme.name}</p>
        <h2>Theme Mode</h2>
        <p>
          <ModeSlider toggle={toggleDark} isEnabled={currentTheme.darkMode} />
        </p>
        <h2>Select Theme</h2>
        <ul>
          {themes.map(
            theme =>
              theme.name !== currentTheme.name && (
                <li onClick={() => updateTheme({ ...currentTheme, ...theme })}>
                  {theme.name}
                </li>
              )
          )}
        </ul>
      </SelectorWrap>
    </>
  )
}

const ModeSlider = ({ isEnabled, toggle }) => {
  return (
    <SliderContainer onClick={toggle}>
      Normal{' '}
      <SliderBackground>
        <SlideButton isEnabled={isEnabled} />
      </SliderBackground>{' '}
      Dark
    </SliderContainer>
  )
}

const SliderContainer = styled.div`
  cursor: pointer;
`

const SlideButton = styled.div`
  position: absolute;
  top: 50%;
  ${({ isEnabled }) => (isEnabled ? `right: 2.5px;` : `left: 2.5px;`)}
  background: var(--main-light);
  width: calc(1em - 5px);
  height: calc(1em - 5px);
  border-radius: 2.5px;
  transform: translateY(-50%);
  box-shadow: 0 0 4px var(--brand-color);
`
const SliderBackground = styled.div`
  box-shadow: inset 0 0 4px var(--brand-color);
  position: relative;
  display: inline-block;
  background: var(--main-dark);
  height: 1em;
  width: 2em;
  margin: 0 0.5em;
  border-radius: 5px;
`

export default function Settings({
  widgets,
  showSettings,
  toggleShowSettings,
  updateTheme,
  currentTheme,
}) {
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
    ThemeSelector({ updateTheme, currentTheme }),
  ]

  return [
    ...widgetStatus.active.map(({ component }) => component),
    <SettingsWrapper
      showOptions={showSettings}
      toggleOptions={toggleShowSettings}
    >
      {SettingsWidgets}
    </SettingsWrapper>,
  ]
}
const SettingsWrapper = ({ children, showOptions, toggleOptions }) => {
  return showOptions ? (
    <>
      <Header>settings</Header>
      <SettingsModal show={showOptions}>{children}</SettingsModal>
      <PositionedIcon icon='window-close' onClick={toggleOptions} />
    </>
  ) : (
    ''
  )
}

const Header = styled.div`
  height: 6vmax;
  margin-left: 1.5vmax;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3em;
  color: var(--main-dark);
  z-index: 6000;
  position: fixed;
  top: 0;
  left: 0;
`
const PositionedIcon = styled(FontAwesomeIcon)`
  height: 6vmax;
  margin-right: 1.5vmax;
  font-size: 3em;
  color: var(--main-dark);
  z-index: 6000;
  position: fixed;
  top: 0;
  right: 0;
`

const SettingsModal = styled.div`
  transition: all 0.3s ease;
  background: var(--brand-color);
  background: -webkit-linear-gradient(
    to bottom right,
    var(--brand-color),
    var(--accent-light)
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom right,
    var(--brand-color),
    var(--accent-light)
  );
  opacity: ${({ show }) => (show ? 1 : 0)};
  position: fixed;
  top: 0;
  z-index: 5000;
  left: 0;
  min-height: 100vh;
  width: 100vw;
  display: grid;
  padding: 6vmax 1.5vmax 1.5vmax 1.5vmax;
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

const SelectorWrap = styled.div`
  padding: 1vmax;
  background: rgba(var(--rgb-main-light), 0.95);
  color: var(--main-dark);
  border-radius: 5px;
  grid-column: span 2;
  grid-row: span 4;
  @media screen and (orientation: portrait) {
    grid-row: span 4;
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
      color: var(--main-dark);
      cursor: pointer;
      padding: 0.5vmax 1vmax;
      &:hover {
        background: var(--accent-dark);
        color: var(--main-light);
      }
    }
  }
  p {
    padding: 0.5vmax 1vmax;
  }
`
