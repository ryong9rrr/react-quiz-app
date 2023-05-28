// src/mocks/handlers.js
import { rest } from 'msw'
import { quizList } from './data/quiz'

export function handlers() {
  return [rest.get('/', getQuizList)]
}

const getQuizList: Parameters<typeof rest.get>[1] = (req, res, ctx) => {
  return res(ctx.json(quizList), ctx.delay(500))
}
