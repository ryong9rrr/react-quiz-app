import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

import { PALETTE } from '@/styles/theme'
import Loading from '@/components/Loading'
import Text from '@/components/Text'
import Button from '@/components/Button'
import { routeTable } from '@/routes/routeTable'
import { useQuizDispatch, useQuizSelector, QuizActions } from '@/store/quizSlice'
import * as QuizApi from '@/apis/quizApi'

export default function HomePage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const navigate = useNavigate()
  const dispatch = useQuizDispatch()
  const quiz = useQuizSelector()

  const handleClickStart = async () => {
    setLoading(true)
    try {
      const quizResponse = await QuizApi.generateQuiz()
      dispatch(QuizActions.startQuiz(quizResponse))
      navigate(routeTable.QUIZ.path)
    } catch (e) {
      setError(true)
    }
    setLoading(false)
  }

  const handleClickNewStart = () => {
    dispatch(QuizActions.initialize())
  }

  const handleClickContinue = () => {
    navigate(routeTable.QUIZ.path)
  }

  if (loading) {
    return (
      <Container>
        <Loading />
        <Text>퀴즈를 생성 중입니다...</Text>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <Text size="xlg" style={{ margin: '16px 0' }}>
          퀴즈를 불러오는데 실패했습니다. 다시 시도해주세요.
        </Text>
        <Button size="lg" onClick={handleClickStart}>
          다시 시도
        </Button>
      </Container>
    )
  }

  if (quiz.currentQuiz) {
    return (
      <Container>
        <Text size="xlg" style={{ margin: '16px 0' }}>
          이미 풀고 있는 퀴즈가 있습니다.
        </Text>
        <Button size="lg" onClick={handleClickContinue}>
          이어서 풀기
        </Button>
        <Button size="lg" onClick={handleClickNewStart}>
          새롭게 시작하기
        </Button>
      </Container>
    )
  }

  return (
    <Container>
      <Text size="xlg" style={{ margin: '16px 0' }}>
        퀴즈를 시작해볼까요?
      </Text>
      <Button size="lg" onClick={handleClickStart}>
        START
      </Button>
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
