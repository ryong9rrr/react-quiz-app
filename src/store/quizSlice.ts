import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '.'
import { Quiz, makeQuizData } from '@/models/Quiz'
import * as QuizApi from '@/apis/quizApi'

export interface QuizState {
  status: 'idle' | 'loading' | 'error'
  quizList: Quiz[]
  currentQuiz: Quiz | null
}

const initialState: QuizState = {
  status: 'idle',
  quizList: [],
  currentQuiz: null,
}

export const generateQuiz = createAsyncThunk('GENERATE_QUIZ', async (_, { rejectWithValue }) => {
  try {
    const res = await QuizApi.generateQuiz()
    return res.results.map((quiz, index) => makeQuizData(quiz, index + 1))
  } catch (e) {
    return rejectWithValue('퀴즈를 불러오는데 실패했어요.')
  }
})

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    initialize: () => {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder.addCase(generateQuiz.pending, (state) => {
      state.status = 'loading'
    })

    builder.addCase(generateQuiz.fulfilled, (state, action) => {
      state.status = 'idle'
      state.quizList = action.payload
      state.currentQuiz = state.quizList[0]
    })

    builder.addCase(generateQuiz.rejected, (state) => {
      state.status = 'error'
    })
  },
})

export const useQuizDispatch: () => AppDispatch = useDispatch
export const useQuizSelector = () => useSelector((state: RootState) => state.quiz)

export const quizReducer = quizSlice.reducer

export const { initialize } = quizSlice.actions
