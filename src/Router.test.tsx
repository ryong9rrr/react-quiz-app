import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import { renderApp } from './__tests__/test-utils'
import { PAGE_INFO } from './pages'

const App = renderApp()

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
