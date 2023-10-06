import React from 'react'
import ProgressBar from '@/_lib/components/ProgressBar'
import Button from '@/_lib/components/Button'
import Stack from '@/_lib/components/Stack'
import Text from '@/_lib/components/Text'
import Spacing from '@/_lib/components/Spacing'
import useQuiz, { QuizStatus } from '@/hooks/useQuiz'
import Clock from '@/components/Clock'
import SolveQuiz from '@/components/SolveQuiz'
import { Quiz } from '@/store/quiz/types'
import { useRouter } from './routing'
import { PageContainer } from './PageContainer'

export default function SolvePage() {
  const router = useRouter()
  const {
    quizStatus,
    progressBarPercent,
    currentQuizNumber,
    currentQuiz,
    quizList,
    onInitializeQuiz,
    onSolveQuiz,
  } = useQuiz()

  return (
    <PageContainer title="퀴즈">
      <RenderComponentWithCondition
        condition={quizStatus}
        currentQuiz={currentQuiz}
        quizList={quizList}
        progressBarPercent={progressBarPercent}
        currentQuizNumber={currentQuizNumber}
        onInitializeQuiz={onInitializeQuiz}
        onSolveQuiz={onSolveQuiz}
        onRouteHomePage={() => router.push('/')}
        onRouteResultPage={() => router.push('/result')}
      />
    </PageContainer>
  )
}

interface RenderComponentWithConditionProps {
  condition: QuizStatus
  currentQuiz: Quiz | null
  quizList: Quiz[]
  progressBarPercent: number
  currentQuizNumber: number
  onRouteHomePage: () => void
  onRouteResultPage: () => void
  onInitializeQuiz: () => void
  onSolveQuiz: (userAnswer: string) => void
}

function RenderComponentWithCondition({
  condition,
  currentQuiz,
  quizList,
  progressBarPercent,
  currentQuizNumber,
  onRouteHomePage,
  onRouteResultPage,
  onInitializeQuiz,
  onSolveQuiz,
}: RenderComponentWithConditionProps) {
  switch (condition) {
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
          <Clock />
          <ProgressBar percentage={progressBarPercent} />
          {currentQuiz && (
            <SolveQuiz
              currentQuiz={currentQuiz}
              isLastQuiz={quizList.length === currentQuizNumber}
              handleSolve={(userAnswer) => onSolveQuiz(userAnswer)}
            />
          )}
        </>
      )
    }

    case 'isFinish': {
      return (
        <>
          <Spacing />
          <Stack>
            <Text size="xlg">👏 퀴즈를 모두 풀었어요.</Text>
            <Button onClick={onRouteResultPage}>결과 보기</Button>
            <Button onClick={onInitializeQuiz}>새로운 퀴즈 풀기</Button>
          </Stack>
        </>
      )
    }
    default: {
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
  }
}
