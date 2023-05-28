import React from 'react'
import styled from '@emotion/styled'

import * as Atom from '@/components/atom'
import { Colors } from '@/_lib/constants/theme'
import { convertTimeDiff } from '@/_lib/utils'
import { useRouter } from '@/pages/routing'

interface Props {
  correctCount: number
  inCorrectCount: number
  timeDiff: number
}

export default function QuizResult({ correctCount, inCorrectCount, timeDiff }: Props) {
  const router = useRouter()
  const { hour, min, sec } = convertTimeDiff(timeDiff)

  const handleClickCheckNote = () => {
    router.push('/note')
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
        <li>
          소요 시간 : {hour} 시간 {min} 분 {sec}초
        </li>
      </Container>
    </>
  )
}

const Container = styled.ul`
  border: 1px solid ${Colors.green200};
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
