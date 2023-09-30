import React from 'react'
import Text from '@/_lib/components/Text'
import Button from '@/_lib/components/Button'
import Stack from '@/_lib/components/Stack'
import Spacing from '@/_lib/components/Spacing'
import Row from '@/_lib/components/Row'
import { useRouter } from './routing'
import { PageContainer } from './PageContainer'
import SolvedQuizList from '@/components/SolvedQuizList'
import useQuiz, { QuizStatus } from '@/hooks/useQuiz'
import { Quiz } from '@/store/quiz/types'

export default function NotePage() {
  const router = useRouter()
  const { quizStatus, solvedQuizList, onInitializeQuiz } = useQuiz()

  return (
    <PageContainer title="오답노트">
      <RenderComponentWithCondition
        condition={quizStatus}
        solvedQuizList={solvedQuizList}
        onRouteHomePage={() => router.push('/')}
        onRouteSolvePage={() => router.push('/solve')}
        onRouteResultPage={() => router.push('/result')}
        onInitializeQuiz={onInitializeQuiz}
      />
    </PageContainer>
  )
}

interface RenderComponentWithConditionProps {
  condition: QuizStatus
  solvedQuizList: Quiz[]
  onRouteHomePage: () => void
  onRouteSolvePage: () => void
  onRouteResultPage: () => void
  onInitializeQuiz: () => void
}

function RenderComponentWithCondition({
  condition,
  solvedQuizList,
  onRouteHomePage,
  onRouteSolvePage,
  onRouteResultPage,
  onInitializeQuiz,
}: RenderComponentWithConditionProps) {
  switch (condition) {
    case 'idle': {
      return (
        <>
          <Spacing />
          <Stack>
            <Text size="xlg">✋ 풀고 있는 퀴즈가 없어요!</Text>
            <Button onClick={onRouteHomePage}>홈으로</Button>
          </Stack>
        </>
      )
    }
    case 'error': {
      return (
        <>
          <Spacing />
          <Stack>
            <Text size="xlg">✋ 풀고 있는 퀴즈가 없어요!</Text>
            <Button onClick={onRouteHomePage}>홈으로</Button>
          </Stack>
        </>
      )
    }
    case 'isSolving': {
      return (
        <>
          <Spacing />
          <Stack>
            <Text size="xlg">✋ 아직 퀴즈를 다 풀지 않았어요!</Text>
            <Button size="lg" onClick={onRouteSolvePage}>
              이어서 풀기
            </Button>
            <Button size="lg" onClick={onInitializeQuiz}>
              새로운 퀴즈 풀기
            </Button>
          </Stack>
        </>
      )
    }
    default: {
      return (
        <>
          <Row alignItems="center" gap="15px">
            <Text size="xlg" bold>
              📝 오답 노트
            </Text>
            <Button onClick={onRouteResultPage}>📊 차트 보기</Button>
          </Row>
          <Spacing level={2} />
          <SolvedQuizList solvedQuizList={solvedQuizList} />
        </>
      )
    }
  }
}
