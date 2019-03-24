import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { ButtonToolbar, Row, Col } from 'reactstrap'

import styles from './Model.module.scss'
import ModelForm from './ModelForm'
import IconButton from './IconButton'

const ModelShow = props => {
  const { id: recordId } = props.match.params

  const [editMode, setEditMode] = useState(false)
  const [changeSet, setChangeSet] = useState({})

  const onChange = event => {
    const { name, value } = event.target
    setChangeSet({ ...changeSet, [name]: value })
  }

  const onEdit = () => setEditMode(true)
  const onSave = () => {
    props.onUpdate({ ...changeSet, id: recordId })
    setEditMode(false)
  }
  const onCancel = () => setEditMode(false)
  const onDelete = () => props.onDelete(recordId)

  useEffect(() => {
    if (props.record && props.record.id && props.record.id.toString() === recordId) {
      // No need to fetch record
    } else {
      props.onQuery(recordId)
    }
  }, [])

  const viewModeToolbar = (
    <ButtonToolbar>
      <IconButton icon="pencil-alt" title="Edit" color="info" outline onClick={ onEdit } />
    </ButtonToolbar>
  )

  const editModeToolbars = (
    <Row>
      <Col md={ 6 }>
        <ButtonToolbar>
          <IconButton icon="save" title="Save"  className="mr-2" color="success" size="md" outline onClick={ onSave } />
          <IconButton icon="times" title="Cancel" className="mr-2" color="secondary" size="md" outline onClick={ onCancel } />
        </ButtonToolbar>
      </Col>
      <Col md={ 6 }>
        <ButtonToolbar className={ styles.RightToolbar }>
          <IconButton icon="trash" title="Delete" color="danger" onClick={ onDelete } />
        </ButtonToolbar>
      </Col>
    </Row>
  )

  return (
    <div className={ styles.ModelShow }>
      <ModelForm readOnly={ !editMode } rows={ props.rows } data={ props.record } onChange={ onChange } />
      <hr />
      { editMode ? editModeToolbars : viewModeToolbar }
    </div>
  )
}

ModelShow.propTypes = {
  rows: PropTypes.array.isRequired,
  record: PropTypes.object,
  onQuery: PropTypes.func.isRequired,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func
}

ModelShow.defaultProps = {
  onUpdate: () => {},
  onDelete: () => {}
}

export default withRouter(ModelShow)
