import baseAxios from './baseAxios'

export default {
  getSampleVectorById: (id, limit = 0, offset = 0) =>
    baseAxios.get(`/sampleVector/${id}?limit=${limit}&offset=${0}`),
  makeSampleVectorByMeta: metaDataId =>
    baseAxios.post(`/sampleVector/add/${metaDataId}`)
}
