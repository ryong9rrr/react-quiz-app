import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'
import { quizReducer } from './quiz/slice'

const persistConfig = {
  key: 'react-quiz-app',
  storage: storageSession,
}

const rootReducer = combineReducers({
  quiz: quizReducer,
})

const persisedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persisedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = typeof store
export type AppDispatch = AppStore['dispatch']
