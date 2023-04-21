import React from 'react'
import { useNavigate } from 'react-router-dom'

import * as Atom from '@/components/atom'
import * as Quiz from '@/components/quiz'
import { routeTable } from '@/routes'
import { useQuizDispatch, useQuizSelector, QuizActions } from '@/store/quizSlice'

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
      <Atom.Prompt text="👏 퀴즈를 모두 풀었어요." style={{ marginTop: '150px' }}>
        <Atom.Button onClick={() => navigate(routeTable.RESULT.path)}>결과 보기</Atom.Button>
        <Atom.Button onClick={handleClickNewStart}>새로운 퀴즈 풀기</Atom.Button>
      </Atom.Prompt>
    )
  }

  if (!quiz.currentQuiz) {
    return (
      <Atom.Prompt text="✋ 풀고 있는 퀴즈가 없어요!" style={{ marginTop: '150px' }}>
        <Atom.Button onClick={() => navigate(routeTable.HOME.path)}>홈으로</Atom.Button>
      </Atom.Prompt>
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
      <Atom.ProgressBar value={Math.round((currentQuizNumber / quizListLength) * 100)} />
      <Atom.Spacer height={20} />
      <Quiz.QuizSelect
        currentQuiz={quiz.currentQuiz}
        isLastQuiz={quizListLength === currentQuizNumber}
        handleSolve={handleSolve}
      />
    </div>
  )
}
