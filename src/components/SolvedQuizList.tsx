import React, { CSSProperties } from 'react'
import styled from '@emotion/styled'
import { Colors } from '@/_lib/constants/theme'
import Text from '@/_lib/components/Text'
import Stack from '@/_lib/components/Stack'
import redCheck from '@/assets/redCheck.svg'
import { Quiz } from '@/store/quiz/types'

export default function SolvedQuizList({ solvedQuizList }: { solvedQuizList: Quiz[] }) {
  return (
    <Stack borderColor="none" padding="0">
      {solvedQuizList.map((quiz) => (
        <StyledQuiz key={quiz.number}>
          {quiz.correct_answer !== quiz.selectedAnswerByUser && (
            <RedCheck position="absolute" top="-8px" />
          )}
          <Text size="lg">
            {quiz.number}번. {quiz.question}
          </Text>
          {[...quiz.incorrect_answers, quiz.correct_answer].sort().map((option) => (
            <Option
              key={option}
              correctAnswer={quiz.correct_answer}
              selectedAnswerByUser={quiz.selectedAnswerByUser}
              text={option}
            />
          ))}
        </StyledQuiz>
      ))}
    </Stack>
  )
}

function RedCheck({
  position = 'relative',
  top = '0',
  left = '0',
}: {
  position?: CSSProperties['position']
  top?: CSSProperties['top']
  left?: CSSProperties['left']
}) {
  return (
    <StyledRedCheck position={position} top={top} left={left}>
      <img src={redCheck} alt="check" />
    </StyledRedCheck>
  )
}

function Option({
  text,
  selectedAnswerByUser,
  correctAnswer,
}: {
  text: string
  selectedAnswerByUser: string
  correctAnswer: string
}) {
  if (text === selectedAnswerByUser && selectedAnswerByUser !== correctAnswer) {
    return <StyledOption style={{ border: '2px solid tomato' }}>{text} ❌</StyledOption>
  }
  if (text === correctAnswer) {
    return <StyledOption>{text} ✅</StyledOption>
  }
  return <StyledOption>{text}</StyledOption>
}

const StyledQuiz = styled.li`
  width: 100%;
  position: relative;
  box-sizing: border-box;
  border: 2px solid ${Colors.green200};
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const StyledRedCheck = styled.div<{
  position: CSSProperties['position']
  top: CSSProperties['top']
  left: CSSProperties['left']
}>`
  width: 40px;
  height: 40px;
  position: ${({ position }) => position};
  top: ${({ top }) => top};
  left: ${({ left }) => left};
`

const StyledOption = styled.div`
  padding: 10px;
  border: 1px solid gray;
  border-radius: 4px;
`
