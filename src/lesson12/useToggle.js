// 가장 작은 커스텀 hook — state 하나와 그것을 뒤집는 함수를 묶었다.
// 이름이 use 로 시작하고, 안에서 다른 hook(useState)을 부른다 → hook 이다.
import { useState } from 'react'

export function useToggle(initial = false) {
  const [on, setOn] = useState(initial)
  const toggle = () => setOn(v => !v)
  return [on, toggle]                                                  // useState 처럼 배열로 돌려준다 — 받는 쪽이 이름을 짓게
}
