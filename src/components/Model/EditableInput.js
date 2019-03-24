import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'reactstrap'
import Select from 'react-select'

const TextInput = props => <Input { ...props } type='text' />
const NumberInput = props => <Input { ...props } type='number' />
const EmailInput = props => <Input { ...props } type='email' />
const DateInput = props => <Input { ...props } type='date' />
const SelectInput = props => {
  const defaultValue = () => {
    return props.inputOptions.options.filter(option => option.value === props.defaultValue)
  }
  const handleChange = option => {
    if ( option === null ) return {}
    props.onChange({ target: { name: props.name, value: option.value }})
  }
  const { inputOptions: selectInputOptions, ...inputProps } = props

  return (
    <Select className='select-input'
      { ...inputProps }
      { ...selectInputOptions }
      isClearable={ true }
      defaultValue={ defaultValue() }
      onChange={ handleChange } />
  )
}

const EditableInput = props => {
  const inputComponent = () => {
    const { field: fieldConfig, ...inputProps } = props
    const { type: dataType, inputType } = fieldConfig
    if (inputType === 'select') {
      inputProps.inputOptions = fieldConfig.inputOptions
      return <SelectInput { ...inputProps } />
    } else if (dataType === 'number') {
      return <NumberInput { ...inputProps } />
    } else if (dataType === 'email') {
      return <EmailInput { ...inputProps } />
    } else if (dataType === 'date') {
      return <DateInput { ...inputProps } />
    } else {
      return <TextInput { ...inputProps } />
    }
  }

  return inputComponent()
}

EditableInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.any,
  field: PropTypes.object.isRequired
}

export default EditableInput
