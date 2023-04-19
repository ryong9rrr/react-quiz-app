import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { routeTable } from './routeTable'
import Page from './Page'

export default function Router() {
  return (
    <Routes>
      <Route path={routeTable.HOME.path} element={<Page route={routeTable.HOME} />} />
      <Route path={routeTable.QUIZ.path} element={<Page route={routeTable.QUIZ} />} />
      <Route path={routeTable.RESULT.path} element={<Page route={routeTable.RESULT} />} />
      <Route path={routeTable.CHECK_NOTE.path} element={<Page route={routeTable.CHECK_NOTE} />} />
      <Route path={routeTable.NOT_FOUND.path} element={<Page route={routeTable.NOT_FOUND} />} />
    </Routes>
  )
}
