import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'
import { server } from './src/_lib/server/node'

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
})

afterAll(() => server.close())
