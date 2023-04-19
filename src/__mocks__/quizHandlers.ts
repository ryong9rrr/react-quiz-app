// src/mocks/handlers.js
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import quizListResponseMock from './quizList.json'

const { VITE_QUIZ_API_END_POINT } = import.meta.env

export const handlers = [
  rest.get(VITE_QUIZ_API_END_POINT, (req, res, ctx) => {
    return res(ctx.json(quizListResponseMock), ctx.delay(150))
  }),
]

export const server = setupServer(...handlers)
