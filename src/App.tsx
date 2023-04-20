import React, { useEffect } from 'react'

import Router from './routes/Router'
import { useQuizDispatch, QuizActions } from './store/quizSlice'
import { getData } from './storages/quizStorage'

const preloadedState = getData()

function App() {
  const dispatch = useQuizDispatch()

  useEffect(() => {
    dispatch(QuizActions.preFetch(preloadedState))
  }, [dispatch])

  return <Router />
}

export default App
