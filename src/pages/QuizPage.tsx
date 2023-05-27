import React from 'react'

import * as Atom from '@/components/atom'
import * as Quiz from '@/components/quiz'
import { useQuizDispatch, QuizActions } from '@/store/quizSlice'
import { useQuiz } from '@/hooks'
import { useRouter } from './routing'

export default function QuizPage() {
  const router = useRouter()
  const dispatch = useQuizDispatch()
  const { isClear, isSolving, progressBarPercent, currentQuizNumber, quizListLength, currentQuiz } =
    useQuiz()

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
      <Atom.Prompt text="👏 퀴즈를 모두 풀었어요." style={{ marginTop: '150px' }}>
        <Atom.Button onClick={() => router.push('/result')}>결과 보기</Atom.Button>
        <Atom.Button onClick={handleClickNewStart}>새로운 퀴즈 풀기</Atom.Button>
      </Atom.Prompt>
    )
  }

  if (!isSolving) {
    return (
      <Atom.Prompt text="✋ 풀고 있는 퀴즈가 없어요!" style={{ marginTop: '150px' }}>
        <Atom.Button onClick={() => router.push('/')}>홈으로</Atom.Button>
      </Atom.Prompt>
    )
  }

  return (
    <div style={{ marginTop: '50px' }}>
      <Atom.ProgressBar value={progressBarPercent} />
      <Atom.Spacer height={20} />
      <Quiz.QuizSelect
        currentQuiz={currentQuiz!}
        isLastQuiz={quizListLength === currentQuizNumber}
        handleSolve={handleSolve}
      />
    </div>
  )
}
