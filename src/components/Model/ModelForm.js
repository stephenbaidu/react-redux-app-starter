import React from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Row,
  Col,
  FormGroup,
  Label
} from 'reactstrap'

import styles from './Model.module.scss'
import { ObjectByString } from './Helpers'
import EditableInput from './EditableInput'
import ReadOnlyInput from './ReadOnlyInput'

const ModelForm = props => {
  const handleChange = event => {
    props.onChange(event)
  }

  const getFieldValue = field => {
    if (props.readOnly) {
      return ObjectByString(props.data, field.path || field.key)
    } else {
      return ObjectByString(props.data, field.key)
    }
  }

  const getColFromField = field => {
    const fieldValue = props.data ? getFieldValue(field) : ''
    const inputProps = { name: field.key, bsSize: 'sm', field: field }
    return (
      <Col md={ 6 } key={ "field-" + field.key }>
        <FormGroup>
          <Label for={ field.key }>{ field.label }</Label>
          { props.readOnly ? (
            <ReadOnlyInput { ...inputProps } value={ fieldValue || '' } />
          ) : (
            <EditableInput { ...inputProps } defaultValue={ fieldValue } onChange={ e => handleChange(e) } />
          )}
        </FormGroup>
      </Col>
    )
  }

  const rowColsFromFields = fields => {
    return fields.map(field => getColFromField(field))
  }

  const formRows = props.rows.map(fields => {
    const rowKey = "row-" + fields[0].key
    return (
      <Row form key={ rowKey }>
        { rowColsFromFields(fields) }
      </Row>
    )
  })

  return (
    <Form className={ styles.ModelForm }>
      { formRows }
    </Form>
  )
}

ModelForm.propTypes = {
  rows: PropTypes.array.isRequired,
  data: PropTypes.object,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool
}

ModelForm.defaultProps = {
  data: {},
  readOnly: false,
  onChange: () => {}
}

export default ModelForm;
