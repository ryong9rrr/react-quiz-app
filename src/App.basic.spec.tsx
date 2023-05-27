import React, { ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import App from './App'
import * as Api from './apis/quiz'

describe('App basic', () => {
  test('홈 - 퀴즈시작클릭 - 로딩 - 퀴즈페이지진입', async () => {
    const spyOnGetQuizList = vi.spyOn(Api, 'generateQuiz')
    renderWithRouter(<App />, { route: '/' })
    screen.getByText(/퀴즈를 시작해볼까요?/)
    await userEvent.click(screen.getByText(/START/))
    expect(spyOnGetQuizList).toHaveBeenCalled()
    screen.getByText(/퀴즈를 생성 중입니다.../)
    await screen.findByText(/1번 문제/, undefined, { timeout: 3000 })
  })
})

function renderWithRouter(Component: ReactNode, options: { route: string }) {
  return render(<MemoryRouter initialEntries={[options.route]}>{Component}</MemoryRouter>)
}
