import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Colors } from '@/_lib/constants/theme'
import { useQuizDispatch, QuizActions } from '@/store/quizSlice'
import * as QuizApi from '@/apis/quiz'
import { useRouter } from './routing'
import { PageContainer } from './PageContainer'
import Loading from '@/_lib/components/Loading'
import Text from '@/_lib/components/Text'
import useQuiz from '@/hooks/useQuiz'
import Button from '@/_lib/components/Button'
import Stack from '@/_lib/components/Stack'

export default function HomePage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const router = useRouter()
  const dispatch = useQuizDispatch()
  const { isClear, isSolving } = useQuiz()

  const handleClickStart = async () => {
    setLoading(true)
    try {
      const quizResponse = await QuizApi.generateQuiz()
      dispatch(
        QuizActions.startQuiz({
          quizResponse,
          startTime: Date.now(),
        }),
      )
      router.push('/solve')
    } catch (e) {
      setError(true)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <PageContainer title="홈">
        <Wrapper>
          <Loading />
          <Text>퀴즈를 생성 중입니다...</Text>
        </Wrapper>
      </PageContainer>
    )
  }

  if (error) {
    return (
      <PageContainer title="홈">
        <Stack>
          <Text size="xlg">퀴즈를 불러오는데 실패했습니다. 다시 시도해주세요.</Text>
          <Button size="lg" onClick={handleClickStart}>
            다시 시도
          </Button>
        </Stack>
      </PageContainer>
    )
  }

  if (isSolving) {
    return (
      <PageContainer title="홈">
        <Stack>
          <Text size="xlg">이미 풀고 있는 퀴즈가 있습니다.</Text>
          <Button size="lg" onClick={() => router.push('/solve')}>
            이어서 풀기
          </Button>
          <Button size="lg" onClick={() => dispatch(QuizActions.initialize())}>
            새로운 퀴즈 풀기
          </Button>
        </Stack>
      </PageContainer>
    )
  }

  if (isClear) {
    return (
      <PageContainer title="홈">
        <Stack>
          <Text size="xlg">퀴즈를 모두 풀었어요.</Text>
          <Button size="lg" onClick={() => router.push('/result')}>
            결과 보기
          </Button>
          <Button size="lg" onClick={() => dispatch(QuizActions.initialize())}>
            새로운 퀴즈 풀기
          </Button>
        </Stack>
      </PageContainer>
    )
  }

  return (
    <PageContainer title="홈">
      <Wrapper>
        <Text size="xlg" style={{ margin: '16px 0' }}>
          퀴즈를 시작해볼까요?
        </Text>
        <Button size="lg" onClick={handleClickStart}>
          START
        </Button>
      </Wrapper>
    </PageContainer>
  )
}

const Wrapper = styled.div`
  margin-top: 150px;
  padding: 24px;
  border: 2px solid ${Colors.green200};
  border-radius: 8px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 16px;
  text-align: center;
`
