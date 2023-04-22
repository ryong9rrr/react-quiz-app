import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'

import { routeTable } from '@/routes'
import * as Atom from '@/components/atom'
import { PALETTE } from '@/styles/theme'

// type Time = {
//   hour: number
//   min: number
//   sec: number
// }

interface Props {
  correctCount: number
  inCorrectCount: number
}

export default function QuizResult({ correctCount, inCorrectCount }: Props) {
  const navigate = useNavigate()

  const handleClickCheckNote = () => {
    navigate(routeTable.CHECK_NOTE.path)
  }

  return (
    <>
      <Atom.Text size="lg" bold style={{ padding: '16px 0' }}>
        🔎 퀴즈 결과
      </Atom.Text>
      <Container>
        <li>
          틀린 문제 : {inCorrectCount}개
          <Atom.Button size="xsm" onClick={handleClickCheckNote} style={{ padding: '4px' }}>
            📝 오답 노트
          </Atom.Button>
        </li>
        <li>맞은 문제 : {correctCount}개</li>
        <li>소요 시간 : 0 시간 0 분 0초</li>
      </Container>
    </>
  )
}

const Container = styled.ul`
  border: 1px solid ${PALETTE.green[1]};
  border-radius: 8px;
  padding: 4px 16px;
  display: flex;
  flex-direction: column;

  li {
    padding: 12px 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`
