import React from 'react'
import styled from '@emotion/styled'

import redCheck from '@/assets/redCheck.svg'
import * as Atom from '@/components/atom'
import { SolvedQuiz } from '@/models/Quiz'
import { Colors } from '@/_lib/constants/theme'

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

function QuizItem({ solvedQuiz }: { solvedQuiz: SolvedQuiz }) {
  const options = [...solvedQuiz.incorrect_answers, solvedQuiz.correct_answer].sort()

  return (
    <Item key={solvedQuiz.number}>
      {!solvedQuiz.isCorrect && (
        <Check>
          <img src={redCheck} alt="check" />
        </Check>
      )}
      <Atom.Text size="lg">
        {solvedQuiz.number}번. {solvedQuiz.question}
      </Atom.Text>
      {options.map((option) => (
        <QuizOption
          key={option}
          correctAnswer={solvedQuiz.correct_answer}
          selectedAnswerByUser={solvedQuiz.selectedAnswerByUser}
          text={option}
        />
      ))}
    </Item>
  )
}

export default function CheckNote({ solvedQuizList }: { solvedQuizList: SolvedQuiz[] }) {
  return (
    <Container>
      {solvedQuizList.map((solvedQuiz) => (
        <QuizItem key={solvedQuiz.number} solvedQuiz={solvedQuiz} />
      ))}
    </Container>
  )
}

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const Item = styled.li`
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

const Option = styled.div`
  padding: 10px;
  border: 1px solid gray;
  border-radius: 4px;
`
