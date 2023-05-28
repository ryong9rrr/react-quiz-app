import React from 'react'
import styled from '@emotion/styled'
import { useQuizDispatch, QuizActions } from '@/store/quizSlice'
import { useRouter } from './routing'
import { PageContainer } from './PageContainer'
import Text from '@/_lib/components/Text'
import useQuiz from '@/hooks/useQuiz'
import { Colors } from '@/_lib/constants/theme'
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
import { convertTimeDiff } from '@/_lib/utils'
import Button from '@/_lib/components/Button'
import Stack from '@/_lib/components/Stack'
import Spacing from '@/_lib/components/Spacing'

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
      <PageContainer title="결과">
        <Spacing />
        <Stack>
          <Text size="xlg">✋ 풀고 있는 퀴즈가 없어요!</Text>
          <Button onClick={() => router.push('/')}>홈으로</Button>
        </Stack>
      </PageContainer>
    )
  }

  if (isSolving || !isClear) {
    return (
      <PageContainer title="결과">
        <Spacing />
        <Stack>
          <Text size="xlg">✋ 아직 퀴즈를 다 풀지 않았어요!</Text>
          <Button size="lg" onClick={() => router.push('/solve')}>
            이어서 풀기
          </Button>
          <Button size="lg" onClick={handleClickNewStart}>
            새로운 퀴즈 풀기
          </Button>
        </Stack>
      </PageContainer>
    )
  }

  return (
    <PageContainer title="결과">
      <Text size="xlg" bold>
        👏 수고하셨습니다.
      </Text>
      <Spacing level={3} />
      <Text size="lg" bold>
        🔎 퀴즈 결과
      </Text>
      <Spacing level={1} />
      <ResultContainer>
        <li>
          틀린 문제 : {inCorrectCount}개
          <Button size="sm" onClick={() => router.push('/note')}>
            📝 오답 노트
          </Button>
        </li>
        <li>맞은 문제 : {correctCount}개</li>
        <li>
          소요 시간 : {convertTimeDiff(endTime - startTime).hour} 시간{' '}
          {convertTimeDiff(endTime - startTime).min} 분 {convertTimeDiff(endTime - startTime).sec}초
        </li>
      </ResultContainer>
      <Spacing level={2} />
      <Text size="lg" bold>
        📊 차트
      </Text>
      <Spacing level={1} />
      <ResultChart correctCount={correctCount} inCorrectCount={inCorrectCount} />
      <Spacing level={3} />
      <ButtonContainer>
        <Button full onClick={handleClickNewStart}>
          새로운 퀴즈 풀기
        </Button>
      </ButtonContainer>
    </PageContainer>
  )
}
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const makeData = (inCorrectCount: number, correctCount: number) => ({
  labels: [''],
  datasets: [
    {
      label: '틀린 문제',
      data: [inCorrectCount],
      backgroundColor: Colors.red,
    },
    {
      label: '맞은 문제',
      data: [correctCount],
      backgroundColor: Colors.blue,
    },
  ],
})

interface ResultChartProps {
  inCorrectCount: number
  correctCount: number
}

function ResultChart({ inCorrectCount, correctCount }: ResultChartProps) {
  const data = makeData(inCorrectCount, correctCount)

  return (
    <ChartContainer>
      <Bar data={data} />
    </ChartContainer>
  )
}

const ChartContainer = styled.section`
  border: 1px solid ${Colors.green200};
  border-radius: 8px;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ResultContainer = styled.ul`
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
