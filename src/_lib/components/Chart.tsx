import React from 'react'
import styled from '@emotion/styled'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js'
import { Colors } from '@/_lib/constants/theme'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function ResultChart({ data }: { data: ChartData<'bar', number[], string> }) {
  return (
    <Container>
      <Bar data={data} />
    </Container>
  )
}

const Container = styled.section`
  border: 2px solid ${Colors.green200};
  border-radius: 8px;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`
