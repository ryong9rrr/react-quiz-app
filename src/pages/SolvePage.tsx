import React from 'react'
import { useQuizDispatch, QuizActions, useQuizSelector } from '@/store/quiz/slice'
import { useRouter } from './routing'
import { PageContainer } from './PageContainer'
import ProgressBar from '@/_lib/components/ProgressBar'
import QuizSelect from '@/components/QuizSelect'
import Button from '@/_lib/components/Button'
import Stack from '@/_lib/components/Stack'
import Text from '@/_lib/components/Text'
import quizHelper from '@/store/quiz/helper'

export default function SolvePage() {
  const router = useRouter()
  const dispatch = useQuizDispatch()
  const { isClear, isSolving, progressBarPercent, currentQuizNumber, quizListLength, currentQuiz } =
    quizHelper(useQuizSelector())

  const handleClickNewStart = () => {
    dispatch(QuizActions.initialize())
    router.push('/')
  }

  const handleSolve = (userAnswer: string) => {
    dispatch(
      QuizActions.solveQuiz({
        selectedAnswerByUser: userAnswer,
        endTime: Date.now(),
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

  if (!isSolving) {
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
        <QuizSelect
          currentQuiz={currentQuiz!}
          isLastQuiz={quizListLength === currentQuizNumber}
          handleSolve={handleSolve}
        />
      </>
    </PageContainer>
  )
}
