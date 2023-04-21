export type QuizResponseType = {
  category: string
  type: 'multiple'
  difficulty: 'easy' | 'medium' | 'hard'
  question: string
  correct_answer: string
  incorrect_answers: [string, string, string]
}

export type GenerateQuizResponse = {
  response_code: number
  results: QuizResponseType[]
}
