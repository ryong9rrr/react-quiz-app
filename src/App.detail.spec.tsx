import React, { ReactNode } from 'react'
import { Link, MemoryRouter } from 'react-router-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { vi } from 'vitest'
import { server } from './_lib/server/node'
import App from './App'
import * as Api from './apis/quiz'

describe('App detail', () => {
  test('1-1. 홈페이지: 문제를 불러오다가 오류가 발생하면 사용자에게 재시도를 요청한다.', async () => {
    server.use(rest.get('/', (req, res, ctx) => res(ctx.status(400), ctx.delay(500))))
    const spyOnGetQuizList = vi.spyOn(Api, 'generateQuiz')
    renderWithRouter(<App />, { route: '/' })
    screen.getByText(/퀴즈를 시작해볼까요?/)
    await userEvent.click(screen.getByText(/START/))
    expect(spyOnGetQuizList).toHaveBeenCalled()
    await screen.findByText(/퀴즈를 생성 중입니다.../)
    await screen.findByText(/퀴즈를 불러오는데 실패했습니다. 다시 시도해주세요./)
    screen.getByRole('button', { name: /다시 시도/ })
  })

  test('1-2. 홈페이지: 문제를 풀다가 강제진입하면 이어서 풀거나 새롭게 시작할 수 있다.', async () => {
    const spyOnGetQuizList = vi.spyOn(Api, 'generateQuiz')
    renderWithRouter(<App />, { route: '/' })
    screen.getByText(/퀴즈를 시작해볼까요?/)
    await userEvent.click(screen.getByText(/START/))
    expect(spyOnGetQuizList).toHaveBeenCalled()
    await screen.findByText(/퀴즈를 생성 중입니다.../)
    await screen.findByText(/1번 문제/)
    await screen.findByText(/Elbow/)

    await userEvent.click(screen.getByTestId('HOME_LINK'))
    await screen.findByText(/이미 풀고 있는 퀴즈가 있습니다./)
    screen.getByRole('button', { name: /이어서 풀기/ })
    screen.getByRole('button', { name: /새로운 퀴즈 풀기/ })
  })

  test('1-3. 홈페이지: 문제를 모두 풀고 강제진입하면 결과페이지로 이동하거나 새롭게 시작할 수 있음', async () => {
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

    await userEvent.click(screen.getByTestId('HOME_LINK'))
    await screen.findByText(/퀴즈를 모두 풀었어요./)
    screen.getByRole('button', { name: /결과 보기/ })
    screen.getByRole('button', { name: /새로운 퀴즈 풀기/ })
  })

  test('2-1. 문제풀이 페이지: 문제를 생성하지 않았는데 강제진입하면 홈으로 유도한다.', async () => {
    renderWithRouter(<App />, { route: '/quiz' })
    await screen.findByText(/풀고 있는 퀴즈가 없어요!/)
    screen.getByRole('button', { name: /홈으로/ })
  })

  test('2-2. 문제풀이 페이지 - 문제를 모두 풀고 진입하면 결과페이지로 이동하거나 새롭게 시작할 수 있음', async () => {
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

    await userEvent.click(screen.getByTestId('QUIZ_LINK'))
    await screen.findByText(/퀴즈를 모두 풀었어요./)
    screen.getByRole('button', { name: /결과 보기/ })
    screen.getByRole('button', { name: /새로운 퀴즈 풀기/ })
  })

  test('3-1. 결과페이지 - 문제를 생성하지 않았는데 강제진입하면 홈으로 유도한다.', async () => {
    renderWithRouter(<App />, { route: '/result' })
    await screen.findByText(/풀고 있는 퀴즈가 없어요!/)
    screen.getByRole('button', { name: /홈으로/ })
  })

  test('3-2. 결과페이지 - 문제를 다 풀지 않았는데 강제진입하면 문제풀이 페이지나 홈으로 유도한다.', async () => {
    const spyOnGetQuizList = vi.spyOn(Api, 'generateQuiz')
    renderWithRouter(<App />, { route: '/' })
    screen.getByText(/퀴즈를 시작해볼까요?/)
    await userEvent.click(screen.getByText(/START/))
    expect(spyOnGetQuizList).toHaveBeenCalled()
    await screen.findByText(/퀴즈를 생성 중입니다.../)
    await screen.findByText(/1번 문제/)
    await screen.findByText(/Elbow/)

    await userEvent.click(screen.getByTestId('RESULT_LINK'))
    await screen.findByText(/아직 퀴즈를 다 풀지 않았어요!/)
    screen.getByRole('button', { name: /이어서 풀기/ })
    screen.getByRole('button', { name: /새로운 퀴즈 풀기/ })
  })

  test('4-1. 오답노트페이지 - 문제를 생성하지 않았는데 강제진입하면 홈으로 유도한다.', async () => {
    renderWithRouter(<App />, { route: '/check-note' })
    await screen.findByText(/풀고 있는 퀴즈가 없어요!/)
    screen.getByRole('button', { name: /홈으로/ })
  })

  test('4-2. 오답노트페이지 - 문제를 다 풀지 않았는데 강제진입하면 문제풀이 페이지나 홈으로 유도한다.', async () => {
    const spyOnGetQuizList = vi.spyOn(Api, 'generateQuiz')
    renderWithRouter(<App />, { route: '/' })
    screen.getByText(/퀴즈를 시작해볼까요?/)
    await userEvent.click(screen.getByText(/START/))
    expect(spyOnGetQuizList).toHaveBeenCalled()
    await screen.findByText(/퀴즈를 생성 중입니다.../)
    await screen.findByText(/1번 문제/)
    await screen.findByText(/Elbow/)

    await userEvent.click(screen.getByTestId('CHECK_NOTE_LINK'))
    await screen.findByText(/아직 퀴즈를 다 풀지 않았어요!/)
    screen.getByRole('button', { name: /이어서 풀기/ })
    screen.getByRole('button', { name: /새로운 퀴즈 풀기/ })
  })
})

function renderWithRouter(Component: ReactNode, options: { route: string }) {
  return render(
    <MemoryRouter initialEntries={[options.route]}>
      <>
        <Link data-testid="HOME_LINK" to="/" />
        <Link data-testid="QUIZ_LINK" to="/quiz" />
        <Link data-testid="RESULT_LINK" to="/result" />
        <Link data-testid="CHECK_NOTE_LINK" to="/check-note" />
      </>
      {Component}
    </MemoryRouter>,
  )
}
