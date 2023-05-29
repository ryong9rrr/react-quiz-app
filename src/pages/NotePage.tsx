import React from 'react'
import Text from '@/_lib/components/Text'
import Button from '@/_lib/components/Button'
import Stack from '@/_lib/components/Stack'
import Spacing from '@/_lib/components/Spacing'
import Row from '@/_lib/components/Row'
import { useQuizDispatch, QuizActions } from '@/store/quiz/slice'
import { useRouter } from './routing'
import { PageContainer } from './PageContainer'
import SolvedQuizList from '@/components/SolvedQuizList'
import useQuiz from '@/store/quiz/hook'

export default function NotePage() {
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
        <Spacing />
        <Stack>
          <Text size="xlg">✋ 풀고 있는 퀴즈가 없어요!</Text>
          <Button onClick={() => router.push('/')}>홈으로</Button>
        </Stack>
      </PageContainer>
    )
  }

  if (isSolving || !isClear) {
    return (
      <PageContainer title="오답노트">
        <Spacing />
        <Stack>
          <Text size="xlg">✋ 아직 퀴즈를 다 풀지 않았어요!</Text>
          <Button size="lg" onClick={() => router.push('/solve')}>
            이어서 풀기
          </Button>
          <Button size="lg" onClick={handleClickNewStart}>
            새로운 퀴즈 풀기
          </Button>
        </Stack>
      </PageContainer>
    )
  }

  return (
    <PageContainer title="오답노트">
      <Row alignItems="center" gap="15px">
        <Text size="xlg" bold>
          📝 오답 노트
        </Text>
        <Button onClick={() => router.push('/result')}>📊 차트 보기</Button>
      </Row>
      <Spacing level={2} />
      <SolvedQuizList solvedQuizList={solvedQuizList} />
    </PageContainer>
  )
}
