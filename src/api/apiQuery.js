import baseAxios from './baseAxios'

export default {
  addQuery: data =>
    baseAxios.post('/query/add', {
      ...data
    }),
  getQueriesByUsers: (creatorId = '', receiverId = '', projectId = '') =>
    baseAxios.get(
      `query/users?projectId=${projectId}&creatorId=${creatorId}&receiverId=${receiverId}`
    ),
  getQueriesByPair: (userId = '', projectId = '') =>
    baseAxios.get(`query?userId=${userId}&projectId=${projectId}`),

  getQueryDetailById: queryId => baseAxios.get(`/query/${queryId}`),
  uploadAnswer: (queryId, data) =>
    baseAxios.put(`query/${queryId}`, {
      ...data
    }),
  makeVector: queryId => baseAxios.post(`query/vector/add?queryId=${queryId}`),
  reProcessAnswer: queryId => baseAxios.put(`query/updateAnswer/${queryId}`)
}
