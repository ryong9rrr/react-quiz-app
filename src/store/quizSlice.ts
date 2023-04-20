import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '.'
import { Quiz, SolvedQuiz, makeQuizData, makeSolvedQuizData } from '@/models/Quiz'
import * as QuizApi from '@/apis/quizApi'
import { setData } from '@/storages/quizStorage'

type Status = 'idle' | 'loading' | 'complete' | 'error'

export interface QuizState {
  status: Status
  quizList: Quiz[]
  currentQuiz: Quiz | null
  solvedQuizList: SolvedQuiz[]
}

const initialState: QuizState = {
  status: 'idle',
  quizList: [],
  currentQuiz: null,
  solvedQuizList: [],
}

export const makeQuizList = (res: QuizApi.GenerateQuizResponse) => {
  return res.results.map((quiz, index) => makeQuizData(quiz, index + 1))
}

export const generateQuiz = createAsyncThunk('GENERATE_QUIZ', async (_, { rejectWithValue }) => {
  try {
    const res = await QuizApi.generateQuiz()
    return res
  } catch (e) {
    return rejectWithValue('퀴즈를 불러오는데 실패했어요.')
  }
})

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<Status>) => {
      return { ...state, status: action.payload }
    },
    // 1. 로컬스토리지에 저장된 데이터가 있다면 불러온다.
    // 2. 없다면 초기값을 불러온다.
    preFetch: (state, action: PayloadAction<QuizState | null>) => {
      if (action.payload) {
        return action.payload
      }
      return initialState
    },
    initialize: () => {
      return initialState
    },
    // 1. 예외처리) 현재 퀴즈나 퀴즈데이터가 없다면 에러를 반환한다.
    // 2. 예외처리) 현재 풀고 있는 퀴즈의 번호가 퀴즈리스트의 길이보다 크다면 퀴즈를 다 푼 것이다.
    // 3. 유저가 선택한 답변을 인자로 받아서, solvedResult에 저장한다. 그리고 currentQuiz를 다음 퀴즈로 이동시킨다.
    solveQuiz: (state, action: PayloadAction<string>) => {
      if (state.quizList.length === 0 || state.currentQuiz === null) {
        throw new Error('불러온 퀴즈가 없거나 풀고 있는 퀴즈가 없어서 액션을 실행할 수 없습니다..')
      }

      if (state.currentQuiz.number > state.quizList.length) {
        throw new Error('퀴즈를 모두 풀어서 액션을 실행할 수 없습니다.')
      }

      const nextQuizNumber = state.currentQuiz.number + 1
      const nextQuiz = state.quizList.find((quiz) => quiz.number === nextQuizNumber)

      const solvedQuizList = [
        ...state.solvedQuizList,
        makeSolvedQuizData(state.currentQuiz, action.payload),
      ]

      if (!nextQuiz) {
        setData({ ...state, status: 'idle', currentQuiz: null, solvedQuizList })
        return { ...state, status: 'idle', currentQuiz: null, solvedQuizList }
      }

      setData({
        ...state,
        status: 'idle',
        currentQuiz: nextQuiz,
        solvedQuizList,
      })

      return {
        ...state,
        status: 'idle',
        currentQuiz: nextQuiz,
        solvedQuizList,
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(generateQuiz.pending, (state) => {
      return { ...state, status: 'loading' }
    })

    builder.addCase(generateQuiz.fulfilled, (state, action) => {
      const quizList = makeQuizList(action.payload)
      setData({ ...state, status: 'idle', quizList, currentQuiz: quizList[0] })
      return { ...state, status: 'complete', quizList, currentQuiz: quizList[0] }
    })

    builder.addCase(generateQuiz.rejected, (state) => {
      return { ...state, status: 'error' }
    })
  },
})

export const useQuizDispatch: () => AppDispatch = useDispatch
export const useQuizSelector = () => useSelector((state: RootState) => state.quiz)

export const quizReducer = quizSlice.reducer
export const QuizActions = quizSlice.actions
