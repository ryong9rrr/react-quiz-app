import React from 'react'
import styled from '@emotion/styled'

import { useQuizSelector } from '@/store/quizSlice'
import RedirectionGuide from '@/components/RedirectionGuide'
import { routeTable } from '@/routes/routeTable'
import QuizSelect from '@/components/quiz/QuizSelect'
import ProgressBar from '@/components/ProgressBar'
import Spacer from '@/components/Spacer'

export default function QuizPage() {
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

  const handleSolve = (userAnswer: string) => {
    console.log(userAnswer)
  }

  const quizListLength = quiz.quizList.length
  const currentQuizNumber = quiz.currentQuiz.number

  return (
    <Container>
      <ProgressBar value={Math.round((currentQuizNumber / quizListLength) * 100)} />
      <Spacer height={20} />
      <QuizSelect
        currentQuiz={quiz.currentQuiz}
        isLastQuiz={quizListLength === currentQuizNumber}
        handleSolve={handleSolve}
      />
    </Container>
  )
}

const Container = styled.section`
  margin-top: 50px;
`
