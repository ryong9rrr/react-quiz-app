import React from 'react'
import styled from '@emotion/styled'
import { useQuizDispatch, QuizActions } from '@/store/quizSlice'
import { useRouter } from './routing'
import { PageContainer } from './PageContainer'
import Text from '@/_lib/components/Text'
import useQuiz from '@/hooks/useQuiz'
import { Colors } from '@/_lib/constants/theme'
import redCheck from '@/assets/redCheck.svg'
import Button from '@/_lib/components/Button'
import Stack from '@/_lib/components/Stack'
import Spacing from '@/_lib/components/Spacing'

export default function NotePage() {
  const router = useRouter()
  const dispatch = useQuizDispatch()
  const { isClear, isSolving, isNotStart, solvedQuizList } = useQuiz()

  const handleClickNewStart = () => {
    dispatch(QuizActions.initialize())
    router.push('/')
  }

  if (isNotStart) {
    return (
      <PageContainer title="오답노트">
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
      <PageContainer title="오답노트">
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
    <PageContainer title="오답노트">
      <>
        <Title>
          <Text size="xlg" bold>
            📝 오답 노트
          </Text>
          <Button onClick={() => router.push('/result')}>📊 차트 보기</Button>
        </Title>
        <Spacing level={2} />
        <QuizContainer>
          {solvedQuizList.map((quiz) => (
            <Quiz key={quiz.number}>
              {!quiz.isCorrect && (
                <Check>
                  <img src={redCheck} alt="check" />
                </Check>
              )}
              <Text size="lg">
                {quiz.number}번. {quiz.question}
              </Text>
              {[...quiz.incorrect_answers, quiz.correct_answer].sort().map((option) => (
                <QuizOption
                  key={option}
                  correctAnswer={quiz.correct_answer}
                  selectedAnswerByUser={quiz.selectedAnswerByUser}
                  text={option}
                />
              ))}
            </Quiz>
          ))}
        </QuizContainer>
      </>
    </PageContainer>
  )
}

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`

const QuizContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const Quiz = styled.li`
  position: relative;
  box-sizing: border-box;
  border: 1px solid ${Colors.green300};
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Check = styled.div`
  width: 40px;
  height: 40px;

  position: absolute;
  top: -8px;
  left: 0px;
`

function QuizOption({
  text,
  selectedAnswerByUser,
  correctAnswer,
}: {
  text: string
  selectedAnswerByUser: string
  correctAnswer: string
}) {
  if (text === selectedAnswerByUser && selectedAnswerByUser !== correctAnswer) {
    return <Option style={{ border: '2px solid tomato' }}>{text} ❌</Option>
  }

  if (text === correctAnswer) {
    return <Option>{text} ✅</Option>
  }

  return <Option>{text}</Option>
}

const Option = styled.div`
  padding: 10px;
  border: 1px solid gray;
  border-radius: 4px;
`
