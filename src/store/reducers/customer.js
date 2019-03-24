import * as actionTypes from '../actions/actionTypes'
import { updateObject, replaceObjectById, deleteObjectById } from '../utility'

const initialState = {
  customers: [],
  currentCustomer: {},
  error: null,
  loading: false,
  creating: false,
  updating: false,
  deleting: false
}

const customerActionRequested = (state, _action) => {
  return updateObject(state, { error: null, loading: true })
}

const customerActionFailed = (state, action) => {
  return updateObject(state, { error: action.error, loading: false })
}

const customersGetSuccess = (state, action) => {
  return updateObject(state, {
    customers: action.payload,
    error: null,
    loading: false
  })
}

const customerGetSuccess = (state, action) => {
  return updateObject(state, {
    currentCustomer: action.payload,
    error: null,
    loading: false
  })
}

const customerCreateSuccess = (state, action) => {
  console.log(action.payload)
  
  return updateObject(state, {
    customers: [action.payload, ...state.customers],
    error: null,
    loading: false
  })
}

const customerUpdateSuccess = (state, action) => {
  return updateObject(state, {
    customers: replaceObjectById(state.customers, action.payload),
    error: null,
    loading: false
  })
}

const customerDeleteSuccess = (state, action) => {
  return updateObject(state, {
    customers: deleteObjectById(state.customers, action.payload),
    error: null,
    loading: false
  })
}

const reducer = (state = initialState, action) => {
  switch ( action.type ) {
    case actionTypes.CUSTOMERS_GET_REQUESTED:
    case actionTypes.CUSTOMER_GET_REQUESTED:
    case actionTypes.CUSTOMER_CREATE_REQUESTED:
    case actionTypes.CUSTOMER_UPDATE_REQUESTED:
    case actionTypes.CUSTOMER_DELETE_REQUESTED:
      return customerActionRequested(state, action)
    case actionTypes.CUSTOMERS_GET_FAIL:
    case actionTypes.CUSTOMER_GET_FAIL:
    case actionTypes.CUSTOMER_CREATE_FAIL:
    case actionTypes.CUSTOMER_UPDATE_FAIL:
    case actionTypes.CUSTOMER_DELETE_FAIL:
      return customerActionFailed(state, action)
    case actionTypes.CUSTOMERS_GET_SUCCESS: return customersGetSuccess(state, action)
    case actionTypes.CUSTOMER_GET_SUCCESS: return customerGetSuccess(state, action)
    case actionTypes.CUSTOMER_CREATE_SUCCESS: return customerCreateSuccess(state, action)
    case actionTypes.CUSTOMER_UPDATE_SUCCESS: return customerUpdateSuccess(state, action)
    case actionTypes.CUSTOMER_DELETE_SUCCESS: return customerDeleteSuccess(state, action)
    default:
      return state;
  }
}

export default reducer
