import baseAxios from './baseAxios'

export default {
  getTestFuncByUsers: (creatorId = '', receiverId = '', projectId = '') =>
    baseAxios.get(
      `testFunction/users?projectId=${projectId}&creatorId=${creatorId}&receiverId=${receiverId}`
    ),
  getTestFuncByPair: (userId = '', projectId = '') =>
    baseAxios.get(`testFunction?userId=${userId}&projectId=${projectId}`),
  getTestFuncByQueryId: queryId =>
    baseAxios.get(`testFunction/query/${queryId}`),
  verifyByTestId: testId =>
    baseAxios.post(`testFunction/verify?testFuncId=${testId}`),
  makeVector: testId =>
    baseAxios.post(`testFunction/vector/add?testFuncId=${testId}`),
  createTestFunction: data =>
    baseAxios.post('testFunction/add', {
      ...data
    })
}
