import React, { useState } from 'react'
import styled from 'styled-components'

export default function WidgetSelector({ widgets }) {
  const [widgetStatus, setWidgetStatus] = useState({
    active: [],
    inactive: [],
  })

  if (widgetStatus.active.length === 0 && widgetStatus.inactive.length === 0) {
    setWidgetStatus({ active: widgets, inactive: [] })
  }

  const activateWidget = inactiveIndex =>
    setWidgetStatus(({ active, inactive }) => {
      active.push(...inactive.splice(inactiveIndex, 1))
      return { active, inactive }
    })

  const deactivateWidget = activeIndex =>
    setWidgetStatus(({ active, inactive }) => {
      inactive.push(...active.splice(activeIndex, 1))
      return { active, inactive }
    })

  console.log(widgetStatus)
  return [
    ...widgetStatus.active.map(({ component }) => component),
    Selector({ widgetStatus, activateWidget, deactivateWidget }),
  ]
}

const Selector = ({ widgetStatus, activateWidget, deactivateWidget }) => {
  return (
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
  )
}

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
