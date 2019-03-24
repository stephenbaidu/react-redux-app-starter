import React from 'react'
import { NavLink as RRNavLink } from 'react-router-dom'
import { Nav, NavItem, NavLink } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './ModulesNavbar.module.scss'

const ModulesNavbar = props => {
  return (
    <Nav navbar>
      <NavItem>
        <NavLink tag={RRNavLink} to="/" className={styles.MainNavLink}>
          <FontAwesomeIcon icon="tachometer-alt" />
          { ' ' + props.mainLinkLabel }
          <sub> (Shops)</sub>
        </NavLink>
      </NavItem>
      <NavItem className={styles.NavItem}>
        <NavLink tag={RRNavLink} to="/admin">
          <FontAwesomeIcon icon="cogs" />
          {' '}Admin Panel
        </NavLink>
      </NavItem>
      <NavItem className={styles.NavItem}>
        <NavLink tag={RRNavLink} to="/billing">
          <FontAwesomeIcon icon="chart-bar" />
          {' '}Billing
        </NavLink>
      </NavItem>
    </Nav>
  )
}

export default ModulesNavbar
