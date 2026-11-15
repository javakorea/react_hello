// 13단계 — 성능: 필요 없는 리렌더링·계산 건너뛰기
// 이 파일은 차례만 있다 — 예제는 하나씩 따로 있다(Ex1 ~ Ex4). 예제 하나만 띄우려면 main.jsx 의 import 를
// './lesson13/Ex2Memo.jsx' 처럼 바꾼다.
//
// memo        — 컴포넌트를 감싼다. props 가 그대로면 리렌더링을 건너뛴다.
// useCallback — 함수를 저장해 둔다. memo 로 감싼 자식에게 함수 props 를 넘길 때 쓴다.
// useMemo     — 계산 결과를 저장해 둔다. 무거운 계산에만 쓴다.
// 셋 다 「먼저 느린 곳을 찾은 뒤」 붙인다. 아무 데나 붙이면 비교 비용만 늘고 코드만 길어진다.
// React Compiler(빌드 플러그인)를 켜면 이 셋을 컴파일러가 알아서 넣어 준다 — 이 프로젝트는 안 켰다.

import Ex1Rerender from './Ex1Rerender.jsx'
import Ex2Memo from './Ex2Memo.jsx'
import Ex3Callback from './Ex3Callback.jsx'
import Ex4UseMemo from './Ex4UseMemo.jsx'

function Lesson13Perf() {
  return (
    <>
      <h1>성능 — 필요 없는 리렌더링 건너뛰기</h1>

      <h3>① 부모가 리렌더링되면 자식도 리렌더링(콘솔)</h3>
      <Ex1Rerender />

      <h3>② memo — props 가 그대로면 건너뛴다(콘솔)</h3>
      <Ex2Memo />

      <h3>③ useCallback — 함수 props 때문에 memo 가 깨지는 것(콘솔)</h3>
      <Ex3Callback />

      <h3>④ useMemo — 무거운 계산을 다시 하지 않기</h3>
      <Ex4UseMemo />
    </>
  )
}

export default Lesson13Perf
