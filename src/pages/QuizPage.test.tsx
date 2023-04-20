import React from 'react'
import { screen } from '@testing-library/react'

import { renderWithProviders } from '@/__tests__/test-utils'
import QuizPage from './QuizPage'
import { RootState } from '@/store'
import { Quiz, makeQuizListModel } from '@/models/Quiz'
import quizListDataJson from '@/mocks/quizList.json'
import { GenerateQuizResponse } from '@/apis/quizApi'

let currentQuiz: Quiz
let quizList: Quiz[]

describe('QuizPage test', () => {
  beforeEach(() => {
    quizList = makeQuizListModel(quizListDataJson as GenerateQuizResponse)
    currentQuiz = quizList[0]
  })

  test('풀고 있는 문제가 없다면 HomePage로 이동하는 것을 유도한다.', () => {
    renderWithProviders(<QuizPage />)
    expect(screen.getByText(/✋ 풀고 있는 퀴즈가 없어요!/i)).toBeInTheDocument()
  })

  test('풀고 있는 문제가 있다면 퀴즈를 보여준다.', () => {
    currentQuiz = quizList[2]

    const state: RootState = {
      quiz: {
        currentQuiz,
        quizList,
        solvedQuizList: [],
      },
    }

    renderWithProviders(<QuizPage />, { preloadedState: state })
    expect(screen.getByText(/3번 문제/i)).toBeInTheDocument()
  })
})
