import { all } from 'redux-saga/effects';

import authSagas from './auth'
import shopSagas from './shop'
import customerSagas from './customer'

export default function* rootSaga() {
  yield all([
    ...authSagas,
    ...shopSagas,
    ...customerSagas,
  ])
}
