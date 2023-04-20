import React from 'react'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import { Link } from 'react-router-dom'

import { renderWithProviders } from '@/__tests__/test-utils'
import { routeTable } from '@/routes/routeTable'
import Router from '@/routes/Router'

const renderApp = () =>
  renderWithProviders(
    <>
      <nav>
        <ul>
          <li>
            <Link to={routeTable.HOME.path}>Home</Link>
          </li>
          <li>
            <Link to={routeTable.QUIZ.path}>Quiz</Link>
          </li>
          <li>
            <Link to={routeTable.RESULT.path}>Result</Link>
          </li>
          <li>
            <Link to={routeTable.CHECK_NOTE.path}>CheckNote</Link>
          </li>
        </ul>
      </nav>
      <Router />
    </>,
  )

describe('Router test: document title을 체크한다.', () => {
  test('HomePage에 접속한다.', async () => {
    renderApp()
    await waitFor(() => {
      expect(document.title).toEqual(routeTable.HOME.title)
    })
  })

  test('QuizPage에 접속한다.', async () => {
    renderApp()
    fireEvent.click(screen.getByText('Quiz'))
    await waitFor(() => {
      expect(document.title).toEqual(routeTable.QUIZ.title)
    })
  })

  test('ResultPage에 접속한다.', async () => {
    renderApp()
    fireEvent.click(screen.getByText('Result'))
    await waitFor(() => {
      expect(document.title).toEqual(routeTable.RESULT.title)
    })
  })

  test('CheckNotePage에 접속한다.', async () => {
    renderApp()
    fireEvent.click(screen.getByText('CheckNote'))
    await waitFor(() => {
      expect(document.title).toEqual(routeTable.CHECK_NOTE.title)
    })
  })
})
