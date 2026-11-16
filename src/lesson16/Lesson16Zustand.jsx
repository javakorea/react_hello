// 16단계 — 전역 state 라이브러리 Zustand
// 이 파일은 차례만 있다 — 예제는 하나씩 따로 있다(Ex1 ~ Ex4). Provider 로 감싸지 않는다.

import Ex1Basic from './Ex1Basic.jsx'
import Ex2Select from './Ex2Select.jsx'
import Ex3Outside from './Ex3Outside.jsx'
import Ex4Persist from './Ex4Persist.jsx'

function Lesson16Zustand() {
  return (
    <>
      <h1>Zustand — 전역 state</h1>

      <h3>① create · Provider 없이 떨어진 컴포넌트끼리 공유</h3>
      <Ex1Basic />

      <h3>② selector — 고른 값이 바뀐 곳만 리렌더링(콘솔)</h3>
      <Ex2Select />

      <h3>③ 컴포넌트 밖 보통 함수에서 getState · setState</h3>
      <Ex3Outside />

      <h3>④ persist — F5 뒤에도 남기기</h3>
      <Ex4Persist />
    </>
  )
}

export default Lesson16Zustand
