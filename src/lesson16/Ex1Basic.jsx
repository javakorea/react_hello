// 16단계 ① 기본 — create 로 store 를 만들고, hook 처럼 부른다
// Provider 가 없다. 서로 떨어진 두 컴포넌트가 props 없이 같은 state 를 쓴다.
// 11단계 Context 와 견주면: Context 는 Provider 로 감싸야 하고 value 가 바뀌면 consumer 가 전부 리렌더링된다.

import { create } from 'zustand'

// store = state 와 그것을 바꾸는 함수를 한곳에 둔 것. 컴포넌트 밖에서 한 번만 만든다.
const useCountStore = create(set => ({
  count: 0,
  inc: () => set(s => ({ count: s.count + 1 })),   // set 에 함수 → 리턴값을 기존 state 에 합친다
  reset: () => set({ count: 0 }),                  // set 에 객체 → 그 값으로 합친다
}))

function CountView() {                             // 보여 주기만
  const count = useCountStore(s => s.count)
  return <p>지금 값: {count}</p>
}

function CountButtons() {                          // 바꾸기만 — CountView 와 부모·자식 관계가 아니다
  const inc = useCountStore(s => s.inc)
  const reset = useCountStore(s => s.reset)
  return (
    <p>
      <button onClick={inc}>+1</button>{' '}
      <button onClick={reset}>0으로</button>
    </p>
  )
}

function Ex1Basic() {
  return (
    <div>
      <CountView />
      <CountButtons />
    </div>
  )
}

export default Ex1Basic
