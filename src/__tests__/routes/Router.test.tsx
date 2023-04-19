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

describe('Router test: check title', () => {
  test('render HomePage', async () => {
    renderApp()
    await waitFor(() => {
      expect(document.title).toEqual(routeTable.HOME.title)
    })
  })

  test('render QuizPage', async () => {
    renderApp()
    fireEvent.click(screen.getByText('Quiz'))
    await waitFor(() => {
      expect(document.title).toEqual(routeTable.QUIZ.title)
    })
  })

  test('render ResultPage', async () => {
    renderApp()
    fireEvent.click(screen.getByText('Result'))
    await waitFor(() => {
      expect(document.title).toEqual(routeTable.RESULT.title)
    })
  })

  test('render CheckNotePage', async () => {
    renderApp()
    fireEvent.click(screen.getByText('CheckNote'))
    await waitFor(() => {
      expect(document.title).toEqual(routeTable.CHECK_NOTE.title)
    })
  })
})
