import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import { renderApp } from '@/__tests__/test-utils'
import { routeTable } from './routeTable'

const App = renderApp()

describe('Router test: check title', () => {
  test('render HomePage', async () => {
    render(<App />)
    await waitFor(() => {
      expect(document.title).toEqual(routeTable.HOME.title)
    })
  })

  test('render QuizPage', async () => {
    render(<App />)
    fireEvent.click(screen.getByText('Quiz'))
    await waitFor(() => {
      expect(document.title).toEqual(routeTable.QUIZ.title)
    })
  })

  test('render ResultPage', async () => {
    render(<App />)
    fireEvent.click(screen.getByText('Result'))
    await waitFor(() => {
      expect(document.title).toEqual(routeTable.RESULT.title)
    })
  })

  test('render CheckNotePage', async () => {
    render(<App />)
    fireEvent.click(screen.getByText('CheckNote'))
    await waitFor(() => {
      expect(document.title).toEqual(routeTable.CHECK_NOTE.title)
    })
  })
})
