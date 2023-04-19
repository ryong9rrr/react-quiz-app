import React from 'react'
import { Link, MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from '@/store'
import Router from '@/routes/Router'
import { routeTable } from '@/routes/routeTable'

export function renderApp() {
  return function App() {
    return (
      <MemoryRouter>
        <Provider store={store}>
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
