import { decodeString } from '@/_lib/utils'
import { GenerateQuizResponse, QuizResponseType } from '@/apis/quiz'

export type Quiz = QuizResponseType & {
  number: number
}

export type SolvedQuiz = Quiz & {
  selectedAnswerByUser: string
  isCorrect: boolean
}

const toQuiz = (quiz: QuizResponseType, number: number): Quiz => {
  const question = decodeString(quiz.question)
  const correct_answer = decodeString(quiz.correct_answer)
  const incorrect_answers = quiz.incorrect_answers.map((incorrectAnswer) =>
    decodeString(incorrectAnswer),
  ) as [string, string, string]

  return { ...quiz, number, question, correct_answer, incorrect_answers }
}

const toQuizList = (quizResponse: GenerateQuizResponse): Quiz[] => {
  return quizResponse.results.map((quiz, index) => toQuiz(quiz, index + 1))
}

const toSolvedQuiz = (solvedQuiz: Quiz, selectedAnswerByUser: string): SolvedQuiz => {
  const isCorrect = solvedQuiz.correct_answer === selectedAnswerByUser
  return { ...solvedQuiz, isCorrect, selectedAnswerByUser }
}

export const modelBuilder = {
  toQuiz,
  toQuizList,
  toSolvedQuiz,
}
