import { fork, all } from 'redux-saga/effects'
import { watchFetchProject } from './projectSagas'
import { watchFetchSampleVector } from './sampleVectorSagas'
import { watchFetchMeta } from './metaSagas'

export default function* rootSaga() {
  // yield fork(watchFetchProject)
  yield all([watchFetchProject(), watchFetchSampleVector(), watchFetchMeta()])
}
