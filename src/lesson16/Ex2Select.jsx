// 16단계 ② selector — 고른 값이 바뀐 컴포넌트만 리렌더링된다(콘솔)
// useStore(s => s.count) 처럼 「무엇을 쓸지」 함수로 고른다. 이 함수를 selector 라고 한다.
// [+1] → CountPart 만 로그 · [이름 바꾸기] → NamePart 만 로그. Context 였다면 둘 다 찍힌다.

import { useEffect } from 'react'
import { create } from 'zustand'

const useFormStore = create(set => ({
  count: 0,
  name: '홍길동',
  inc: () => set(s => ({ count: s.count + 1 })),
  rename: () => set(s => ({ name: s.name === '홍길동' ? '김철수' : '홍길동' })),
}))

function CountPart() {
  const count = useFormStore(s => s.count)         // count 만 고름
  useEffect(() => { console.log('CountPart 렌더링') })
  return <p>건수: {count}</p>
}

function NamePart() {
  const name = useFormStore(s => s.name)           // name 만 고름
  useEffect(() => { console.log('NamePart 렌더링') })
  return <p>이름: {name}</p>
}

function Ex2Select() {
  const inc = useFormStore(s => s.inc)
  const rename = useFormStore(s => s.rename)
  return (
    <div>
      <CountPart />
      <NamePart />
      <button onClick={inc}>+1</button>{' '}
      <button onClick={rename}>이름 바꾸기</button>
    </div>
  )
}

export default Ex2Select
