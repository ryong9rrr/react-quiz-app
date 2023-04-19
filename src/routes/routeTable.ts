import React from 'react'

import HomePage from '@/pages/HomePage'
import QuizPage from '@/pages/QuizPage'
import ResultPage from '@/pages/ResultPage'
import CheckNotePage from '@/pages/CheckNotePage'
import NotFoundPage from '@/pages/NotFoundPage'

export const routeTable = {
  HOME: {
    path: '/',
    title: '홈 | Mini-Quiz',
    renderPage: () => HomePage,
  },
  QUIZ: {
    path: '/quiz',
    title: '퀴즈 | Mini-Quiz',
    renderPage: () => QuizPage,
  },
  RESULT: {
    path: '/result',
    title: '퀴즈 결과 | Mini-Quiz',
    renderPage: () => ResultPage,
  },
  CHECK_NOTE: {
    path: '/check-note',
    title: '오답 노트 | Mini-Quiz',
    renderPage: () => CheckNotePage,
  },
  NOT_FOUND: {
    path: '*',
    title: '404 | Mini-Quiz',
    renderPage: () => NotFoundPage,
  },
} as const
