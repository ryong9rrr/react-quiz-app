# ✅ react-quiz-app

- `https://opentdb.com` 에서 제공하는 오픈 소스 API를 이용하여 구현한 퀴즈 앱입니다.

- 배포 링크 : https://react-quiz-app-lemon.vercel.app/

## Demo

<img src="docs/demo.gif" />

## Skills

- `react-typescript(Vite)` `eslint` `prettier`

- `react-router-dom` `emotion` `Chart.js` `redux-toolkit`

- `Jest(Vitest)` `react-testing-library` `msw`

## 실행 방법

이 저장소를 클론하고 의존성 모듈을 설치해주세요.

```
1. git clone ...

2. yarn install
```

- `jest`로 App 통합 테스트 환경

  1. `yarn msw`
  2. `yarn test`

- msw 개발 환경

  1. `yarn msw` (이미 실행했다면 실행하지 않아도 됩니다.)
  2. `yarn dev:msw`

- 일반 개발 환경
  1. `yarn dev`
