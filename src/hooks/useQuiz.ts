import { useQuizSelector } from '@/store/quizSlice'

export default function useQuiz() {
  const quizState = useQuizSelector()

  const { quizList, currentQuiz, solvedQuizList } = quizState

  const isClear = quizList.length !== 0 && !currentQuiz && quizList.length === solvedQuizList.length

  const isSolving = quizList.length !== 0 && currentQuiz && !isClear

  const progressBarPercent = !currentQuiz
    ? 0
    : Math.round((currentQuiz.number / quizList.length) * 100)

  const currentQuizNumber = currentQuiz ? currentQuiz.number : -1

  const quizListLength = quizList.length

  const isNotStart = quizList.length === 0

  return {
    isClear,
    isSolving,
    progressBarPercent,
    currentQuizNumber,
    quizListLength,
    currentQuiz,
    isNotStart,
  }
}
