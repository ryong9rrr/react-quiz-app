import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '..'
import { Quiz } from './types'
import { ServedQuiz } from '@/apis/quiz'
import { decodeString } from '@/_lib/utils'

export interface QuizState {
  quizList: Quiz[]
  currentQuiz: Quiz | null
  solvedQuizList: Quiz[]
}

const initialState: QuizState = {
  quizList: [],
  currentQuiz: null,
  solvedQuizList: [],
}

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    initialize: () => {
      return initialState
    },
    startQuiz: (
      state,
      action: PayloadAction<{
        servedQuizList: ServedQuiz[]
      }>,
    ) => {
      const { servedQuizList } = action.payload
      const quizList: Quiz[] = servedQuizList.map((quiz, index) => ({
        ...quiz,
        number: index + 1,
        selectedAnswerByUser: '',
        question: decodeString(quiz.question),
        correct_answers: decodeString(quiz.correct_answer),
        incorrect_answers: quiz.incorrect_answers.map((incorrectAnswer) =>
          decodeString(incorrectAnswer),
        ) as [string, string, string],
      }))
      return { ...state, quizList, currentQuiz: quizList[0] }
    },
    // 1. 예외처리) 현재 퀴즈나 퀴즈데이터가 없다면 에러를 반환한다.
    // 2. 예외처리) 현재 풀고 있는 퀴즈의 번호가 퀴즈리스트의 길이보다 크다면 퀴즈를 다 푼 것이다.
    // 3. 유저가 선택한 답변을 인자로 받아서, solvedResult에 저장한다. 그리고 currentQuiz를 다음 퀴즈로 이동시킨다.
    solveQuiz: (
      state,
      action: PayloadAction<{
        selectedAnswerByUser: string
      }>,
    ) => {
      const { selectedAnswerByUser } = action.payload

      if (state.quizList.length === 0 || state.currentQuiz === null) {
        throw new Error('불러온 퀴즈가 없거나 풀고 있는 퀴즈가 없어서 액션을 실행할 수 없습니다.')
      }

      if (state.solvedQuizList.length >= state.quizList.length) {
        throw new Error('퀴즈를 모두 풀어서 액션을 실행할 수 없습니다.')
      }
      const currentQuiz = { ...state.currentQuiz }
      currentQuiz.selectedAnswerByUser = selectedAnswerByUser
      const solvedQuizList = [...state.solvedQuizList]
      solvedQuizList.push(currentQuiz)
      const nextQuiz = state.quizList.find((quiz) => quiz.number === currentQuiz.number + 1)
      if (!nextQuiz) {
        return { ...state, currentQuiz: null, solvedQuizList }
      }
      return {
        ...state,
        currentQuiz: nextQuiz,
        solvedQuizList,
      }
    },
  },
})

export const useQuizDispatch: () => AppDispatch = useDispatch
export const useQuizSelector = () => useSelector((state: RootState) => state.quiz)

export const quizReducer = quizSlice.reducer
export const QuizActions = quizSlice.actions
