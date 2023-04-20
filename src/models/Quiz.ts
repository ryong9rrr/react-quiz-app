import { QuizResponseType, GenerateQuizResponse } from '@/apis/quizApi'
import { decodeString } from '@/lib/utils'

export type Quiz = QuizResponseType & {
  number: number
}

export const makeQuizModel = (quiz: QuizResponseType, number: number): Quiz => {
  const question = decodeString(quiz.question)
  const correct_answer = decodeString(quiz.correct_answer)
  const incorrect_answers = quiz.incorrect_answers.map((incorrectAnswer) =>
    decodeString(incorrectAnswer),
  ) as [string, string, string]

  return { ...quiz, number, question, correct_answer, incorrect_answers }
}

export const makeQuizListModel = (quizResponse: GenerateQuizResponse) => {
  return quizResponse.results.map((quiz, index) => makeQuizModel(quiz, index + 1))
}

export type SolvedQuiz = Quiz & {
  selectedAnswerByUser: string
  isCorrect: boolean
}

export const makeSolvedQuizModel = (solvedQuiz: Quiz, selectedAnswerByUser: string) => {
  const isCorrect = solvedQuiz.correct_answer === selectedAnswerByUser
  return { ...solvedQuiz, isCorrect, selectedAnswerByUser }
}
