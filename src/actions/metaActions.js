import { FETCH_META } from '../constants/actionTypes'

export const fetchMetaAction = (userId, projectId) => ({
  type: FETCH_META,
  payload: { userId, projectId }
})
