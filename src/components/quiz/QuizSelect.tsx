import React from 'react'
import styled from '@emotion/styled'

import * as Atom from '@/components/atom'
import { useQuizSelect } from '@/hooks'
import { Quiz } from '@/models/Quiz'
import { PALETTE } from '@/styles/theme'

interface Props {
  currentQuiz: Quiz
  isLastQuiz: boolean
  handleSolve?: (userAnswer: string) => void
}

export default function QuizSelect({ currentQuiz, isLastQuiz, handleSolve }: Props) {
  const { options, selectedAnswer, handleSelect, isCorrect } = useQuizSelect(currentQuiz)

  return (
    <Container>
      {selectedAnswer && (
        <Feedback isCorrect={isCorrect}>
          {isCorrect ? (
            <Atom.Text size="lg">🎊 정답입니다! 🎊</Atom.Text>
          ) : (
            <Atom.Text size="lg">🤔 다시 생각해보세요.</Atom.Text>
          )}
        </Feedback>
      )}
      <Atom.Text bold size="xlg">
        {currentQuiz.number}번 문제
      </Atom.Text>
      <Atom.Text size="lg">{currentQuiz.question}</Atom.Text>
      <Radio>
        {options.map((option) => (
          <li key={option}>
            <input
              name="quiz"
              type="radio"
              id={option}
              value={option}
              checked={selectedAnswer === option}
              onChange={handleSelect}
            />
            <label htmlFor={option}>{option}</label>
          </li>
        ))}
      </Radio>
      {!!selectedAnswer && (
        <Atom.Button onClick={handleSolve && (() => handleSolve(selectedAnswer))}>
          {isLastQuiz ? '결과 보기' : '다음 문제'}
        </Atom.Button>
      )}
    </Container>
  )
}

const Container = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Feedback = styled.div<{ isCorrect: boolean }>`
  margin: 30px auto;
  max-width: 200px;
  border: 2px solid ${({ isCorrect }) => (isCorrect ? PALETTE.green[1] : PALETTE.red)};
  border-radius: 8px;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Radio = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;

  input,
  label {
    cursor: pointer;
  }
`
