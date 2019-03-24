import React from 'react'
import PropTypes from 'prop-types'
import { ButtonToolbar, Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './Model.module.scss'

const Toolbar = props => {
  return (
    <ButtonToolbar className={ styles.RightToolbar }>
      <Button className="mr-2" color="secondary" outline onClick={ () => props.onAddClicked() }>
        <FontAwesomeIcon icon="plus" />
        {' '}Add
      </Button>
      <Button color="info" outline onClick={ () => props.onSearchClicked() }>
        <FontAwesomeIcon icon="search" />
        {' '}Search
      </Button>
    </ButtonToolbar>
  )
}

Toolbar.propTypes = {
  onAddClicked: PropTypes.func.isRequired,
  onSearchClicked: PropTypes.func.isRequired
}

export default Toolbar;