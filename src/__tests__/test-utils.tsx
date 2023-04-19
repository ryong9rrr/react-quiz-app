import React from 'react'
import { Link, MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from '@/store'
import { PAGE_INFO } from '@/pages'
import Router from '@/Router'

export function renderApp() {
  return function App() {
    return (
      <MemoryRouter>
        <Provider store={store}>
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
        </Provider>
      </MemoryRouter>
    )
  }
}
