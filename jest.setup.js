import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'
import { server } from './src/_lib/server/node'
import { store } from './src/store'
import { QuizActions } from './src/store/quizSlice'

expect.extend(matchers)

HTMLCanvasElement.prototype.getContext = () => {
  return {
    fillRect: vi.fn(),
  }
}

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'bypass' })
})

afterEach(() => {
  cleanup()
  server.resetHandlers()
  store.dispatch(QuizActions.initialize())
})

afterAll(() => server.close())
