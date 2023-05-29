import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { Quiz } from '@/store/quiz/types'

export default function useQuizSelect(currentQuiz: Quiz) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const { incorrect_answers, correct_answer } = currentQuiz

  const options = useMemo(
    () => [...incorrect_answers, correct_answer].sort(),
    [incorrect_answers, correct_answer],
  )

  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(e.target.value)
  }

  const isCorrect = selectedAnswer === correct_answer

  useEffect(() => {
    setSelectedAnswer(null)
  }, [currentQuiz])

  return { options, selectedAnswer, handleSelect, isCorrect }
}
