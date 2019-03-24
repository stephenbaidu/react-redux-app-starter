import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'reactstrap'

const ReadOnlyInput = props => {
  return <Input { ...props } readOnly />
}

ReadOnlyInput.propTypes = {
  value: PropTypes.any.isRequired
}

export default ReadOnlyInput
