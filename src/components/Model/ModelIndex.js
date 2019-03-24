import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './Model.module.scss'
import { ObjectByString } from './Helpers'

const ModelIndex = props => {
  const fetchRecords = (queryParams = {}) => props.onQuery(queryParams)

  useEffect(() => {
    fetchRecords()
  }, [])
  
  const thsForTable = () => {
    if (props.collapsed) {
      return <th>{ props.columns[0].label }</th>
    } else {
      return props.columns.map((field, index) => (
        <th key={index}>{ field.label }</th>
      ))
    }
  }

  const getColumnValue = (record, field) => {
    const path = field.path || field.key
    return ObjectByString(record, path)
  }

  const tdsForRecord = (record) => {
    if (props.collapsed) {
      const value = getColumnValue(record, props.columns[0])
      return <td>{ value || "--" }</td>
    } else {
      return props.columns.map((field, index) => {
        const value = getColumnValue(record, field)
        return <td key={index}>{ value || "--" }</td>
      })
    }
  }
      
  const trsForRecords = () => {
    const trs = props.records.map((record, index) => (
      <tr key={index} onClick={() => props.onRowClicked(record) }>
        <th scope="row">{ index + 1 }</th>
        { tdsForRecord(record) }
        <td style={{textAlign: 'right', color: '#ccc'}}>
          <FontAwesomeIcon icon="chevron-right" />
        </td>
      </tr>
    ))
    return trs
  }
  
  return (
    <div className={ styles.ModelIndex }>
      <Table size="sm" striped hover responsive borderless bordered={ false }>
        <thead>
          <tr>
            <th>#</th>
            { thsForTable() }
            <th></th>
          </tr>
        </thead>
        <tbody>
          { trsForRecords() }
        </tbody>
      </Table>
    </div>
  )
}

ModelIndex.propTypes = {
  columns: PropTypes.array.isRequired,
  collapsed: PropTypes.bool,
  records: PropTypes.array.isRequired,
  onQuery: PropTypes.func.isRequired,
  onRowClicked: PropTypes.func
}

ModelIndex.defaultProps = {
  collapsed: false,
  onRowClicked: () => {}
}

export default ModelIndex
