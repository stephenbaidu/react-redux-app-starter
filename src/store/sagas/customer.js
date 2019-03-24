import {
  call,
  put,
  takeEvery,
  takeLatest
} from 'redux-saga/effects'

import * as actionTypes from '../actions/actionTypes'
import Api from '../../utils/api'

function* getCustomers(_action) {
  try {
    const response = yield call(Api.getCustomers)
    if (response && response.data) {
      yield put({ type: actionTypes.CUSTOMERS_GET_SUCCESS, payload: response.data })
    } else {
      yield put({ type: actionTypes.CUSTOMERS_GET_FAIL, error: 'Unknown' })
    }
  } catch (e) {
    yield put({ type: actionTypes.CUSTOMERS_GET_FAIL, error: e.message })
  }
}

function* createCustomer(action) {
  try {
    const response = yield call(Api.createCustomer, action.payload)
    if (response && response.data) {
      yield put({ type: actionTypes.CUSTOMER_CREATE_SUCCESS, payload: response.data })
    } else {
      yield put({ type: actionTypes.CUSTOMER_CREATE_FAIL, error: 'Unknown' })
    }
  } catch (e) {
    yield put({ type: actionTypes.CUSTOMER_CREATE_FAIL, error: e.message })
  }
}

function* getCustomer(action) {
  try {
    const response = yield call(Api.getCustomer, action.payload)
    if (response && response.data) {
      yield put({ type: actionTypes.CUSTOMER_GET_SUCCESS, payload: response.data })
    } else {
      yield put({ type: actionTypes.CUSTOMER_GET_FAIL, error: 'Unknown' })
    }
  } catch (e) {
    yield put({ type: actionTypes.CUSTOMER_GET_FAIL, error: e.message })
  }
}

function* updateCustomer(action) {
  try {
    const response = yield call(Api.updateCustomer, action.payload)
    if (response && response.data) {
      yield put({ type: actionTypes.CUSTOMER_UPDATE_SUCCESS, payload: response.data })
    } else {
      yield put({ type: actionTypes.CUSTOMER_UPDATE_FAIL, error: 'Unknown' })
    }
  } catch (e) {
    yield put({ type: actionTypes.CUSTOMER_UPDATE_FAIL, error: e.message })
  }
}

function* deleteCustomer(action) {
  try {
    const response = yield call(Api.deleteCustomer, action.payload)
    if (response && response.data) {
      yield put({ type: actionTypes.CUSTOMER_DELETE_SUCCESS, payload: response.data })
    } else {
      yield put({ type: actionTypes.CUSTOMER_DELETE_FAIL, error: 'Unknown' })
    }
  } catch (e) {
    yield put({ type: actionTypes.CUSTOMER_DELETE_FAIL, error: e.message })
  }
}

const sagas = [
  takeLatest(actionTypes.CUSTOMERS_GET_REQUESTED, getCustomers),
  takeEvery(actionTypes.CUSTOMER_GET_REQUESTED, getCustomer),
  takeEvery(actionTypes.CUSTOMER_CREATE_REQUESTED, createCustomer),
  takeEvery(actionTypes.CUSTOMER_UPDATE_REQUESTED, updateCustomer),
  takeEvery(actionTypes.CUSTOMER_DELETE_REQUESTED, deleteCustomer)
]

export default sagas