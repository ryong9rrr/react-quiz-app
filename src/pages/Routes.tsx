import React from 'react'
import { Route, Routes as ReactRouterRoutes } from 'react-router-dom'
import HomePage from './HomePage'
import QuizPage from './QuizPage'
import ResultPage from './ResultPage'
import CheckNotePage from './CheckNotePage'
import NotFoundPage from './NotFoundPage'

export function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<HomePage />} />
      <Route path="/solve" element={<QuizPage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/note" element={<CheckNotePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </ReactRouterRoutes>
  )
}
