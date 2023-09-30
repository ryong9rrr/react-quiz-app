import React from 'react'
import Text from '@/_lib/components/Text'
import Button from '@/_lib/components/Button'
import Stack from '@/_lib/components/Stack'
import Spacing from '@/_lib/components/Spacing'
import Chart from '@/_lib/components/Chart'
import { Colors } from '@/_lib/constants/theme'
import { useRouter } from './routing'
import { PageContainer } from './PageContainer'
import useQuiz, { QuizStatus } from '@/hooks/useQuiz'
import { getTime } from '@/components/Clock'

export default function ResultPage() {
  const router = useRouter()
  const { quizStatus, correctCount, inCorrectCount, onInitializeQuiz } = useQuiz()

  return (
    <PageContainer title="결과">
      <RenderComponentWithCondition
        condition={quizStatus}
        correctCount={correctCount}
        inCorrectCount={inCorrectCount}
        onRouteHomePage={() => router.push('/')}
        onRouteSolvePage={() => router.push('/solve')}
        onRouteNotePage={() => router.push('/note')}
        onInitializeQuiz={onInitializeQuiz}
      />
    </PageContainer>
  )
}

const makeData = (inCorrectCount: number, correctCount: number) => ({
  labels: [''],
  datasets: [
    {
      label: '틀린 문제',
      data: [inCorrectCount],
      backgroundColor: Colors.red,
    },
    {
      label: '맞은 문제',
      data: [correctCount],
      backgroundColor: Colors.blue,
    },
  ],
})

interface RenderComponentWithConditionProps {
  condition: QuizStatus
  correctCount: number
  inCorrectCount: number
  onRouteHomePage: () => void
  onRouteSolvePage: () => void
  onRouteNotePage: () => void
  onInitializeQuiz: () => void
}

function RenderComponentWithCondition({
  condition,
  correctCount,
  inCorrectCount,
  onRouteHomePage,
  onRouteSolvePage,
  onRouteNotePage,
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
          <Text size="xlg" bold>
            👏 수고하셨습니다.
          </Text>
          <Spacing level={3} />
          <Text size="lg" bold>
            🔎 퀴즈 결과
          </Text>
          <Spacing level={1} />
          <Stack justifyContent="flex-start" alignItems="flex-start">
            <Button size="sm" onClick={onRouteNotePage}>
              📝 오답 노트
            </Button>
            <Text>틀린 문제 : {inCorrectCount}개</Text>
            <Text>맞은 문제 : {correctCount}개</Text>
            <Text>소요 시간 : {getTime()}</Text>
          </Stack>
          <Spacing level={2} />
          <Text size="lg" bold>
            📊 차트
          </Text>
          <Spacing level={1} />
          <Chart data={makeData(inCorrectCount, correctCount)} />
          <Spacing level={3} />
          <Button full onClick={onInitializeQuiz}>
            새로운 퀴즈 풀기
          </Button>
        </>
      )
    }
  }
}
