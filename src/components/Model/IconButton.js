import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const IconButton = props => {
  return (
    <Button {...props} >
      <FontAwesomeIcon icon={ props.icon } />
      { ' ' + props.title }
    </Button>
  )
}

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default IconButton
