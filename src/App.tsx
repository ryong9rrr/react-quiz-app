import React from 'react'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { store } from './store'
import { Routes } from './pages/Routes'
import { PageLayout } from './pages/PageLayout'

const persistor = persistStore(store)

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PageLayout>
          <Routes />
        </PageLayout>
      </PersistGate>
    </Provider>
  )
}
