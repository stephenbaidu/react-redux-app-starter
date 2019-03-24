import React from 'react'
import PropTypes from 'prop-types'
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

import styles from './TopNavbar.module.scss'
import logo from '../../assets/images/logo.png'

const TopNavbar = (props) => {
  const rightNavbar = (
    <Nav className="ml-auto" navbar>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
        { props.user && props.user.name }
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>
            Signed in as:<br/> <b>{ props.user && props.user.email }</b>
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem>
            Account Settings
          </DropdownItem>
          <DropdownItem>
            Change Password
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={ props.onSignout }>
            Logout
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </Nav>
  )

  return (
    <div>
      <Navbar fixed="top" color="light" light expand="md" className={styles.Navbar}>
        <NavbarBrand href="/" className={styles.NavbarBrand}>
          <img src={logo} alt="" className="rounded" />
        </NavbarBrand>
        <Collapse navbar>
          { props.navbar }
          { rightNavbar }
        </Collapse>
      </Navbar>
    </div>
  );
}

TopNavbar.propTypes = {
  user: PropTypes.object,
  onSignout: PropTypes.func.isRequired,
  hideModules: PropTypes.bool,
}

TopNavbar.defaultProps = {
  user: {}
}

export default TopNavbar
