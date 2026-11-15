// 15단계 — 서버 상태 라이브러리 TanStack Query
// 이 파일은 Provider 와 차례만 있다 — 예제는 하나씩 따로 있다(Ex1 ~ Ex4). 서버 대신 fakeApi.js 를 쓴다.
//
// QueryClient          — 캐시를 들고 있는 객체. 앱에 하나만 만든다(컴포넌트 밖).
// QueryClientProvider  — 그 client 를 Context 로 아래에 내려준다(11단계 Provider 와 같은 구조).
//                        그래서 예제 넷이 같은 캐시를 함께 쓴다 — ④에서 저장하면 ①·②도 갱신된다.
// state 로 두던 「서버에서 가져온 데이터」를 라이브러리가 맡는다. 화면 state(입력값·탭)는 그대로 useState.

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Ex1Basic from './Ex1Basic.jsx'
import Ex2Cache from './Ex2Cache.jsx'
import Ex3Param from './Ex3Param.jsx'
import Ex4Mutation from './Ex4Mutation.jsx'

const queryClient = new QueryClient()

function Lesson15Query() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>TanStack Query — 서버 데이터 다루기</h1>

      <h3>① useQuery — useFetch 를 라이브러리로</h3>
      <Ex1Basic />

      <h3>② 같은 키는 한 번만 요청 · 다시 마운트하면 캐시로 바로(콘솔)</h3>
      <Ex2Cache />

      <h3>③ 조건을 키에 — 번호마다 따로 캐시</h3>
      <Ex3Param />

      <h3>④ 저장하면 ['posts'] 를 쓰는 ①·② 가 같이 갱신</h3>
      <Ex4Mutation />
    </QueryClientProvider>
  )
}

export default Lesson15Query
