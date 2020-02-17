import baseAxios from './baseAxios'

export default {
  getRequestById: userId => baseAxios.get(`/projectRequest/user/${userId}`),
  acceptRequest: (requestId, data) =>
    baseAxios.put(`/projectRequest?requestId=${requestId}&status=true`, {
      ...data
    })
}
