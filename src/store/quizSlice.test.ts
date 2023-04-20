import {
  QuizActions as Actions,
  QuizState,
  makeQuizList,
  quizReducer as reducer,
} from './quizSlice'

import quizListDataJson from '@/__mocks__/quizList.json'
import { Quiz } from '@/models/Quiz'
import { GenerateQuizResponse } from '@/apis/quizApi'

let currentQuiz: Quiz
let quizList: Quiz[]

const InitState = {
  currentQuiz: null,
  quizList: [],
  solvedQuizList: [],
  status: 'idle',
}

describe('quiz reducer unit test', () => {
  beforeEach(() => {
    quizList = makeQuizList(quizListDataJson as GenerateQuizResponse)
    currentQuiz = quizList[0]
  })

  test('초기값 테스트', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(InitState)
  })

  test('preFetch()', () => {
    const latestState: QuizState = {
      currentQuiz,
      status: 'idle',
      quizList,
      solvedQuizList: [],
    }

    expect(reducer(undefined, Actions.preFetch(latestState))).toEqual({
      currentQuiz,
      status: 'idle',
      quizList,
      solvedQuizList: [],
    })
  })

  test('initialize()', () => {
    const prevState: QuizState = {
      currentQuiz,
      status: 'idle',
      quizList,
      solvedQuizList: [],
    }

    expect(reducer(prevState, Actions.initialize())).toEqual(InitState)
  })

  test('solveQuiz() : 예외처리...', () => {})
})
