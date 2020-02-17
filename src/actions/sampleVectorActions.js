import { FETCH_SAMPLE_VECTOR } from '../constants/actionTypes'

export const fetchSampleVectorActions = (id, limit = 0, offset = 0) => ({
  type: FETCH_SAMPLE_VECTOR,
  payload: { id, limit, offset }
})
