import React from 'react'
import styled from '@emotion/styled'

import { useQuizDispatch, useQuizSelector } from '@/store/quizSlice'
import RedirectionGuide from '@/components/RedirectionGuide'
import { routeTable } from '@/routes/routeTable'
import ProgressBar from '@/components/ProgressBar'
import Spacer from '@/components/Spacer'
import Text from '@/components/Text'

export default function QuizPage() {
  const dispatch = useQuizDispatch()
  const quiz = useQuizSelector()

  if (!quiz.currentQuiz) {
    return (
      <RedirectionGuide
        text="✋ 풀고 있는 퀴즈가 없어요!"
        path={routeTable.HOME.path}
        pathMessage="홈으로"
      />
    )
  }

  const quizListLength = quiz.quizList.length
  const currentQuizNumber = quiz.currentQuiz.number

  const percentValue = Math.round((currentQuizNumber / quizListLength) * 100)

  return (
    <Container>
      <ProgressBar value={percentValue} />
      <Spacer height={20} />
      <QuizBox>
        <Text bold size="xlg">
          {quiz.currentQuiz.number}번 문제
        </Text>
        <Text size="lg">{quiz.currentQuiz.question}</Text>
      </QuizBox>
    </Container>
  )
}

const Container = styled.section`
  margin-top: 50px;
`

const QuizBox = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`
