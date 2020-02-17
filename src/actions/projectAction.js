import { FETCH_PROJECT } from '../constants/actionTypes'

export const fetchProjectAction = (userId, isAdmin = false) => {
  return { type: FETCH_PROJECT, userId, isAdmin }
}
