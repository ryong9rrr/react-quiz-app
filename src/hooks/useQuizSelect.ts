import { ChangeEvent, useMemo, useState } from 'react'

import { Quiz } from '@/models/Quiz'

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

  return { options, selectedAnswer, handleSelect, isCorrect }
}
