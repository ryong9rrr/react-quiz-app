import React, { PropsWithChildren } from 'react'
import { Link, MemoryRouter } from 'react-router-dom'
import { render, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import type { PreloadedState } from '@reduxjs/toolkit'

import { AppStore, RootState, setupStore } from '@/store'
import { routeTable } from '@/routes/routeTable'
import Router from '@/routes/Router'

import quizListDataJson from '@/mocks/quizList.json'
import { GenerateQuizResponse } from '@/apis/quizApi'
import { makeQuizListModel } from '@/models/Quiz'

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
            <Link to={routeTable.HOME.path}>go_Home</Link>
          </li>
          <li>
            <Link to={routeTable.QUIZ.path}>go_Quiz</Link>
          </li>
          <li>
            <Link to={routeTable.RESULT.path}>go_Result</Link>
          </li>
          <li>
            <Link to={routeTable.CHECK_NOTE.path}>go_CheckNote</Link>
          </li>
        </ul>
      </nav>
      <Router />
    </>,
  )

export const mockQuiz = (currentQuizIndex: number) => {
  const quizList = makeQuizListModel(quizListDataJson as GenerateQuizResponse)
  const currentQuiz = quizList[currentQuizIndex]
  return { quizList, currentQuiz }
}
