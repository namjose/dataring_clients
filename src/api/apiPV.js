import baseAxios from './baseAxios'

export default {
  uploadPV: (metaId, data) =>
    baseAxios.post(`/partialView/upload?metaDataId=${metaId}`, {
      data
    }),

  verifyPVByMeta: metaId =>
    baseAxios.post(`partialView/verify?metaDataId=${metaId}`)
}
