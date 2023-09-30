import React from 'react'
import Loading from '@/_lib/components/Loading'
import Text from '@/_lib/components/Text'
import Button from '@/_lib/components/Button'
import Stack from '@/_lib/components/Stack'
import Spacing from '@/_lib/components/Spacing'
import { useRouter } from './routing'
import { PageContainer } from './PageContainer'
import useQuiz, { QuizStatus } from '@/hooks/useQuiz'

export default function HomePage() {
  const router = useRouter()
  const { quizStatus, onStartQuiz, onInitializeQuiz } = useQuiz()

  return (
    <PageContainer title="홈">
      <Spacing />
      <Stack>
        <RenderComponentWithCondition
          condition={quizStatus}
          onStart={onStartQuiz}
          onInitializeQuiz={onInitializeQuiz}
          onRouteSolvePage={() => router.push('/solve')}
          onRouteResultPage={() => router.push('/result')}
        />
      </Stack>
    </PageContainer>
  )
}

interface RenderComponentWithConditionProps {
  condition: QuizStatus
  onStart: () => void
  onInitializeQuiz: () => void
  onRouteSolvePage: () => void
  onRouteResultPage: () => void
}

function RenderComponentWithCondition({
  condition,
  onStart,
  onInitializeQuiz,
  onRouteSolvePage,
  onRouteResultPage,
}: RenderComponentWithConditionProps) {
  switch (condition) {
    case 'loading': {
      return (
        <>
          <Loading />
          <Text>퀴즈를 생성 중입니다...</Text>
        </>
      )
    }
    case 'error': {
      return (
        <>
          <Text size="xlg">퀴즈를 불러오는데 실패했습니다. 다시 시도해주세요.</Text>
          <Button size="lg" onClick={onStart}>
            다시 시도
          </Button>
        </>
      )
    }
    case 'isSolving': {
      return (
        <>
          <Text size="xlg">이미 풀고 있는 퀴즈가 있습니다.</Text>
          <Button size="lg" onClick={onRouteSolvePage}>
            이어서 풀기
          </Button>
          <Button size="lg" onClick={onInitializeQuiz}>
            새로운 퀴즈 풀기
          </Button>
        </>
      )
    }
    case 'isFinish': {
      return (
        <>
          <Text size="xlg">퀴즈를 모두 풀었어요.</Text>
          <Button size="lg" onClick={onRouteResultPage}>
            결과 보기
          </Button>
          <Button size="lg" onClick={onInitializeQuiz}>
            새로운 퀴즈 풀기
          </Button>
        </>
      )
    }
    default: {
      return (
        <>
          <Text size="xlg">퀴즈를 시작해볼까요?</Text>
          <Button size="lg" onClick={onStart}>
            START
          </Button>
        </>
      )
    }
  }
}
