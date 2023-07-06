import React from 'react'
import Loading from '@/_lib/components/Loading'
import Text from '@/_lib/components/Text'
import Button from '@/_lib/components/Button'
import Stack from '@/_lib/components/Stack'
import Spacing from '@/_lib/components/Spacing'
import usePromise from '@/_lib/hooks/usePromise'
import { useQuizDispatch, QuizActions } from '@/store/quiz/slice'
import * as QuizApi from '@/apis/quiz'
import { useRouter } from './routing'
import { PageContainer } from './PageContainer'
import useQuiz from '@/store/quiz/useQuiz'

export default function HomePage() {
  const router = useRouter()
  const dispatch = useQuizDispatch()
  const { isClear, isSolving } = useQuiz()

  const { status, trigger: handleClickStart } = usePromise(async () => {
    const { results } = await QuizApi.generateQuiz()
    dispatch(
      QuizActions.startQuiz({
        servedQuizList: results,
      }),
    )
    router.push('/solve')
  })

  if (status === 'loading') {
    return (
      <PageContainer title="홈">
        <Spacing />
        <Stack>
          <Loading />
          <Text>퀴즈를 생성 중입니다...</Text>
        </Stack>
      </PageContainer>
    )
  }

  if (status === 'error') {
    return (
      <PageContainer title="홈">
        <Spacing />
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
        <Spacing />
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
        <Spacing />
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
      <Spacing />
      <Stack>
        <Text size="xlg">퀴즈를 시작해볼까요?</Text>
        <Button size="lg" onClick={handleClickStart}>
          START
        </Button>
      </Stack>
    </PageContainer>
  )
}
