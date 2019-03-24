import React from 'react'
import { Nav } from 'reactstrap'

import styles from './Sidebar.module.scss'
import SidebarHeading from './SidebarHeading'
import SidebarLink from './SidebarLink'

const Sidebar = props => {
  return (
    <div className={styles.Sidebar + ' sidebar-sticky'}>
      <SidebarHeading title="General" />
      <Nav vertical>
        <SidebarLink to={ `${props.parentPath}/dashboard` } title="Dashboard" />
        <SidebarLink to={ `${props.parentPath}/customers` } title="Customers" icon="search" />
      </Nav>
      <SidebarHeading title="Orders" />
      <Nav vertical>
        <SidebarLink to={ `${props.parentPath}/new-order` } title="New Order" />
        <SidebarLink to={ `${props.parentPath}/recent-orders` } title="Recent Orders" />
        <SidebarLink to={ `${props.parentPath}/reports` } title="Reports" />
      </Nav>
      <SidebarHeading title="Inventory" />
      <Nav vertical>
        <SidebarLink to={ `${props.parentPath}/products` } title="Products" />
        <SidebarLink to={ `${props.parentPath}/inventory` } title="Inventory" />
      </Nav>
      <SidebarHeading title="Settings" />
      <Nav>
        <SidebarLink to={ `${props.parentPath}/shop-settings` } title="Shop Settings" />
        <SidebarLink to={ `${props.parentPath}/manage-users` } title="Manage Your Users" />
      </Nav>
    </div>
  )
}

export default Sidebar
