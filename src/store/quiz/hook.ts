import { useQuizSelector } from './slice'

export default function useQuiz() {
  const { quizList, currentQuiz, solvedQuizList } = useQuizSelector()

  const isClear = quizList.length !== 0 && !currentQuiz && quizList.length === solvedQuizList.length

  const isSolving = quizList.length !== 0 && currentQuiz && !isClear

  const progressBarPercent = !currentQuiz
    ? 0
    : Math.round((currentQuiz.number / quizList.length) * 100)

  const currentQuizNumber = currentQuiz ? currentQuiz.number : -1

  const quizListLength = quizList.length

  const isNotStart = quizList.length === 0

  const correctCount = solvedQuizList.filter(
    (quiz) => quiz.correct_answer === quiz.selectedAnswerByUser,
  ).length
  const inCorrectCount = solvedQuizList.length - correctCount

  return {
    quizList,
    currentQuiz,
    solvedQuizList,

    isClear,
    isSolving,
    progressBarPercent,
    currentQuizNumber,
    quizListLength,
    isNotStart,
    correctCount,
    inCorrectCount,
  }
}
