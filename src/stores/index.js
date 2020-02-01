import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import rootReducer from '../reducers'

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
  rootReducer,
  applyMiddleware(logger, sagaMiddleware)
)
