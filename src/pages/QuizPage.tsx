import React from 'react'
import styled from '@emotion/styled'
import { useQuizDispatch, useQuizSelector } from '@/store/quizSlice'
import RedirectionGuide from '@/components/RedirectionGuide'
import { routeTable } from '@/routes/routeTable'

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

  return <Container>QuizPage</Container>
}

const Container = styled.section`
  margin-top: 50px;
`
