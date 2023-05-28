import React, { useState } from 'react'
import styled from '@emotion/styled'

import * as Atom from '@/components/atom'
import { Colors } from '@/_lib/constants/theme'
import { useQuizDispatch, QuizActions } from '@/store/quizSlice'
import * as QuizApi from '@/apis/quiz'
import { useQuiz } from '@/hooks'
import { useRouter } from './routing'
import { PageContainer } from './PageContainer'

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
      router.push('/quiz')
    } catch (e) {
      setError(true)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <PageContainer title="홈">
        <Wrapper>
          <Atom.Loading />
          <Atom.Text>퀴즈를 생성 중입니다...</Atom.Text>
        </Wrapper>
      </PageContainer>
    )
  }

  if (error) {
    return (
      <PageContainer title="홈">
        <Atom.Prompt
          text="퀴즈를 불러오는데 실패했습니다. 다시 시도해주세요."
          style={{ marginTop: '150px' }}
        >
          <Atom.Button size="lg" onClick={handleClickStart}>
            다시 시도
          </Atom.Button>
        </Atom.Prompt>
      </PageContainer>
    )
  }

  if (isSolving) {
    return (
      <PageContainer title="홈">
        <Atom.Prompt text="이미 풀고 있는 퀴즈가 있습니다." style={{ marginTop: '150px' }}>
          <Atom.Button size="lg" onClick={() => router.push('/quiz')}>
            이어서 풀기
          </Atom.Button>
          <Atom.Button size="lg" onClick={() => dispatch(QuizActions.initialize())}>
            새로운 퀴즈 풀기
          </Atom.Button>
        </Atom.Prompt>
      </PageContainer>
    )
  }

  if (isClear) {
    return (
      <PageContainer title="홈">
        <Atom.Prompt text="퀴즈를 모두 풀었어요." style={{ marginTop: '150px' }}>
          <Atom.Button size="lg" onClick={() => router.push('/result')}>
            결과 보기
          </Atom.Button>
          <Atom.Button size="lg" onClick={() => dispatch(QuizActions.initialize())}>
            새로운 퀴즈 풀기
          </Atom.Button>
        </Atom.Prompt>
      </PageContainer>
    )
  }

  return (
    <PageContainer title="홈">
      <Wrapper>
        <Atom.Text size="xlg" style={{ margin: '16px 0' }}>
          퀴즈를 시작해볼까요?
        </Atom.Text>
        <Atom.Button size="lg" onClick={handleClickStart}>
          START
        </Atom.Button>
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
