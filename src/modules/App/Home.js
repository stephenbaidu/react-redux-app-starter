import React, { Fragment, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import ModulesNavbar from '../ModulesNavbar'
import DefaultLayout from '../../hoc/Layouts/DefaultLayout'
import Sidebar from '../../containers/Sidebar/Sidebar'
import Dashboard from '../../pages/Dashboard'
import Customers from '../../pages/Customers'
import NewOrder from '../../pages/NewOrder'
import RecentOrders from '../../pages/RecentOrders'
import Reports from '../../pages/Reports'
import Products from '../../pages/Products'
import Inventory from '../../pages/Inventory'
import ShopSettings from '../../pages/ShopSettings'
import ManageUsers from '../../pages/ManageUsers'
import * as actionTypes from '../../store/actions/actionTypes'

const Home = props => {
  const shopLabel = () => {
    if (props.currentShop) {
      return props.currentShop.name
    } else {
      return 'Loading shop...'
    }
  }

  useEffect(() => {
    const { id } = props.match.params
    props.loadCurrentShop(id)
  }, [])
  
  const sidebar = <Sidebar parentPath={ props.match.url } />
  const navbar = <ModulesNavbar mainLinkLabel={ shopLabel() } />

  const content = (
    <Fragment>
      <Switch>
        <Route path={ `${ props.match.url }/dashboard` } component={Dashboard} />
        <Route path={ `${ props.match.url }/customers` } component={Customers} />
        <Route path={ `${ props.match.url }/new-order` } component={NewOrder} />
        <Route path={ `${ props.match.url }/recent-orders` } component={RecentOrders} />
        <Route path={ `${ props.match.url }/reports` } component={Reports} />
        <Route path={ `${ props.match.url }/products` } component={Products} />
        <Route path={ `${ props.match.url }/inventory` } component={Inventory} />
        <Route path={ `${ props.match.url }/shop-settings` } component={ShopSettings} />
        <Route path={ `${ props.match.url }/manage-users` } component={ManageUsers} />
        <Route path={ props.match.url } exact component={Dashboard} />
      </Switch>
    </Fragment>
  )
  return (
    <DefaultLayout
      navbar={ navbar }
      sidebar={ sidebar }
      content={ content }
    />
  )
}

const mapStateToProps = state => {
  return {
    currentShop: state.shop.currentShop
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCurrentShop: id => dispatch({ type: actionTypes.CURRENT_SHOP_REQUESTED, payload: id }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
