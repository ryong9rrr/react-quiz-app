import React, { ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import App from './App'
import * as Api from './apis/quiz'
import { store } from './store'
import { QuizActions } from './store/quiz/slice'

beforeEach(() => {
  store.dispatch(QuizActions.initialize())
})

describe('App basic', () => {
  test('홈페이지 - 퀴즈시작 클릭 - 로딩 - 문제풀이 페이지 진입 - 문제 풀이 - 결과 페이지 진입 - 오답 노트 페이지 진입', async () => {
    const spyOnGetQuizList = vi.spyOn(Api, 'generateQuiz')
    renderWithRouter(<App />, { route: '/' })
    screen.getByText(/퀴즈를 시작해볼까요?/)
    await userEvent.click(screen.getByText(/START/))
    expect(spyOnGetQuizList).toHaveBeenCalled()
    await screen.findByText(/퀴즈를 생성 중입니다.../)

    await screen.findByText(/1번 문제/)
    await userEvent.click(await screen.findByText(/Elbow/))
    await screen.findByText(/정답입니다!/)
    await userEvent.click(await screen.findByRole('button', { name: /다음 문제/ }))
    await screen.findByText(/2번 문제/)
    await userEvent.click(await screen.findByText(/Ruby/))
    await screen.findByText(/다시 생각해보세요./)
    await userEvent.click(await screen.findByRole('button', { name: /결과 보기/ }))

    await screen.findByText(/수고하셨습니다./)
    screen.getByText(/퀴즈 결과/)
    screen.getByText(/틀린 문제 : 1개/)
    screen.getByText(/맞은 문제 : 1개/)
    await userEvent.click(screen.getByRole('button', { name: /오답 노트/ }))

    await screen.findByText(/오답 노트/)
    screen.getByRole('button', { name: /차트 보기/ })
    screen.getByText(/Elbow ✅/)
    screen.getByText(/Objective-C ✅/)
    screen.getByText(/Ruby ❌/)
  })
})

function renderWithRouter(Component: ReactNode, options: { route: string }) {
  return render(<MemoryRouter initialEntries={[options.route]}>{Component}</MemoryRouter>)
}
