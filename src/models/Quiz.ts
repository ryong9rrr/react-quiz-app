import { decodeString } from '@/lib/utils'
import * as QuizApi from '@/apis/quizApi'

export type QuizResponseType = {
  category: string
  type: 'multiple'
  difficulty: 'easy' | 'medium' | 'hard'
  question: string
  correct_answer: string
  incorrect_answers: [string, string, string]
}

export type Quiz = QuizResponseType & {
  number: number
}

export const makeQuizData = (quiz: QuizResponseType, number: number): Quiz => {
  const question = decodeString(quiz.question)
  const correct_answer = decodeString(quiz.correct_answer)
  const incorrect_answers = quiz.incorrect_answers.map((incorrectAnswer) =>
    decodeString(incorrectAnswer),
  ) as [string, string, string]

  return { ...quiz, number, question, correct_answer, incorrect_answers }
}

export type SolvedQuiz = Quiz & {
  selectedAnswerByUser: string
  isCorrect: boolean
}

export const makeSolvedQuizData = (solvedQuiz: Quiz, selectedAnswerByUser: string) => {
  const isCorrect = solvedQuiz.correct_answer === selectedAnswerByUser
  return { ...solvedQuiz, isCorrect, selectedAnswerByUser }
}

export const makeQuizList = (res: QuizApi.GenerateQuizResponse) => {
  return res.results.map((quiz, index) => makeQuizData(quiz, index + 1))
}
