import React from 'react'
import { connect } from 'react-redux'

import Model from '../components/Model/Model'
import * as actionTypes from '../store/actions/actionTypes'

const Customers = props => {
  const fields = [
    { key: 'id', type: 'number', label: 'ID', hideInTable: true, hideInForm: true },
    { key: 'name', type: 'string', label: 'Name' },
    { key: 'email', type: 'string', label: 'Email' },
    { key: 'phone_no', type: 'string', label: 'Phone No' }
  ]

  const onQuery = (queryObject) => props.getCustomers(queryObject)
  const onQueryOne = id => props.getCustomer(id)
  const onCreate = data => props.createCustomer(data)
  const onUpdate = data => props.updateCustomer(data)
  const onDelete = id => props.deleteCustomer(id)

  return (
    <Model
      title='Customers'
      parentPath={ props.match.url }
      fields={ fields }
      records={ props.customers }
      currentRecord={ props.currentCustomer }
      onQuery={ onQuery }
      onQueryOne={ onQueryOne }
      onCreate={ onCreate }
      onUpdate={ onUpdate }
      onDelete={ onDelete } />
  )
}

const mapStateToProps = state => {
  return {
    customers: state.customer.customers,
    currentCustomer: state.customer.currentCustomer,
    error: state.customer.error,
    loading: state.customer.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCustomers: () => dispatch({ type: actionTypes.CUSTOMERS_GET_REQUESTED }),
    createCustomer: (data) => dispatch({ type: actionTypes.CUSTOMER_CREATE_REQUESTED, payload: data }),
    getCustomer: (id) => dispatch({ type: actionTypes.CUSTOMER_GET_REQUESTED, payload: id }),
    updateCustomer: (data) => dispatch({ type: actionTypes.CUSTOMER_UPDATE_REQUESTED, payload: data }),
    deleteCustomer: (id) => dispatch({ type: actionTypes.CUSTOMER_DELETE_REQUESTED, payload: id }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Customers)
