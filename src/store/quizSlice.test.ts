import { QuizActions as Actions, QuizState, quizReducer as reducer } from './quizSlice'

import quizListDataJson from '@/mocks/quizList.json'
import { Quiz, makeQuizList } from '@/models/Quiz'
import { GenerateQuizResponse } from '@/apis/quizApi'

let currentQuiz: Quiz
let quizList: Quiz[]

const InitState = {
  currentQuiz: null,
  quizList: [],
  solvedQuizList: [],
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
      quizList,
      solvedQuizList: [],
    }

    expect(reducer(undefined, Actions.preFetch(latestState))).toEqual({
      currentQuiz,
      quizList,
      solvedQuizList: [],
    })
  })

  test('initialize()', () => {
    const prevState: QuizState = {
      currentQuiz,
      quizList,
      solvedQuizList: [],
    }

    expect(reducer(prevState, Actions.initialize())).toEqual(InitState)
  })

  test('solveQuiz() : 예외처리...', () => {})
})
