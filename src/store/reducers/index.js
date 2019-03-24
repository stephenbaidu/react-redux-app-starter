import { combineReducers } from 'redux'

import authReducer from './auth'
import shopReducer from './shop'
import customerReducer from './customer'

const rootReducer = combineReducers({
  auth: authReducer,
  shop: shopReducer,
  customer: customerReducer,
})

export default rootReducer
