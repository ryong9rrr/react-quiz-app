import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Link, MemoryRouter } from 'react-router-dom'
import Router from './Router'
import { PAGE_INFO } from './pages'

function App() {
  return (
    <MemoryRouter>
      <nav>
        <ul>
          <li>
            <Link to={PAGE_INFO.HOME.PATH}>Home</Link>
          </li>
          <li>
            <Link to={PAGE_INFO.QUIZ.PATH}>Quiz</Link>
          </li>
          <li>
            <Link to={PAGE_INFO.RESULT.PATH}>Result</Link>
          </li>
          <li>
            <Link to={PAGE_INFO.CHECK_NOTE.PATH}>CheckNote</Link>
          </li>
          <li>
            <Link to="qwerqwer">404</Link>
          </li>
        </ul>
      </nav>
      <Router />
    </MemoryRouter>
  )
}

describe('Router test: check title', () => {
  test('render HomePage', async () => {
    render(<App />)
    await waitFor(() => {
      expect(document.title).toEqual(PAGE_INFO.HOME.TITLE)
    })
  })

  test('render QuizPage', async () => {
    render(<App />)
    fireEvent.click(screen.getByText('Quiz'))
    await waitFor(() => {
      expect(document.title).toEqual(PAGE_INFO.QUIZ.TITLE)
    })
  })

  test('render ResultPage', async () => {
    render(<App />)
    fireEvent.click(screen.getByText('Result'))
    await waitFor(() => {
      expect(document.title).toEqual(PAGE_INFO.RESULT.TITLE)
    })
  })

  test('render CheckNotePage', async () => {
    render(<App />)
    fireEvent.click(screen.getByText('CheckNote'))
    await waitFor(() => {
      expect(document.title).toEqual(PAGE_INFO.CHECK_NOTE.TITLE)
    })
  })
})
