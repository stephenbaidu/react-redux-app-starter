import React, { useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import styles from './App.module.scss'
import * as actionTypes from '../../store/actions/actionTypes'
import ShopSelector from './ShopSelector'
import ShopHome from './Home'
import TopNavbar from '../../containers/TopNavbar/TopNavbar'

const Shops = props => {
  const checkUser = () => {
    if (localStorage.signedIn && !(props.user && props.user.id)) {
      props.reloadUser()
    } else {
      return <Redirect to='/signin'/>
    }
  }

  useEffect(() => {
    checkUser()
    !props.shops && props.loadShops()
    return () => {}
  }, [])

  const shopSelector = () => {
    if (props.shops) {
      return <ShopSelector shops={ props.shops } />
    } else {
      return null
    }
  }
  return (
    <div className={ styles.Shops }>
      <TopNavbar user={ props.user } onSignout={ props.onSignout } />
      <Switch>
        <Route path='/s/:id' component={ ShopHome } />
        <Route path='/' exact component={ () => shopSelector() } />
      </Switch>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    shops: state.shop.shops,
    error: state.shop.error,
    loading: state.shop.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reloadUser: () => dispatch({ type: actionTypes.RELOAD_USER }),
    loadShops: () => dispatch({ type: actionTypes.SHOPS_LOAD_REQUESTED }),
    onCreateNewShop: params => dispatch({ type: actionTypes.SHOP_ADD_REQUESTED, payload: params }),
    onSignout: () => dispatch({ type: actionTypes.LOGOUT_START })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shops)
