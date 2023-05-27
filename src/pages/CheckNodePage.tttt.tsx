// import React from 'react'
// import { screen } from '@testing-library/react'

// import { mockQuiz, renderWithProviders } from '@/test-utils'
// import CheckNotePage from './CheckNotePage'
// import { RootState } from '@/store'

// describe('CheckNotePage test', () => {
//   test('풀고 있는 문제가 없다면 HomePage로 이동하는 것을 유도한다.', () => {
//     renderWithProviders(<CheckNotePage />)
//     expect(screen.getByText(/✋ 풀고 있는 퀴즈가 없어요./i)).toBeInTheDocument()
//   })

//   test("문제를 푸는 중이라면 '아직 퀴즈를 다 풀지 않았어요'라는 피드백을 준다.", () => {
//     const { quizList, currentQuiz } = mockQuiz(2)
//     const state: RootState = {
//       quiz: {
//         startTime: 0,
//         endTime: 0,
//         currentQuiz,
//         quizList,
//         solvedQuizList: [],
//       },
//     }

//     renderWithProviders(<CheckNotePage />, { preloadedState: state })
//     expect(screen.getByText(/아직 퀴즈를 다 풀지 않았어요/i)).toBeInTheDocument()
//   })

//   test("문제를 모두 풀었다면 '오답 노트'라는 타이틀을 보여준다.", () => {
//     const { quizList } = mockQuiz(2)
//     const state: RootState = {
//       quiz: {
//         startTime: 0,
//         endTime: 0,
//         currentQuiz: null,
//         quizList,
//         solvedQuizList: [],
//       },
//     }

//     state.quiz.solvedQuizList.length = quizList.length
//     renderWithProviders(<CheckNotePage />, { preloadedState: state })
//     expect(screen.getByText(/오답 노트/i)).toBeInTheDocument()
//   })
// })
