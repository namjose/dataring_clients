import {
  SIGN_IN_SUCCESFULL,
  SIGN_IN_REJECTED,
  SIGN_OUT
} from '../constants/actionTypes'
import { defaultUser } from '../constants/mockupData'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = { loggedIn: false, user: null }
// ? { loggedIn: true, user: defaultUser }
// : { loggedIn: false, user: null }

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESFULL: {
      // localStorage.setItem('user', JSON.stringify(action.payload.user))
      return { ...state, loggedIn: true, user: action.payload.user }
    }
    case SIGN_IN_REJECTED: {
      // localStorage.removeItem('user')
      return { ...state, loggedIn: false, user: null }
    }

    case SIGN_OUT: {
      return initialState
    }

    default:
      return state
  }
}

export default authReducer
