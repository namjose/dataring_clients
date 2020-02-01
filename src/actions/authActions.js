import { SIGN_IN_SUCCESFULL, SIGN_IN_REJECTED } from '../constants/actionTypes'

export const signInSuccesful = userAuth => {
  return { type: SIGN_IN_SUCCESFULL, payload: { user: userAuth } }
}

export const signInRejected = () => {
  return { type: SIGN_IN_REJECTED }
}
