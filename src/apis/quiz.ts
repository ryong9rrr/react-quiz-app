import { request } from '@/apis'

export const generateQuiz = async (): Promise<{ results: ServedQuiz[] }> => {
  try {
    const response = await request.get('', {
      params: { amount: 10, type: 'multiple' },
    })

    if (response.data && response.data.response_code !== 0) {
      throw new Error('data is nothing. Probably url is wrong.')
    }

    return response.data
  } catch (error) {
    throw new Error('fetch error')
  }
}

export type ServedQuiz = {
  category: string
  type: 'multiple'
  difficulty: 'easy' | 'medium' | 'hard'
  question: string
  correct_answer: string
  incorrect_answers: [string, string, string]
}
