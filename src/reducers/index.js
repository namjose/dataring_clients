import { combineReducers } from 'redux'
import authReducer from './authReducer'
import projectReducer from './projectReducer'
import sampleVectorReducer from './sampleVectorReducer'
import metaReducer from './metaReducer'

export default combineReducers({
  auth: authReducer,
  projectReducer,
  sampleVectorReducer,
  metaReducer
})
