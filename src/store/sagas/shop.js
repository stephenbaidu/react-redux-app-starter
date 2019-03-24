import {
  call,
  put,
  takeEvery,
  takeLatest
} from 'redux-saga/effects'

import * as actionTypes from '../actions/actionTypes'
import Api from '../../utils/api'

function* createShop(action) {
  try {
    const response = yield call(Api.createShop, action.payload)
    if (response && response.data) {
      yield put({ type: actionTypes.SHOP_ADD_SUCCESS, payload: response.data })
    } else {
      yield put({ type: actionTypes.SHOP_ADD_FAIL, error: 'Unknown' })
    }
  } catch (e) {
    yield put({ type: actionTypes.SHOP_ADD_FAIL, error: e.message })
  }
}

function* loadShops(_action) {
  try {
    const response = yield call(Api.loadShops)
    if (response && response.data) {
      yield put({ type: actionTypes.SHOPS_LOAD_SUCCESS, payload: response.data })
    } else {
      yield put({ type: actionTypes.SHOPS_LOAD_FAIL, error: 'Unknown' })
    }
  } catch (e) {
    yield put({ type: actionTypes.SHOPS_LOAD_FAIL, error: e.message })
  }
}

function* loadShop(action) {
  try {
    const response = yield call(Api.loadShop, action.payload)
    if (response && response.data) {
      yield put({ type: actionTypes.CURRENT_SHOP_SUCCESS, payload: response.data })
    } else {
      yield put({ type: actionTypes.CURRENT_SHOP_FAIL, error: 'Unknown' })
    }
  } catch (e) {
    yield put({ type: actionTypes.CURRENT_SHOP_FAIL, error: e.message })
  }
}

const sagas = [
  takeLatest(actionTypes.SHOPS_LOAD_REQUESTED, loadShops),
  takeEvery(actionTypes.CURRENT_SHOP_REQUESTED, loadShop),
  takeEvery(actionTypes.SHOP_ADD_REQUESTED, createShop)
]

export default sagas