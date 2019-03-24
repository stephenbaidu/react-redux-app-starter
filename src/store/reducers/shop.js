import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
  currentShop: null,
  shops: null,
  error: null,
  loading: false
}

const shopAddRequested = (state, _action) => {
  return updateObject(state, { error: null, loading: true })
}

const shopAddSuccess = (state, action) => {
  return updateObject(state, {
    shops: [action.payload, ...state.shop.shops],
    error: null,
    loading: false
  })
}

const shopAddFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}

const shopsLoadSuccess = (state, action) => {
  return updateObject(state, {
    shops: action.payload,
    error: null,
    loading: false
  })
}

const shopsLoadFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}

const currentShopSuccess = (state, action) => {
  return updateObject(state, {
    currentShop: action.payload,
    error: null,
    loading: false
  })
}

const currentShopFail = (state, action) => {
  return updateObject(state, {
    currentShop: { name: 'Invalid Shop' },
    error: action.error,
    loading: false
  })
}

const reducer = (state = initialState, action) => {
  switch ( action.type ) {
    case actionTypes.SHOP_ADD_REQUESTED: return shopAddRequested(state, action)
    case actionTypes.SHOP_ADD_SUCCESS: return shopAddSuccess(state, action)
    case actionTypes.SHOP_ADD_FAIL: return shopAddFail(state, action)
    case actionTypes.SHOPS_LOAD_SUCCESS: return shopsLoadSuccess(state, action)
    case actionTypes.SHOPS_LOAD_FAIL: return shopsLoadFail(state, action)
    case actionTypes.CURRENT_SHOP_SUCCESS: return currentShopSuccess(state, action)
    case actionTypes.CURRENT_SHOP_FAIL: return currentShopFail(state, action)
    default:
      return state;
  }
}

export default reducer
