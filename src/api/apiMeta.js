import baseAxios from './baseAxios'

export default {
  getMetaByIdPair: (userId, projectId) =>
    baseAxios.get(`/metaData/detail?userId=${userId}&projectId=${projectId}`),

  getMultiMetaByIdPair: (userIdList, projectId) =>
    baseAxios.get(
      `/metaData/details?userIdList=${userIdList}&projectId=${projectId}`
    ),
  getMetaByProject: projectId =>
    baseAxios.get(`/metaData?projectId=${projectId}`)
}
