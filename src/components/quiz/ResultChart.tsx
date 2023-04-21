import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import styled from '@emotion/styled'

import * as Atom from '@/components/atom'
import { PALETTE } from '@/styles/theme'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const makeData = (inCorrectCount: number, correctCount: number) => ({
  labels: [''],
  datasets: [
    {
      label: '틀린 문제',
      data: [inCorrectCount],
      backgroundColor: PALETTE.red,
    },
    {
      label: '맞은 문제',
      data: [correctCount],
      backgroundColor: PALETTE.blue,
    },
  ],
})

interface Props {
  inCorrectCount: number
  correctCount: number
}

export default function QuizChart({ inCorrectCount, correctCount }: Props) {
  const data = makeData(inCorrectCount, correctCount)

  return (
    <>
      <Atom.Text size="lg" bold style={{ padding: '16px 0' }}>
        📊 차트
      </Atom.Text>
      <Container>
        <Bar data={data} />
      </Container>
    </>
  )
}

const Container = styled.section`
  border: 1px solid ${PALETTE.green[1]};
  border-radius: 8px;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`
