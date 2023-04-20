import React from 'react'
import { fireEvent, screen, waitFor } from '@testing-library/react'

import HomePage from '@/pages/HomePage'

import { renderWithProviders, renderWithRouter } from '@/__tests__/test-utils'
import { server, handlers } from '@/mocks/quizHandlers'
import quizData from '@/mocks/quiz.json'
import { RootState } from '@/store'
import { QuizResponseType, makeQuizData } from '@/models/Quiz'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('HomePage test', () => {
  test('초기화된 상태라면 퀴즈를 시작할 수 있다.', () => {
    renderWithProviders(<HomePage />)
    expect(screen.getByText('퀴즈를 시작해볼까요?')).toBeInTheDocument()
  })

  test('이미 풀고 있는 문제가 있다면 사용자에게 피드백을 준다.', async () => {
    const state: RootState = {
      quiz: {
        currentQuiz: makeQuizData(quizData as QuizResponseType, 1),
        quizList: [],
        solvedQuizList: [],
      },
    }

    renderWithProviders(<HomePage />, { preloadedState: state })
    expect(screen.getByText(/이미 풀고 있는 퀴즈가 있습니다./i)).toBeInTheDocument()
  })

  test('퀴즈를 생성하고 에러가 발생한다면 사용자에게 피드백을 준다.', async () => {
    server.use(handlers.generateQuizForError)
    renderWithProviders(<HomePage />)

    // 퀴즈 시작 전
    expect(screen.getByText('퀴즈를 시작해볼까요?')).toBeInTheDocument()

    // 퀴즈 시작
    fireEvent.click(screen.getByText('START'))

    // 퀴즈를 불러오는데 실패
    await waitFor(() => {
      expect(
        screen.getByText('퀴즈를 불러오는데 실패했습니다. 다시 시도해주세요.'),
      ).toBeInTheDocument()
    })
  })

  test('퀴즈를 생성하는데 성공하면 페이지가 이동한다.', async () => {
    server.use(handlers.generateQuizForSuccess)
    renderWithRouter()

    // 퀴즈 시작 전
    expect(screen.getByText('퀴즈를 시작해볼까요?')).toBeInTheDocument()

    // 퀴즈 시작
    fireEvent.click(screen.getByText('START'))

    // 퀴즈를 불러오면 퀴즈페이지로 이동한다.
    await waitFor(() => {
      expect(screen.getByText('QuizPage')).toBeInTheDocument()
    })
  })
})
