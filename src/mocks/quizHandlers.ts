// src/mocks/handlers.js
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import quizListResponseMock from './quizList.json'

const { VITE_QUIZ_API_END_POINT } = import.meta.env

export const handlers = {
  generateQuizForSuccess: rest.get(VITE_QUIZ_API_END_POINT, (req, res, ctx) => {
    return res(ctx.json(quizListResponseMock), ctx.delay(150))
  }),
  generateQuizForError: rest.get(VITE_QUIZ_API_END_POINT, (req, res, ctx) => {
    return res(ctx.status(400))
  }),
}

export const server = setupServer(...Object.values(handlers))
