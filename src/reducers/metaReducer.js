import {
  FETCH_META,
  FETCH_META_SUCCEEDED,
  FETCH_META_FAILED
} from '../constants/actionTypes'

const intialState = {
  id: null,
  loading: false
}

const metaReducer = (state = intialState, action) => {
  switch (action.type) {
    case FETCH_META: {
      return { ...state, loading: true }
    }

    case FETCH_META_SUCCEEDED: {
      const { data } = action.payload
      return { ...state, ...data, loading: false }
    }

    case FETCH_META_FAILED: {
      return { ...state, loading: false }
    }

    default: {
      return state
    }
  }
}

export default metaReducer
