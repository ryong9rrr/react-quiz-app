import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter, Link } from 'react-router-dom'
import { PATH } from './pages'
import Router from './Router'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to={PATH.HOME}>Home</Link>
          </li>
          <li>
            <Link to={PATH.QUIZ}>Quiz</Link>
          </li>
          <li>
            <Link to={PATH.RESULT}>Result</Link>
          </li>
          <li>
            <Link to={PATH.CHECK_NOTE}>CheckNote</Link>
          </li>
          <li>
            <Link to="qwerqwer">404</Link>
          </li>
        </ul>
      </nav>
      <Router />
    </BrowserRouter>
  )
}

describe('Router test', () => {
  test('render HomePage', () => {
    render(<App />)
    screen.getByText(/HomePage/i)
  })

  test('render QuizPage', async () => {
    render(<App />)
    fireEvent.click(screen.getByText('Quiz'))
    await waitFor(() => {
      screen.getByText(/QuizPage/i)
    })
  })

  test('render ResultPage', async () => {
    render(<App />)
    fireEvent.click(screen.getByText('Result'))
    await waitFor(() => {
      screen.getByText(/ResultPage/i)
    })
  })

  test('render CheckNotePage', async () => {
    render(<App />)
    fireEvent.click(screen.getByText('CheckNote'))
    await waitFor(() => {
      screen.getByText(/CheckNotePage/i)
    })
  })

  test('render 404', async () => {
    render(<App />)
    fireEvent.click(screen.getByText('404'))
    await waitFor(() => {
      screen.getByText(/존재하지 않는 페이지입니다./i)
    })
  })
})
