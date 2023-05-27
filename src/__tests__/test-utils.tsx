import React, { PropsWithChildren } from 'react'
import { Link, MemoryRouter } from 'react-router-dom'
import { render, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import type { PreloadedState } from '@reduxjs/toolkit'

import quizListDataJson from '@/mocks/quizList.json'
import { AppStore, RootState, setupStore } from '@/store'
import { GenerateQuizResponse } from '@/apis/quizApi.types'
import { modelBuilder } from '@/models/Quiz'
import { Routes } from '@/pages/Routes'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  // eslint-disable-next-line
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <MemoryRouter>
        <Provider store={store}>{children}</Provider>
      </MemoryRouter>
    )
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export const renderWithRouter = () =>
  renderWithProviders(
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">go_Home</Link>
          </li>
          <li>
            <Link to="/quiz">go_Quiz</Link>
          </li>
          <li>
            <Link to="/result">go_Result</Link>
          </li>
          <li>
            <Link to="/check-note">go_CheckNote</Link>
          </li>
        </ul>
      </nav>
      <Routes />
    </>,
  )

export const mockQuiz = (currentQuizIndex: number) => {
  const quizList = modelBuilder.toQuizList(quizListDataJson as GenerateQuizResponse)
  const currentQuiz = quizList[currentQuizIndex]
  return { quizList, currentQuiz }
}
