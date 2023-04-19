import { v4 as uuidv4 } from 'uuid'
import { decodeString } from '@/lib/utils'

export type QuizResponseType = {
  category: string
  type: 'multiple'
  difficulty: 'easy' | 'medium' | 'hard'
  question: string
  correct_answer: string
  incorrect_answers: [string, string, string]
}

export type Quiz = {
  number: number
  category: string
  type: 'multiple'
  difficulty: 'easy' | 'medium' | 'hard'
  question: string
  correctAnswer: string
  incorrectAnswers: [string, string, string]
}

export const makeQuizData = (quiz: QuizResponseType, number: number): Quiz => {
  const question = decodeString(quiz.question)
  const correctAnswer = decodeString(quiz.correct_answer)
  const incorrectAnswers = quiz.incorrect_answers.map((incorrectAnswer) =>
    decodeString(incorrectAnswer),
  ) as [string, string, string]

  return { ...quiz, number, question, correctAnswer, incorrectAnswers }
}
