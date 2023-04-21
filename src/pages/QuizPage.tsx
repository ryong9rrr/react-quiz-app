import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useQuizDispatch, useQuizSelector, QuizActions } from '@/store/quizSlice'
import { routeTable } from '@/routes/routeTable'
import QuizSelect from '@/components/quiz/QuizSelect'
import ProgressBar from '@/components/ProgressBar'
import Spacer from '@/components/Spacer'
import Prompt from '@/components/Prompt'
import Button from '@/components/Button'

export default function QuizPage() {
  const navigate = useNavigate()
  const dispatch = useQuizDispatch()
  const quiz = useQuizSelector()
  const isClear = quiz.quizList.length !== 0 && quiz.quizList.length === quiz.solvedQuizList.length

  const handleClickNewStart = () => {
    dispatch(QuizActions.initialize())
    navigate(routeTable.HOME.path)
  }

  if (isClear) {
    return (
      <Prompt text="👏 퀴즈를 모두 풀었어요." style={{ marginTop: '150px' }}>
        <Button onClick={() => navigate(routeTable.RESULT.path)}>결과 보기</Button>
        <Button onClick={handleClickNewStart}>새로운 퀴즈 풀기</Button>
      </Prompt>
    )
  }

  if (!quiz.currentQuiz) {
    return (
      <Prompt text="✋ 풀고 있는 퀴즈가 없어요!" style={{ marginTop: '150px' }}>
        <Button onClick={() => navigate(routeTable.HOME.path)}>홈으로</Button>
      </Prompt>
    )
  }

  const quizListLength = quiz.quizList.length
  const currentQuizNumber = quiz.currentQuiz.number

  const handleSolve = (userAnswer: string) => {
    dispatch(QuizActions.solveQuiz(userAnswer))
    if (currentQuizNumber === quizListLength) {
      navigate(routeTable.RESULT.path)
    }
  }

  return (
    <div style={{ marginTop: '50px' }}>
      <ProgressBar value={Math.round((currentQuizNumber / quizListLength) * 100)} />
      <Spacer height={20} />
      <QuizSelect
        currentQuiz={quiz.currentQuiz}
        isLastQuiz={quizListLength === currentQuizNumber}
        handleSolve={handleSolve}
      />
    </div>
  )
}
