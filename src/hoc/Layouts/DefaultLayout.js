import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import styles from './DefaultLayout.module.scss'
import TopNavbar from '../../containers/TopNavbar/TopNavbar'
import * as actionTypes from '../../store/actions/actionTypes'

const Layout = (props) => {
  return (
    <Fragment>
      <TopNavbar user={ props.user } navbar={ props.navbar } onSignout={ props.onSignout } />
      <aside className={styles.Sidebar}>
        { props.sidebar }
      </aside>
      <main className={styles.Content}>
        { props.content }
      </main>
    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    csrf: state.auth.csrf,
    user: state.auth.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSignout: () => dispatch({ type: actionTypes.LOGOUT_START })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)