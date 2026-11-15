// 12단계 ④ hook 은 로직을 공유한다 — state 는 부르는 컴포넌트마다 따로
// CounterA 와 CounterB 가 같은 useCounter 를 부르지만 count 는 각자 생긴다. A 를 눌러도 B 는 그대로.
// F12 콘솔에 누가 +1 했는지 찍힌다.

import { useState } from 'react'

function useCounter(name) {
  const [count, setCount] = useState(0)
  const inc = () => {
    console.log(`④ ${name} +1`)
    setCount(c => c + 1)
  }
  return { count, inc }
}

function CounterA() {
  const { count, inc } = useCounter('A')
  return <button onClick={inc}>A {count}</button>
}

function CounterB() {
  const { count, inc } = useCounter('B')
  return <button onClick={inc}>B {count}</button>
}

function Ex4Counter() {
  return (
    <p>
      <CounterA /> <CounterB />
    </p>
  )
}

export default Ex4Counter
