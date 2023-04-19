import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit'

import { quizReducer } from './quizSlice'

const rootReducer = combineReducers({
  quiz: quizReducer,
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
