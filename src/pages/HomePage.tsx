import React, { useEffect } from 'react'
import styled from '@emotion/styled'

import { PALETTE } from '@/styles/theme'
import { fetchQuiz, useQuizDispatch, useQuizSelector } from '@/store/quizSlice'

export default function HomePage() {
  const dispatch = useQuizDispatch()
  const quiz = useQuizSelector()

  useEffect(() => {
    dispatch(fetchQuiz())
  }, [dispatch])

  if (quiz.status === 'loading') {
    return <Container>로딩중...</Container>
  }

  if (quiz.status === 'error') {
    return <Container>에러발생</Container>
  }

  return (
    <Container>
      {quiz.quizList.map((q) => (
        <li key={q.question}>{q.question}</li>
      ))}
    </Container>
  )
}

const Container = styled.div`
  margin-top: 150px;
  padding: 24px;
  border: 2px solid ${PALETTE.green[1]};
  border-radius: 8px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 16px;
  text-align: center;
`
