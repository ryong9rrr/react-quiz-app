import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import styled from '@emotion/styled'
import { Colors } from '@/_lib/constants/theme'
import Text from '@/_lib/components/Text'
import Button from '@/_lib/components/Button'
import Stack from '@/_lib/components/Stack'
import Spacing from '@/_lib/components/Spacing'
import { Quiz } from '@/store/quiz/types'
import OneSelectRadio from '@/_lib/components/OneSelectRadio'

interface Props {
  currentQuiz: Quiz
  isLastQuiz: boolean
  handleSolve?: (userAnswer: string) => void
}

export default function SolveQuiz({ currentQuiz, isLastQuiz, handleSolve }: Props) {
  const { selectedAnswer, isCorrect, options, handleSelect } = useSolve(currentQuiz)
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
        <OneSelectRadio
          options={options}
          name="quiz"
          type="radio"
          selectedValue={selectedAnswer}
          onSelect={handleSelect}
        />
      </Stack>
      {!!selectedAnswer && (
        <Button full onClick={handleSolve && (() => handleSolve(selectedAnswer))}>
          {isLastQuiz ? '결과 보기' : '다음 문제'}
        </Button>
      )}
    </>
  )
}

function useSolve(currentQuiz: Quiz) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('')
  const { incorrect_answers, correct_answer } = currentQuiz
  const isCorrect = selectedAnswer === correct_answer

  const options = useMemo(
    () => [...incorrect_answers, correct_answer].sort(),
    [incorrect_answers, correct_answer],
  )

  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(e.target.value)
  }

  useEffect(() => {
    setSelectedAnswer('')
  }, [currentQuiz])

  return { options, selectedAnswer, handleSelect, isCorrect }
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
