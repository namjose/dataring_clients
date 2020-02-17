import apiProject from '../api/apiProject'
import { put, takeEvery, takeLatest } from 'redux-saga/effects'
import {
  FETCH_PROJECT_SUCCEEDED,
  FETCH_PROJECT_FAILED,
  FETCH_PROJECT
} from '../constants/actionTypes'

function* fetchProject(action) {
  try {
    const { userId, isAdmin } = action
    const { data } = yield isAdmin
      ? apiProject.getProject()
      : apiProject.getProjectByUser(userId)
    const projects = data.map(item => {
      const {
        stringId,
        projectStatus,
        collaborators,
        desc,
        title,
        creatorId
      } = item
      return {
        ...(stringId && { id: stringId }),
        ...(projectStatus && { status: projectStatus }),
        ...(collaborators && { collaborators }),
        ...(desc && { desc }),
        title,
        creatorId
      }
    })

    yield put({ type: FETCH_PROJECT_SUCCEEDED, payload: { projects } })
  } catch (e) {
    yield put({ type: FETCH_PROJECT_FAILED })
  }
}

export function* watchFetchProject() {
  yield takeLatest(FETCH_PROJECT, fetchProject)
}
