import React from 'react'
import { fireEvent, screen, waitFor } from '@testing-library/react'

import { renderWithProviders } from '@/__tests__/test-utils'
import QuizPage from './QuizPage'
import { RootState } from '@/store'
import { QuizResponseType, makeQuizData } from '@/models/Quiz'
import quizData from '@/mocks/quiz.json'

describe('QuizPage test', () => {
  test('풀고 있는 문제가 없다면 HomePage로 이동하는 것을 유도한다.', () => {
    renderWithProviders(<QuizPage />)
    expect(screen.getByText(/✋ 풀고 있는 퀴즈가 없어요!/i)).toBeInTheDocument()
  })

  test('풀고 있는 문제가 있다면 퀴즈를 보여준다.', () => {
    const state: RootState = {
      quiz: {
        status: 'idle',
        currentQuiz: makeQuizData(quizData as QuizResponseType, 1),
        quizList: [],
        solvedQuizList: [],
      },
    }

    renderWithProviders(<QuizPage />, { preloadedState: state })
    expect(screen.getByText(/QuizPage/i)).toBeInTheDocument()
  })
})
