import axios, { CreateAxiosDefaults } from 'axios'

const requestBuilder = (config?: CreateAxiosDefaults | undefined) => {
  return axios.create({ ...config })
}

const { VITE_QUIZ_API_END_POINT } = import.meta.env

export const request = requestBuilder({
  baseURL: VITE_QUIZ_API_END_POINT,
  timeout: 3000,
  headers: { 'Content-Type': 'application/json' },
})
