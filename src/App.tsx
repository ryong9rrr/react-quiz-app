import React from 'react'
import { Provider } from 'react-redux'
import Router from './routes/Router'
import { setupStore } from './store'

function App() {
  return (
    <Provider store={setupStore()}>
      <Router />
    </Provider>
  )
}

export default App
