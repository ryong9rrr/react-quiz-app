import React from 'react'
import ProgressBar from '@/_lib/components/ProgressBar'
import Button from '@/_lib/components/Button'
import Stack from '@/_lib/components/Stack'
import Text from '@/_lib/components/Text'
import { useQuizDispatch, QuizActions } from '@/store/quiz/slice'
import { useRouter } from './routing'
import { PageContainer } from './PageContainer'
import SolveQuiz from '@/components/SolveQuiz'
import useQuiz from '@/store/quiz/hook'

export default function SolvePage() {
  const router = useRouter()
  const dispatch = useQuizDispatch()
  const { isClear, progressBarPercent, currentQuizNumber, quizListLength, currentQuiz } = useQuiz()

  const handleClickNewStart = () => {
    dispatch(QuizActions.initialize())
    router.push('/')
  }

  const handleSolve = (userAnswer: string) => {
    dispatch(
      QuizActions.solveQuiz({
        selectedAnswerByUser: userAnswer,
      }),
    )
    if (currentQuizNumber === quizListLength) {
      router.push('/result')
    }
  }

  if (isClear) {
    return (
      <PageContainer title="퀴즈">
        <Stack>
          <Text size="xlg">👏 퀴즈를 모두 풀었어요.</Text>
          <Button onClick={() => router.push('/result')}>결과 보기</Button>
          <Button onClick={handleClickNewStart}>새로운 퀴즈 풀기</Button>
        </Stack>
      </PageContainer>
    )
  }

  if (!currentQuiz) {
    return (
      <PageContainer title="퀴즈">
        <Stack>
          <Text size="xlg">✋ 풀고 있는 퀴즈가 없어요!</Text>
          <Button onClick={() => router.push('/')}>홈으로</Button>
        </Stack>
      </PageContainer>
    )
  }

  return (
    <PageContainer title="퀴즈">
      <>
        <ProgressBar percentage={progressBarPercent} />
        <SolveQuiz
          currentQuiz={currentQuiz}
          isLastQuiz={quizListLength === currentQuizNumber}
          handleSolve={handleSolve}
        />
      </>
    </PageContainer>
  )
}
