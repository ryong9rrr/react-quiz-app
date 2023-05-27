import React from 'react'
import styled from '@emotion/styled'
import { useQuiz } from '@/hooks'
import { useQuizDispatch, QuizActions } from '@/store/quizSlice'
import * as Atom from '@/components/atom'
import * as Quiz from '@/components/quiz'
import { useRouter } from './routing'
import { PageContainer } from './PageContainer'

export default function CheckNotePage() {
  const router = useRouter()
  const dispatch = useQuizDispatch()
  const { isClear, isSolving, isNotStart, solvedQuizList } = useQuiz()

  const handleClickNewStart = () => {
    dispatch(QuizActions.initialize())
    router.push('/')
  }

  if (isNotStart) {
    return (
      <PageContainer title="오답노트">
        <Atom.Prompt text="✋ 풀고 있는 퀴즈가 없어요." style={{ marginTop: '150px' }}>
          <Atom.Button onClick={() => router.push('/')}>홈으로</Atom.Button>
        </Atom.Prompt>
      </PageContainer>
    )
  }

  if (isSolving || !isClear) {
    return (
      <PageContainer title="오답노트">
        <Atom.Prompt text="✋ 아직 퀴즈를 다 풀지 않았어요!" style={{ marginTop: '150px' }}>
          <Atom.Button size="lg" onClick={() => router.push('/quiz')}>
            이어서 풀기
          </Atom.Button>
          <Atom.Button size="lg" onClick={handleClickNewStart}>
            새로운 퀴즈 풀기
          </Atom.Button>
        </Atom.Prompt>
      </PageContainer>
    )
  }

  return (
    <PageContainer title="오답노트">
      <div style={{ marginTop: '20px' }}>
        <Title>
          <Atom.Text size="xlg" bold>
            📝 오답 노트
          </Atom.Text>
          <Atom.Button onClick={() => router.push('/result')}>📊 차트 보기</Atom.Button>
        </Title>
        <Atom.Spacer height={20} />
        <Quiz.CheckNote solvedQuizList={solvedQuizList} />
      </div>
    </PageContainer>
  )
}

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`
