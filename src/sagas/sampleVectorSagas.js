import apiSampleVector from '../api/apiSampleVector'
import { put, takeLatest } from 'redux-saga/effects'
import {
  FETCH_SAMPLE_VECTOR_FAILED,
  FETCH_SAMPLE_VECTOR
} from '../constants/actionTypes'

function* fetchSampleVector(action) {
  try {
    const { id, limit, offset } = action.payload
    const { data } = yield apiSampleVector(id, limit, offset)
    console.log({ data })
  } catch (e) {
    console.log({ e })
    put({ type: FETCH_SAMPLE_VECTOR_FAILED })
  }
}

export function* watchFetchSampleVector() {
  yield takeLatest(FETCH_SAMPLE_VECTOR, fetchSampleVector)
}
