import React from 'react'
import styled from '@emotion/styled'

import * as Atom from '@/components/atom'
import * as Quiz from '@/components/quiz'
import { useQuizDispatch, QuizActions } from '@/store/quizSlice'
import { useQuiz } from '@/hooks'
import { useRouter } from './routing'

export default function ResultPage() {
  const router = useRouter()
  const dispatch = useQuizDispatch()
  const { isClear, isSolving, isNotStart, correctCount, inCorrectCount, startTime, endTime } =
    useQuiz()

  const handleClickNewStart = () => {
    dispatch(QuizActions.initialize())
    router.push('/')
  }

  if (isNotStart) {
    return (
      <Atom.Prompt text="✋ 풀고 있는 퀴즈가 없어요." style={{ marginTop: '150px' }}>
        <Atom.Button onClick={() => router.push('/')}>홈으로</Atom.Button>
      </Atom.Prompt>
    )
  }

  if (isSolving || !isClear) {
    return (
      <Atom.Prompt text="✋ 아직 퀴즈를 다 풀지 않았어요!" style={{ marginTop: '150px' }}>
        <Atom.Button size="lg" onClick={() => router.push('/quiz')}>
          이어서 풀기
        </Atom.Button>
        <Atom.Button size="lg" onClick={handleClickNewStart}>
          새로운 퀴즈 풀기
        </Atom.Button>
      </Atom.Prompt>
    )
  }

  return (
    <div style={{ marginTop: '20px' }}>
      <Atom.Text size="xlg" bold style={{ marginBottom: '20px' }}>
        👏 수고하셨습니다.
      </Atom.Text>
      <Quiz.ResultSummary
        inCorrectCount={inCorrectCount}
        correctCount={correctCount}
        timeDiff={endTime - startTime}
      />
      <Quiz.ResultChart correctCount={correctCount} inCorrectCount={inCorrectCount} />
      <ButtonContainer>
        <Atom.Button onClick={handleClickNewStart}>새로운 퀴즈 풀기</Atom.Button>
      </ButtonContainer>
    </div>
  )
}

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
`
