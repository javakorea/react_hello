// 3단계 — state (useState)
// 값이 바뀌면 화면을 다시 그려야 할 때 state 를 쓴다.
// const [값, 바꾸는함수] = useState(처음값)

import { useState } from 'react'

function Lesson3State() {
  // ① 숫자 — 바꾸는 함수를 불러야 React 가 다시 그린다
  const [count, setCount] = useState(0)

  // ② 일반 변수 — 값은 바뀌어도 화면은 안 바뀐다(다시 그릴 때마다 0 으로 돌아감)
  let plain = 0

  // ③ 불린 — 보이기/숨기기
  const [open, setOpen] = useState(false)

  // ④ 배열 — 원본을 고치지 말고 새 배열을 만들어 넘긴다
  const [items, setItems] = useState(['사과', '배'])

  // ⑤ 객체 — 마찬가지로 새 객체(...로 복사 후 한 칸만 바꿈)
  const [user, setUser] = useState({ name: '홍길동', age: 30 })

  return (
    <>
      <h1>state — useState</h1>

      <h3>① 숫자</h3>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(0)}>초기화</button>
      <p>count = {count}</p>

      <h3>② 일반 변수 (안 되는 예)</h3>
      <button onClick={() => { plain = plain + 1; console.log('plain =', plain) }}>+1</button>
      <p>plain = {plain} ← 눌러도 그대로 (콘솔에는 바뀐 값이 찍힘)</p>

      <h3>③ 불린</h3>
      <button onClick={() => setOpen(!open)}>{open ? '닫기' : '열기'}</button>
      {open && <p>열렸다!</p>}

      <h3>④ 배열</h3>
      <button onClick={() => setItems([...items, '귤'])}>귤 추가 (새 배열)</button>
      <button onClick={() => { items.push('감'); setItems(items) }}>감 추가 (push — 안 되는 예)</button>
      <p>{items.join(', ')}</p>

      <h3>⑤ 객체</h3>
      <button onClick={() => setUser({ ...user, age: user.age + 1 })}>나이 +1</button>
      <p>{user.name} ({user.age}세)</p>
    </>
  )
}

export default Lesson3State
