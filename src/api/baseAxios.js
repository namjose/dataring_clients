import axios from 'axios'

export const BASE_URL = 'http://localhost:8080'

const baseAxios = axios.create({
  baseURL: BASE_URL
})

export default baseAxios
