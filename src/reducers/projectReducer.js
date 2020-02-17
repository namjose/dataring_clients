import {
  FETCH_PROJECT_SUCCEEDED,
  FETCH_PROJECT_FAILED,
  FETCH_PROJECT
} from '../constants/actionTypes'

const intialState = {
  projects: [],
  loading: false,
  error: ''
}

const projectReducer = (state = intialState, action) => {
  switch (action.type) {
    case FETCH_PROJECT: {
      return { ...state, loading: true }
    }
    case FETCH_PROJECT_SUCCEEDED: {
      const { projects } = action.payload
      return { ...state, projects, loading: false }
    }

    case FETCH_PROJECT_FAILED: {
      console.log('failed')
      return intialState
    }

    default: {
      return state
    }
  }
}
export default projectReducer
