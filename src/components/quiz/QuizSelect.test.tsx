import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import { mockQuiz } from '@/test-utils'

import QuizSelect from './QuizSelect'

describe('QuizSelect test', () => {
  test('답안을 선택하지 않았다면 피드백을 보여주지 않는다.', () => {
    const { currentQuiz } = mockQuiz(0)
    render(<QuizSelect currentQuiz={currentQuiz} isLastQuiz={false} />)

    expect(screen.queryByText(/정답입니다!/i)).toBeNull()
    expect(screen.queryByText(/다시 생각해보세요./i)).toBeNull()
  })

  test('답안을 선택하지 않았다면 버튼을 보여주지 않는다.', () => {
    const { currentQuiz } = mockQuiz(0)
    render(<QuizSelect currentQuiz={currentQuiz} isLastQuiz={false} />)

    expect(screen.queryByText(/결과 보기/i)).toBeNull()
    expect(screen.queryByText(/다음 문제/i)).toBeNull()
  })

  test("정답을 선택했다면 '정답입니다!'를 보여준다.", () => {
    const { currentQuiz } = mockQuiz(0)
    render(<QuizSelect currentQuiz={currentQuiz} isLastQuiz={false} />)

    const correctAnswerLabel = screen.queryByText(currentQuiz.correct_answer) as HTMLLabelElement
    fireEvent.click(correctAnswerLabel)
    expect(screen.getByText(/정답입니다!/i)).toBeInTheDocument()
  })

  test("오답을 선택했다면 '다시 생각해보세요.'를 보여준다.", () => {
    const { currentQuiz } = mockQuiz(0)
    render(<QuizSelect currentQuiz={currentQuiz} isLastQuiz={false} />)

    const inCorrectAnswerLabel = screen.queryByText(
      currentQuiz.incorrect_answers[0],
    ) as HTMLLabelElement
    fireEvent.click(inCorrectAnswerLabel)
    expect(screen.getByText(/다시 생각해보세요./i)).toBeInTheDocument()
  })

  test("마지막 문제를 풀었다면(isLastQuiz가 true라면) '결과 보기' 버튼을 보여준다.", () => {
    const { currentQuiz } = mockQuiz(0) // isLastQuiz에 따라서만 렌더링하기 때문에 currentQuiz는 영향을 주지 않음.
    render(<QuizSelect currentQuiz={currentQuiz} isLastQuiz />)

    const inCorrectAnswerLabel = screen.queryByText(
      currentQuiz.incorrect_answers[0],
    ) as HTMLLabelElement
    fireEvent.click(inCorrectAnswerLabel)
    expect(screen.getByText(/결과 보기/i)).toBeInTheDocument()
  })

  test("마지막 문제를 푼 것이 아니라면(isLastQuiz가 false라면) '다음 문제' 버튼을 보여준다.", () => {
    const { currentQuiz } = mockQuiz(9) // isLastQuiz에 따라서만 렌더링하기 때문에 currentQuiz는 영향을 주지 않음.
    render(<QuizSelect currentQuiz={currentQuiz} isLastQuiz={false} />)

    const inCorrectAnswerLabel = screen.queryByText(
      currentQuiz.incorrect_answers[0],
    ) as HTMLLabelElement
    fireEvent.click(inCorrectAnswerLabel)
    expect(screen.getByText(/다음 문제/i)).toBeInTheDocument()
  })
})
