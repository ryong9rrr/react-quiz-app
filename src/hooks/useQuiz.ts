import { useEffect, useState } from 'react'
import { useRouter } from '@/pages/routing'
import * as QuizApi from '@/apis/quiz'
import { useQuizDispatch, useQuizSelector, QuizActions } from '@/store/quiz/slice'
import { quit } from './useClock'

export type QuizStatus = 'loading' | 'error' | 'isSolving' | 'isFinish' | 'idle'

export default function useQuiz() {
  const router = useRouter()
  const [quizStatus, setQuizStatus] = useState<QuizStatus>('idle')
  const { currentQuiz, quizList, solvedQuizList } = useQuizSelector()
  const dispatch = useQuizDispatch()

  const progressBarPercent = !currentQuiz
    ? 0
    : Math.round((currentQuiz.number / quizList.length) * 100)

  const currentQuizNumber = currentQuiz ? currentQuiz.number : -1

  const correctCount = solvedQuizList.filter(
    (quiz) => quiz.correct_answer === quiz.selectedAnswerByUser,
  ).length
  const inCorrectCount = solvedQuizList.length - correctCount

  const onStartQuiz = async () => {
    setQuizStatus('loading')
    try {
      const { results } = await QuizApi.generateQuiz()
      dispatch(
        QuizActions.startQuiz({
          servedQuizList: results,
        }),
      )
      setQuizStatus('idle')
      router.push('/solve')
    } catch (e) {
      setQuizStatus('error')
    }
  }

  const onInitializeQuiz = () => {
    dispatch(QuizActions.initialize())
    setQuizStatus('idle')
    router.push('/')
  }

  const onSolveQuiz = (userAnswer: string) => {
    dispatch(
      QuizActions.solveQuiz({
        selectedAnswerByUser: userAnswer,
      }),
    )

    if (currentQuizNumber === quizList.length) {
      setQuizStatus('isFinish')
      router.push('/result')
      quit()
      return
    }

    setQuizStatus('isSolving')
  }

  useEffect(() => {
    if (quizList.length !== 0 && !currentQuiz && quizList.length === solvedQuizList.length) {
      setQuizStatus('isFinish')
      return
    }

    if (quizList.length !== 0 && currentQuiz && quizStatus !== 'isFinish') {
      setQuizStatus('isSolving')
    }
  }, [currentQuiz, quizList, quizStatus, solvedQuizList])

  return {
    quizStatus,
    quizList,
    currentQuiz,
    solvedQuizList,
    progressBarPercent,
    currentQuizNumber,
    correctCount,
    inCorrectCount,

    onStartQuiz,
    onInitializeQuiz,
    onSolveQuiz,
  }
}
