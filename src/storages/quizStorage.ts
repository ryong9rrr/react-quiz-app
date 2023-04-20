import { QuizState } from '@/store/quizSlice'

export const getData = () => {
  const data = window.sessionStorage.getItem('react-quiz-app')
  return data ? (JSON.parse(data) as QuizState) : null
}

export const setData = (quizState: QuizState) => {
  window.sessionStorage.setItem('react-quiz-app', JSON.stringify(quizState))
}
