import {
  call,
  put,
  takeEvery,
  takeLatest
} from 'redux-saga/effects'

import * as actionTypes from '../actions/actionTypes'
import Api from '../../utils/api'

function* loginUser(action) {
  try {
    const response = yield call(Api.signin, action.payload)
    if (response && response.data.csrf) {
      yield put({ type: actionTypes.LOGIN_SUCCESS, payload: response.data })
    } else {
      yield put({ type: actionTypes.LOGIN_FAIL, error: 'Unknown' })
    }
  } catch (e) {
    yield put({ type: actionTypes.LOGIN_FAIL, error: e.message })
  }
}

function* logoutUser(_action) {
  try {
    const response = yield call(Api.signout)
    if (response && response.data.csrf) {
      yield put({ type: actionTypes.LOGOUT_SUCCESS }) } else {
      yield put({ type: actionTypes.LOGOUT_FAIL, error: 'Unknown' })
    }
  } catch (e) {
    yield put({ type: actionTypes.LOGOUT_FAIL, error: e.message })
  }
}

function* reloadUser(_action) {
  try {
    const response = yield call(Api.loadUser)
    if (response && response.data) {
      yield put({ type: actionTypes.RELOAD_USER_SUCCESS, payload: response.data })
    } else {
      yield put({ type: actionTypes.LOGIN_FAIL, error: 'Unknown' })
    }
  } catch (e) {
    yield put({ type: actionTypes.LOGIN_FAIL, error: e.message })
  }
}

const sagas = [
  takeEvery(actionTypes.LOGIN_START, loginUser),
  takeEvery(actionTypes.LOGOUT_START, logoutUser),
  takeLatest(actionTypes.RELOAD_USER, reloadUser)
]

export default sagas