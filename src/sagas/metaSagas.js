import apiMeta from '../api/apiMeta'
import { put, takeLatest } from 'redux-saga/effects'
import {
  FETCH_META_FAILED,
  FETCH_META,
  FETCH_META_SUCCEEDED
} from '../constants/actionTypes'

function* fetchMeta(action) {
  try {
    const { userId, projectId } = action.payload
    const { data } = yield apiMeta.getMetaByIdPair(userId, projectId)
    const formatData = {
      ...data,
      id: data.stringId
    }

    delete formatData.stringId

    yield put({ type: FETCH_META_SUCCEEDED, payload: { data: formatData } })
  } catch (e) {
    console.log({ e })
    yield put({ type: FETCH_META_FAILED })
  }
}

export function* watchFetchMeta() {
  yield takeLatest(FETCH_META, fetchMeta)
}
