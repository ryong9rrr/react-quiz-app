import React from 'react'
import styled from '@emotion/styled'
import { useQuizDispatch, useQuizSelector } from '@/store/quizSlice'

export default function QuizPage() {
  const dispatch = useQuizDispatch()
  const quiz = useQuizSelector()

  console.log(quiz)

  return <Container>QuizPage</Container>
}

const Container = styled.section`
  margin-top: 50px;
`
