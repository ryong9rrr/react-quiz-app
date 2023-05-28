import React from 'react'
import styled from '@emotion/styled'
import { Quiz } from '@/models/Quiz'
import { Colors } from '@/_lib/constants/theme'
import Text from '../_lib/components/Text'
import useQuizSelect from '@/hooks/useQuizSelect'
import Button from '@/_lib/components/Button'

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
            <Text size="lg">🎊 정답입니다! 🎊</Text>
          ) : (
            <Text size="lg">🤔 다시 생각해보세요.</Text>
          )}
        </Feedback>
      )}
      <Text bold size="xlg">
        {currentQuiz.number}번 문제
      </Text>
      <Text size="lg">{currentQuiz.question}</Text>
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
        <Button onClick={handleSolve && (() => handleSolve(selectedAnswer))}>
          {isLastQuiz ? '결과 보기' : '다음 문제'}
        </Button>
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
  border: 2px solid ${({ isCorrect }) => (isCorrect ? Colors.green200 : Colors.red)};
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
