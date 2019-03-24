import React from 'react'
import PropTypes from 'prop-types'
import { NavLink as LinkTag } from 'react-router-dom'
import { NavLink } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './Sidebar.module.scss'

const SidebarLink = props => {
  return (
    <NavLink className={ styles.SidebarLink } tag={LinkTag} to={ props.to }>
      <FontAwesomeIcon icon={ props.icon || "file"} />
      { props.title }
    </NavLink>
  )
}

SidebarLink.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
}

export default SidebarLink
