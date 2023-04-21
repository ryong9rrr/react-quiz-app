import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'

import * as Atom from '@/components/atom'
import { routeTable } from '@/routes'
import { useQuizDispatch, QuizActions } from '@/store/quizSlice'
import { useQuiz } from '@/hooks'

export default function ResultPage() {
  const navigate = useNavigate()
  const dispatch = useQuizDispatch()
  const { isClear, isSolving, isNotStart } = useQuiz()

  const handleClickNewStart = () => {
    dispatch(QuizActions.initialize())
    navigate(routeTable.HOME.path)
  }

  const handleClickContinue = () => {
    navigate(routeTable.QUIZ.path)
  }

  if (isNotStart) {
    return (
      <Atom.Prompt text="✋ 풀고 있는 퀴즈가 없어요." style={{ marginTop: '150px' }}>
        <Atom.Button onClick={() => navigate(routeTable.HOME.path)}>홈으로</Atom.Button>
      </Atom.Prompt>
    )
  }

  if (isSolving || !isClear) {
    return (
      <Atom.Prompt text="✋ 아직 퀴즈를 다 풀지 않았어요!" style={{ marginTop: '150px' }}>
        <Atom.Button size="lg" onClick={handleClickContinue}>
          이어서 풀기
        </Atom.Button>
        <Atom.Button size="lg" onClick={handleClickNewStart}>
          새로운 퀴즈 풀기
        </Atom.Button>
      </Atom.Prompt>
    )
  }

  return (
    <>
      <Atom.Text size="xlg" bold style={{ marginBottom: '20px' }}>
        👏 수고하셨습니다.
      </Atom.Text>
      <ButtonContainer>
        <Atom.Button onClick={handleClickNewStart}>새로운 퀴즈 풀기</Atom.Button>
      </ButtonContainer>
    </>
  )
}

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`
