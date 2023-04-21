import { requestBuilder } from '@/lib/axios'
import { GenerateQuizResponse } from './quizApi.types'

const { VITE_QUIZ_API_END_POINT } = import.meta.env

const quizApiRequest = requestBuilder({
  baseURL: VITE_QUIZ_API_END_POINT,
  timeout: 3000,
  headers: { 'Content-Type': 'application/json' },
})

export const generateQuiz = async () => {
  try {
    const response = await quizApiRequest.get('', {
      params: { amount: 10, type: 'multiple' },
    })

    if (response.data && response.data.response_code !== 0) {
      throw new Error('data is nothing. Probably url is wrong.')
    }

    return response.data as GenerateQuizResponse
  } catch (error) {
    throw new Error('fetch error')
  }
}
