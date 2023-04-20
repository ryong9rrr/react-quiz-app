import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'

import { quizReducer } from './quizSlice'

const persistConfig = {
  key: 'react-quiz-app',
  storage: storageSession,
}

const rootReducer = combineReducers({
  quiz: quizReducer,
})

const persisedReducer = persistReducer(persistConfig, rootReducer)

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: persisedReducer,
    preloadedState,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
