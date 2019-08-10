import React from "react"
import * as icons from "react-heroicons-ui"

export default () => {
  return (
    <ul>
      {Object.entries(icons).map(([iconName, Component]) => (
        <li key={iconName}>
          <Component></Component>
        </li>
      ))}
    </ul>
  )
}
