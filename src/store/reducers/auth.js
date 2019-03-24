import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
  signedIn: false,
  csrf: null,
  user: null,
  error: null,
  loading: false
}

const loginStart = (state, _action) => {
  return updateObject(state, { error: null, loading: true } )
}

const loginSuccess = (state, action) => {
  localStorage.setItem('csrf', action.payload.csrf)
  localStorage.setItem('signedIn', true)
  return updateObject(state, {
    signedIn: true,
    csrf: action.payload.csrf,
    user: action.payload.user,
    error: null,
    loading: false
  })
}

const loginFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}

const logoutStart = (state, _action) => {
  localStorage.removeItem('csrf')
  return updateObject(state, { error: null, loading: true } )
}

const logoutSuccess = (state, _action) => {
  return updateObject(state, {
    signedIn: false,
    csrf: null,
    user: {},
    error: null,
    loading: false
  })
}

const logoutFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}

const reloadUserSuccess = (state, action) => {
  return updateObject(state, {
    user: action.payload
  })
}

const reducer = (state = initialState, action) => {
  switch ( action.type ) {
    case actionTypes.LOGIN_START: return loginStart(state, action)
    case actionTypes.LOGIN_SUCCESS: return loginSuccess(state, action)
    case actionTypes.LOGIN_FAIL: return loginFail(state, action)
    case actionTypes.LOGOUT_START: return logoutStart(state, action)
    case actionTypes.LOGOUT_SUCCESS: return logoutSuccess(state, action)
    case actionTypes.LOGOUT_FAIL: return logoutFail(state, action)
    case actionTypes.RELOAD_USER_SUCCESS: return reloadUserSuccess(state, action)
    default:
      return state;
  }
}

export default reducer
