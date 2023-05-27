import { QuizActions as Actions, QuizState, quizReducer as reducer } from './quizSlice'

import { mockQuiz } from '@/test-utils'
import { GenerateQuizResponse } from '@/apis/quiz'
import quizListDataJson from '../_lib/server/data/quizList.json'
import { modelBuilder } from '@/models/Quiz'

const InitState: QuizState = {
  startTime: 0,
  endTime: 0,
  currentQuiz: null,
  quizList: [],
  solvedQuizList: [],
}

describe('quiz reducer unit test', () => {
  test('초기값 테스트', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(InitState)
  })

  test('initialize()', () => {
    const { quizList, currentQuiz } = mockQuiz(0)
    const prevState: QuizState = {
      startTime: 0,
      endTime: 0,
      currentQuiz,
      quizList,
      solvedQuizList: [],
    }

    expect(reducer(prevState, Actions.initialize())).toEqual(InitState)
  })

  test('startQuiz()', () => {
    const { quizList, currentQuiz } = mockQuiz(0)
    expect(
      reducer(
        InitState,
        Actions.startQuiz({
          quizResponse: quizListDataJson as GenerateQuizResponse,
          startTime: 0,
        }),
      ),
    ).toEqual({
      startTime: 0,
      endTime: 0,
      currentQuiz,
      quizList,
      solvedQuizList: [],
    })
  })

  test('solveQuiz() : 불러온 퀴즈가 없다면 에러를 반환한다.', () => {
    expect(() => {
      reducer(
        InitState,
        Actions.solveQuiz({
          selectedAnswerByUser: 'user answer',
          endTime: 0,
        }),
      )
    }).toThrow('불러온 퀴즈가 없거나 풀고 있는 퀴즈가 없어서 액션을 실행할 수 없습니다.')
  })

  test('solveQuiz() : 풀고 있는 퀴즈가 없다면 에러를 반환한다.', () => {
    expect(() => {
      reducer(
        InitState,
        Actions.solveQuiz({
          selectedAnswerByUser: 'user answer',
          endTime: 0,
        }),
      )
    }).toThrow('불러온 퀴즈가 없거나 풀고 있는 퀴즈가 없어서 액션을 실행할 수 없습니다.')
  })

  test('solveQuiz() : 마지막 퀴즈를 풀면 퀴즈를 모두 푼 상태가 된다. 마지막 퀴즈까지 모두 풀었다면 에러를 반환한다.', () => {
    const { quizList } = mockQuiz(0)
    const solvedQuizList = []
    for (let i = 0; i < quizList.length - 1; i += 1) {
      solvedQuizList.push(modelBuilder.toSolvedQuiz(quizList[i], 'user answer'))
    }
    const lastQuiz = quizList[quizList.length - 1]

    const state: QuizState = {
      startTime: 0,
      endTime: 0,
      currentQuiz: lastQuiz,
      quizList,
      solvedQuizList,
    }

    const nextState = reducer(
      state,
      Actions.solveQuiz({
        selectedAnswerByUser: 'user answer',
        endTime: 0,
      }),
    )
    expect(() => {
      reducer(
        nextState,
        Actions.solveQuiz({
          selectedAnswerByUser: 'user answer',
          endTime: 0,
        }),
      )
    }).not.toThrow('퀴즈를 모두 풀어서 액션을 실행할 수 없습니다.')
  })
})
