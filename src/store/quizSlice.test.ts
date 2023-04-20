import { QuizActions as Actions, QuizState, quizReducer as reducer } from './quizSlice'

import quizListDataJson from '@/mocks/quizList.json'
import { Quiz, makeQuizList, makeSolvedQuizData } from '@/models/Quiz'
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

  test('startQuiz()', () => {
    const prevState: QuizState = {
      currentQuiz: null,
      quizList: [],
      solvedQuizList: [],
    }

    expect(reducer(prevState, Actions.startQuiz(quizListDataJson as GenerateQuizResponse))).toEqual(
      {
        currentQuiz,
        quizList,
        solvedQuizList: [],
      },
    )
  })

  test('solveQuiz() : 불러온 퀴즈가 없다면 에러를 반환한다.', () => {
    const state: QuizState = {
      currentQuiz,
      quizList: [],
      solvedQuizList: [],
    }

    expect(() => {
      reducer(state, Actions.solveQuiz('user answer'))
    }).toThrow('불러온 퀴즈가 없거나 풀고 있는 퀴즈가 없어서 액션을 실행할 수 없습니다.')
  })

  test('solveQuiz() : 풀고 있는 퀴즈가 없다면 에러를 반환한다.', () => {
    const state: QuizState = {
      currentQuiz: null,
      quizList,
      solvedQuizList: [],
    }

    expect(() => {
      reducer(state, Actions.solveQuiz('user answer'))
    }).toThrow('불러온 퀴즈가 없거나 풀고 있는 퀴즈가 없어서 액션을 실행할 수 없습니다.')
  })

  test('solveQuiz() : 마지막 퀴즈를 풀면 퀴즈를 모두 푼 상태가 된다. 마지막 퀴즈까지 모두 풀었다면 에러를 반환한다.', () => {
    const solvedQuizList = []
    for (let i = 0; i < quizList.length - 1; i += 1) {
      solvedQuizList.push(makeSolvedQuizData(quizList[i], 'user answer'))
    }
    const lastQuiz = quizList[quizList.length - 1]

    const state: QuizState = {
      currentQuiz: lastQuiz,
      quizList,
      solvedQuizList,
    }

    const nextState = reducer(state, Actions.solveQuiz('user answer'))

    expect(() => {
      reducer(nextState, Actions.solveQuiz('user answer'))
    }).not.toThrow('퀴즈를 모두 풀어서 액션을 실행할 수 없습니다.')
  })
})
