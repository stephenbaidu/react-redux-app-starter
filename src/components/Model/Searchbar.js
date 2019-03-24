import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardBody } from 'reactstrap'

import styles from './Model.module.scss'

const Searchbar = props => {
  return (
    <Card className={ styles.Searchbar }>
      <CardBody>
        Searchbar here
      </CardBody>
    </Card>
  )
}

Searchbar.propTypes = {
  fields: PropTypes.array.isRequired
}

export default Searchbar;
