import React from 'react'
import PropTypes from 'prop-types'

import styles from './Sidebar.module.scss'

const SidebarHeading = props => {
  return (
    <span className={ styles.SidebarHeading }>
      <span>{ props.title }</span>
    </span>
  )
}

SidebarHeading.propTypes = {
  title: PropTypes.string.isRequired
}

export default SidebarHeading
