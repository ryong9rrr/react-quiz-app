import React from 'react'
import { Route, Routes as ReactRouterRoutes } from 'react-router-dom'
import HomePage from './HomePage'
import SolvePage from './SolvePage'
import ResultPage from './ResultPage'
import NotePage from './NotePage'
import Page404 from './Page404'

export function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<HomePage />} />
      <Route path="/solve" element={<SolvePage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/note" element={<NotePage />} />
      <Route path="*" element={<Page404 />} />
    </ReactRouterRoutes>
  )
}
