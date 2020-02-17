import baseAxios, { BASE_URL } from './baseAxios'

export default {
  getProject: () => baseAxios.get('/project'),
  getProjectByUser: userId => baseAxios.get(`/project/user/${userId}`),
  getProjectById: id => baseAxios.get(`/project/${id}`)
}
