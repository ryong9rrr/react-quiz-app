import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { Quiz, makeQuizData } from '@/models/Quiz'
import { quizApi } from '@/apis'
import { AppDispatch, RootState } from '.'

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

export const fetchQuiz = createAsyncThunk('GENERATE_QUIZ', async (_, { rejectWithValue }) => {
  try {
    const quizResponse = await quizApi.generateQuiz()
    return quizResponse.results.map((quiz) => makeQuizData(quiz))
  } catch (e) {
    return rejectWithValue('퀴즈를 불러오는데 실패했어요.')
  }
})

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchQuiz.pending, (state) => {
      state.status = 'loading'
    })

    builder.addCase(fetchQuiz.fulfilled, (state, action) => {
      state.status = 'idle'
      state.quizList = action.payload
    })

    builder.addCase(fetchQuiz.rejected, (state) => {
      state.status = 'error'
    })
  },
})

export const useQuizDispatch: () => AppDispatch = useDispatch
export const useQuizSelector = () => useSelector((state: RootState) => state.quiz)

export const quizReducer = quizSlice.reducer
