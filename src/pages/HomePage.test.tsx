import React from 'react'
import { fireEvent, screen, waitFor } from '@testing-library/react'

import { renderWithProviders } from '@/__tests__/test-utils'
import { server } from '@/__mocks__/quizHandlers'
import quizData from '@/__mocks__/quiz.json'
import HomePage from '@/pages/HomePage'
import { RootState, setupStore } from '@/store'
import { QuizResponseType, makeQuizData } from '@/models/Quiz'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('HomePage test', () => {
  test('초기화된 상태라면 퀴즈를 시작할 수 있다.', () => {
    renderWithProviders(<HomePage />)
    expect(screen.getByText(/퀴즈를 시작해볼까요?/i)).toBeInTheDocument()
  })

  test('에러가 발생한다면 사용자에게 피드백을 준다.', async () => {
    const state: RootState = {
      quiz: {
        status: 'error',
        currentQuiz: null,
        quizList: [],
        solvedQuizList: [],
      },
    }

    renderWithProviders(<HomePage />, { preloadedState: state })
    expect(
      screen.getByText(/퀴즈를 불러오는데 실패했습니다. 다시 시도해주세요./i),
    ).toBeInTheDocument()
  })

  test('이미 풀고 있는 문제가 있다면 사용자에게 피드백을 준다.', async () => {
    const state: RootState = {
      quiz: {
        status: 'idle',
        currentQuiz: makeQuizData(quizData as QuizResponseType, 1),
        quizList: [],
        solvedQuizList: [],
      },
    }

    renderWithProviders(<HomePage />, { preloadedState: state })
    expect(screen.getByText(/이미 풀고 있는 퀴즈가 있습니다./i)).toBeInTheDocument()
  })

  test('퀴즈를 생성하면 로딩을 보여준다.', async () => {
    const store = setupStore()
    renderWithProviders(<HomePage />, { store })
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByText(/퀴즈를 생성 중입니다.../i)).toBeInTheDocument()
  })
})