import {
  FETCH_SAMPLE_VECTOR,
  FETCH_SAMPLE_VECTOR_SUCCEEDED,
  FETCH_SAMPLE_VECTOR_FAILED
} from '../constants/actionTypes'

const intialState = {
  sampleVector: [],
  loading: false
}

const sampleVectorReducer = (state = intialState, action) => {
  switch (action.type) {
    case FETCH_SAMPLE_VECTOR: {
      return { ...state, loading: true }
    }

    case FETCH_SAMPLE_VECTOR_SUCCEEDED: {
      const { data } = action.payload
      return { ...state, sampleVector: data, loading: false }
    }

    case FETCH_SAMPLE_VECTOR_FAILED: {
      return intialState
    }

    default: {
      return state
    }
  }
}

export default sampleVectorReducer
