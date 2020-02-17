import baseAxios, { BASE_URL } from './baseAxios'

export default {
  getCollaborators: userId => baseAxios.get(`/user/collaborators/${userId}`)
}
