import React from 'react'
import styled from '@emotion/styled'
import { Colors } from '@/_lib/constants/theme'
import Text from '../_lib/components/Text'
import useQuizSelect from '@/hooks/useQuizSelect'
import Button from '@/_lib/components/Button'
import Stack from '@/_lib/components/Stack'
import Spacing from '@/_lib/components/Spacing'
import { Quiz } from '@/store/types'

interface Props {
  currentQuiz: Quiz
  isLastQuiz: boolean
  handleSolve?: (userAnswer: string) => void
}

export default function QuizSelect({ currentQuiz, isLastQuiz, handleSolve }: Props) {
  const { options, selectedAnswer, handleSelect, isCorrect } = useQuizSelect(currentQuiz)

  return (
    <>
      {selectedAnswer && (
        <>
          <Spacing level={5} />
          <ResultMessage borderColor={isCorrect ? Colors.green200 : Colors.red}>
            <Text size="lg">{isCorrect ? '🎊 정답입니다! 🎊' : '🤔 다시 생각해보세요.'}</Text>
          </ResultMessage>
        </>
      )}
      <Spacing level={2} />
      <Stack justifyContent="flex-start" alignItems="flex-start" borderColor="none">
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
      </Stack>
      {!!selectedAnswer && (
        <Button full onClick={handleSolve && (() => handleSolve(selectedAnswer))}>
          {isLastQuiz ? '결과 보기' : '다음 문제'}
        </Button>
      )}
    </>
  )
}

const ResultMessage = styled.div<{ borderColor: string }>`
  margin: 0 auto;
  max-width: 200px;
  border: 2px solid ${({ borderColor }) => borderColor};
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
