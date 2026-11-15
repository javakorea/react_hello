// 12단계 — 커스텀 hook: state·effect 가 든 로직을 함수로 빼서 여러 컴포넌트가 쓰기
// 이 파일은 차례만 있다 — 예제는 하나씩 따로 있다(Ex1 ~ Ex5). 예제 하나만 띄우려면 main.jsx 의 import 를
// './lesson12/Ex2Toggle.jsx' 처럼 바꾼다.
//
// 핵심: 이름이 use 로 시작하고 안에서 다른 hook 을 부르는 함수 = 커스텀 hook. 새 문법이 아니라 보통 함수다.
//       hook 은 로직을 공유하지 state 를 공유하지 않는다 — 부르는 컴포넌트마다 state 가 따로 생긴다(④).
// 규칙: hook 은 컴포넌트나 다른 hook 의 맨 위 단계에서만 부른다(조건·반복·이벤트 함수 안 금지).

import Ex1Copy from './Ex1Copy.jsx'
import Ex2Toggle from './Ex2Toggle.jsx'
import Ex3Fetch from './Ex3Fetch.jsx'
import Ex4Counter from './Ex4Counter.jsx'
import Ex5Stopwatch from './Ex5Stopwatch.jsx'

function Lesson12Hooks() {
  return (
    <>
      <h1>커스텀 hook — 로직을 함수로 빼기</h1>

      <h3>① 문제 — 같은 state·함수를 컴포넌트마다 복사</h3>
      <Ex1Copy />

      <h3>② useToggle — 두 줄이 한 줄로</h3>
      <Ex2Toggle />

      <h3>③ useFetch — 9단계 목록을 hook 한 줄로(맞는 주소 / 틀린 주소)</h3>
      <Ex3Fetch />

      <h3>④ 같은 hook 을 둘이 써도 state 는 따로(콘솔)</h3>
      <Ex4Counter />

      <h3>⑤ hook 이 hook 을 부른다 — 스톱워치 둘이 따로 멈춘다</h3>
      <Ex5Stopwatch />
    </>
  )
}

export default Lesson12Hooks
