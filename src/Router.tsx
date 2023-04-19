import React from 'react'
import { Route, Routes } from 'react-router-dom'
import {
  HomePage,
  QuizPage,
  ResultPage,
  CheckNotePage,
  NotFoundPage,
  PAGE_INFO,
  Page,
} from './pages'

export default function Router() {
  return (
    <Routes>
      <Route
        path={PAGE_INFO.HOME.PATH}
        element={<Page title={PAGE_INFO.HOME.TITLE} pageComponent={<HomePage />} />}
      />
      <Route
        path={PAGE_INFO.QUIZ.PATH}
        element={<Page title={PAGE_INFO.QUIZ.TITLE} pageComponent={<QuizPage />} />}
      />
      <Route
        path={PAGE_INFO.RESULT.PATH}
        element={<Page title={PAGE_INFO.RESULT.TITLE} pageComponent={<ResultPage />} />}
      />
      <Route
        path={PAGE_INFO.CHECK_NOTE.PATH}
        element={<Page title={PAGE_INFO.CHECK_NOTE.TITLE} pageComponent={<CheckNotePage />} />}
      />
      <Route path="*" element={<Page title="404 | Mini-Quiz" pageComponent={<NotFoundPage />} />} />
    </Routes>
  )
}
