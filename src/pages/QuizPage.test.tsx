import React from 'react'
import { screen } from '@testing-library/react'

import { mockQuiz, renderWithProviders } from '@/test-utils'
import QuizPage from './QuizPage'
import { RootState } from '@/store'

describe('QuizPage test', () => {
  test('풀고 있는 문제가 없다면 HomePage로 이동하는 것을 유도한다.', () => {
    renderWithProviders(<QuizPage />)
    expect(screen.getByText(/✋ 풀고 있는 퀴즈가 없어요!/i)).toBeInTheDocument()
  })

  test('풀고 있는 문제가 있다면 퀴즈를 보여준다.', () => {
    const { quizList, currentQuiz } = mockQuiz(2)
    const state: RootState = {
      quiz: {
        startTime: 0,
        endTime: 0,
        currentQuiz,
        quizList,
        solvedQuizList: [],
      },
    }

    renderWithProviders(<QuizPage />, { preloadedState: state })
    expect(screen.getByText(/3번 문제/i)).toBeInTheDocument()
  })

  test("퀴즈를 모두 풀었다면 '퀴즈를 모두 풀었어요'를 보여준다.", () => {
    const state: RootState = {
      quiz: {
        startTime: 0,
        endTime: 0,
        currentQuiz: null,
        quizList: [],
        solvedQuizList: [],
      },
    }
    state.quiz.quizList.length = 10
    state.quiz.solvedQuizList.length = 10
    renderWithProviders(<QuizPage />, { preloadedState: state })
    expect(screen.getByText(/퀴즈를 모두 풀었어요./i)).toBeInTheDocument()
  })
})
