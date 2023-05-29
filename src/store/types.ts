import { ServedQuiz } from '@/apis/quiz'

export interface Quiz extends ServedQuiz {
  number: number
  selectedAnswerByUser: string
}
