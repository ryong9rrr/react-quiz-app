// import React from 'react'
// import { render, screen } from '@testing-library/react'

// import { Quiz, modelBuilder } from '@/models/Quiz'
// import CheckNote from './CheckNote'

// const quiz: Quiz = {
//   number: 1,
//   category: 'category',
//   type: 'multiple',
//   difficulty: 'medium',
//   question: 'question',
//   correct_answer: '3',
//   incorrect_answers: ['1', '2', '4'],
// }

// describe('CheckNote test', () => {
//   test('문제를 맞췄을 경우', () => {
//     render(<CheckNote solvedQuizList={[modelBuilder.toSolvedQuiz(quiz, '3')]} />)
//     expect(screen.getByText('1')).toBeInTheDocument()
//     expect(screen.getByText('2')).toBeInTheDocument()
//     expect(screen.getByText('3 ✅')).toBeInTheDocument()
//     expect(screen.getByText('4')).toBeInTheDocument()
//   })

//   test('문제를 틀렸을 경우', () => {
//     render(<CheckNote solvedQuizList={[modelBuilder.toSolvedQuiz(quiz, '1')]} />)
//     expect(screen.getByText('1 ❌')).toBeInTheDocument()
//     expect(screen.getByText('2')).toBeInTheDocument()
//     expect(screen.getByText('3 ✅')).toBeInTheDocument()
//     expect(screen.getByText('4')).toBeInTheDocument()
//   })
// })
