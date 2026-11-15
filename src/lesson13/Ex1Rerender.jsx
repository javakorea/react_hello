// 13단계 ① 문제 — 부모가 리렌더링되면 자식도 전부 리렌더링된다
// Child 는 count 를 쓰지 않는데도 [+1] 을 누를 때마다 리렌더링된다(F12 콘솔).
// 이것이 React 의 기본 동작이다 — 대부분은 빨라서 문제가 없고, 무거운 자식일 때만 막는다(②).
//
// 콘솔 로그를 렌더링 본문이 아니라 useEffect 에 둔 까닭: 개발 모드의 StrictMode 는 렌더링 함수를
// 두 번 불러 로그가 두 번씩 찍힌다. effect 는 화면에 반영된(commit) 횟수만큼 한 번씩 돈다.

import { useState, useEffect } from 'react'

function Child() {
  useEffect(() => console.log('① Child 리렌더링'))   // 의존성 배열 없음 — 렌더링마다 돈다
  return <p>나는 count 를 안 쓰는 자식</p>
}

function Ex1Rerender() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>+1 ({count})</button>
      <Child />
    </div>
  )
}

export default Ex1Rerender
