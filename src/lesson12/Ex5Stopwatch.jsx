// 12단계 ⑤ hook 이 hook 을 부른다 — 10단계 스톱워치를 hook 으로
// useStopwatch 안에서 useState · useRef · useEffect 를 부른다. 타이머 ID 를 든 ref 도 hook 안에 있다.
// Stopwatch 를 두 번 쓰면 hook 도 두 번 불려 ref 가 각자 생긴다 — 그래서 둘이 따로 멈춘다.

import { useState, useRef, useEffect } from 'react'

function useStopwatch() {
  const [ms, setMs] = useState(0)
  const timerRef = useRef(null)

  const start = () => {
    if (timerRef.current) return
    const begin = Date.now() - ms
    timerRef.current = setInterval(() => setMs(Date.now() - begin), 50)
  }
  const stop = () => {
    clearInterval(timerRef.current)
    timerRef.current = null
  }
  // 언마운트되면 타이머 정리 — hook 을 쓰는 쪽은 신경 쓰지 않는다
  useEffect(() => () => clearInterval(timerRef.current), [])

  return { seconds: (ms / 1000).toFixed(2), start, stop }
}

function Stopwatch({ name }) {
  const { seconds, start, stop } = useStopwatch()
  return (
    <p>
      {name}: <b>{seconds}초</b>{' '}
      <button onClick={start}>시작</button>{' '}
      <button onClick={stop}>멈춤</button>
    </p>
  )
}

function Ex5Stopwatch() {
  return (
    <div>
      <Stopwatch name="스톱워치 1" />
      <Stopwatch name="스톱워치 2" />
    </div>
  )
}

export default Ex5Stopwatch
