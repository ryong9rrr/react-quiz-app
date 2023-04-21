import * as Page from '@/pages'

const routeTable = {
  HOME: {
    path: '/',
    title: '홈 | Mini-Quiz',
    renderPage: () => Page.HomePage,
  },
  QUIZ: {
    path: '/quiz',
    title: '퀴즈 | Mini-Quiz',
    renderPage: () => Page.QuizPage,
  },
  RESULT: {
    path: '/result',
    title: '퀴즈 결과 | Mini-Quiz',
    renderPage: () => Page.ResultPage,
  },
  CHECK_NOTE: {
    path: '/check-note',
    title: '오답 노트 | Mini-Quiz',
    renderPage: () => Page.CheckNotePage,
  },
  NOT_FOUND: {
    path: '*',
    title: '404 | Mini-Quiz',
    renderPage: () => Page.NotFoundPage,
  },
} as const

export default routeTable
