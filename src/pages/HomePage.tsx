import React from 'react'
import styled from '@emotion/styled'

import { PALETTE } from '@/styles/theme'
import { fetchQuiz, useQuizDispatch, useQuizSelector } from '@/store/quizSlice'
import Loading from '@/components/Loading'
import Text from '@/components/Text'
import Button from '@/components/Button'

export default function HomePage() {
  const dispatch = useQuizDispatch()
  const quiz = useQuizSelector()

  const loading = quiz.status === 'loading'

  const handleClickStart = () => {
    dispatch(fetchQuiz())
  }

  if (quiz.status === 'error') {
    return (
      <Container>
        <>
          <Text size="xlg" style={{ margin: '16px 0' }}>
            퀴즈를 불러오는데 실패했습니다. 다시 시도해주세요.
          </Text>
          <Button size="lg" onClick={handleClickStart}>
            다시 시도
          </Button>
        </>
      </Container>
    )
  }

  return (
    <Container>
      {loading ? (
        <>
          <Loading />
          <Text>퀴즈를 생성 중입니다...</Text>
        </>
      ) : (
        <>
          <Text size="xlg" style={{ margin: '16px 0' }}>
            퀴즈를 시작해볼까요?
          </Text>
          <Button size="lg" onClick={handleClickStart}>
            START
          </Button>
        </>
      )}
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
