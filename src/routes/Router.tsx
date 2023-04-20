import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { routeTable } from './routeTable'
import PageWrapper from './PageWrapper'

export default function Router() {
  return (
    <Routes>
      <Route path={routeTable.HOME.path} element={<PageWrapper route={routeTable.HOME} />} />
      <Route path={routeTable.QUIZ.path} element={<PageWrapper route={routeTable.QUIZ} />} />
      <Route path={routeTable.RESULT.path} element={<PageWrapper route={routeTable.RESULT} />} />
      <Route
        path={routeTable.CHECK_NOTE.path}
        element={<PageWrapper route={routeTable.CHECK_NOTE} />}
      />
      <Route
        path={routeTable.NOT_FOUND.path}
        element={<PageWrapper route={routeTable.NOT_FOUND} />}
      />
    </Routes>
  )
}
