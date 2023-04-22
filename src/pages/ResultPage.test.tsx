import React from 'react'
import { screen } from '@testing-library/react'

import { mockQuiz, renderWithProviders } from '@/__tests__/test-utils'
import ResultPage from './ResultPage'
import { RootState } from '@/store'

describe('ResultPage test', () => {
  test('풀고 있는 문제가 없다면 HomePage로 이동하는 것을 유도한다.', () => {
    renderWithProviders(<ResultPage />)
    expect(screen.getByText(/✋ 풀고 있는 퀴즈가 없어요./i)).toBeInTheDocument()
  })

  test("문제를 푸는 중이라면 '아직 퀴즈를 다 풀지 않았어요'라는 피드백을 준다.", () => {
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

    renderWithProviders(<ResultPage />, { preloadedState: state })
    expect(screen.getByText(/아직 퀴즈를 다 풀지 않았어요/i)).toBeInTheDocument()
  })

  test("문제를 모두 풀었다면 '수고하셨습니다.'라는 피드백을 준다.", () => {
    const { quizList } = mockQuiz(2)
    const state: RootState = {
      quiz: {
        startTime: 0,
        endTime: 0,
        currentQuiz: null,
        quizList,
        solvedQuizList: [],
      },
    }

    state.quiz.solvedQuizList.length = quizList.length
    renderWithProviders(<ResultPage />, { preloadedState: state })
    expect(screen.getByText(/수고하셨습니다./i)).toBeInTheDocument()
  })
})
