import React, { Component, Fragment } from 'react'

import TopNavbar from '../../containers/TopNavbar/TopNavbar'
import ComingSoon from '../../components/ComingSoon/ComingSoon';

export default class Billing extends Component {
  render() {
    return (
      <Fragment>
          <TopNavbar />
          <main>
              <ComingSoon msg="A refreshed Billing Page" />
          </main>
      </Fragment>
    )
  }
}
