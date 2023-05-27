import axios, { CreateAxiosDefaults } from 'axios'

const requestBuilder = (config?: CreateAxiosDefaults | undefined) => {
  return axios.create({ ...config })
}
const { VITE_QUIZ_API_END_POINT, VITE_MODE } = import.meta.env
const baseURL = VITE_MODE === 'dev' ? '' : VITE_QUIZ_API_END_POINT

export const request = requestBuilder({
  baseURL,
  timeout: 3000,
  headers: { 'Content-Type': 'application/json' },
})
