import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { ButtonToolbar } from 'reactstrap'

import styles from './Model.module.scss'
import ModelForm from './ModelForm'
import IconButton from './IconButton'

const ModelNew = props => {
  const [record, setRecord] = useState({})

  const onChange = event => {
    const { name, value } = event.target
    setRecord({ ...record, [name]: value })
  }

  const onSave = () => props.onCreate(record)
  const onCancel = () => props.history.goBack()

  return (
    <div className={ styles.ModelNew }>
      <ModelForm rows={ props.rows } onChange={ onChange } />
      <hr />
      <ButtonToolbar>
        <IconButton icon="save" title="Save"  className="mr-2" color="success" size="md" outline onClick={ onSave } />
        <IconButton icon="times" title="Cancel" className="mr-2" color="secondary" size="md" outline onClick={ onCancel } />
      </ButtonToolbar>
    </div>
  )
}

ModelNew.propTypes = {
  rows: PropTypes.array.isRequired,
  onCreate: PropTypes.func.isRequired,
}

export default withRouter(ModelNew);
