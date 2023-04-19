import React from 'react'
import { fireEvent, screen, waitFor } from '@testing-library/react'

import { renderWithProviders } from '../test-utils'
import { server } from '@/__mocks__/quizHandlers'
import quizData from '@/__mocks__/quiz.json'
import HomePage from '@/pages/HomePage'
import { RootState, setupStore } from '@/store'
import { QuizResponseType, makeQuizData } from '@/models/Quiz'

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe('HomePage test', () => {
  test('render', () => {
    renderWithProviders(<HomePage />)
    expect(screen.getByText(/퀴즈를 시작해볼까요?/i)).toBeInTheDocument()
  })

  test('if error', async () => {
    const state: RootState = {
      quiz: {
        status: 'error',
        currentQuiz: null,
        quizList: [],
      },
    }

    renderWithProviders(<HomePage />, { preloadedState: state })
    expect(
      screen.getByText(/퀴즈를 불러오는데 실패했습니다. 다시 시도해주세요./i),
    ).toBeInTheDocument()
  })

  test('if already solving quiz', async () => {
    const state: RootState = {
      quiz: {
        status: 'idle',
        currentQuiz: makeQuizData(quizData as QuizResponseType, 1),
        quizList: [],
      },
    }

    renderWithProviders(<HomePage />, { preloadedState: state })
    expect(screen.getByText(/이미 풀고 있는 퀴즈가 있습니다./i)).toBeInTheDocument()
  })

  test('generate quiz', async () => {
    const store = setupStore()
    renderWithProviders(<HomePage />, { store })
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByText(/퀴즈를 생성 중입니다.../i)).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.queryByText(/퀴즈를 생성 중입니다.../i)).not.toBeInTheDocument()
      expect(screen.getByText(/이미 풀고 있는 퀴즈가 있습니다./i)).toBeInTheDocument()
    })
  })
})
