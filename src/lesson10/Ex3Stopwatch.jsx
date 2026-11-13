import { useState, useRef } from 'react'

function Stopwatch() {
  const [ms, setMs] = useState(0)
  const timerRef = useRef(null)

  function start() {
    if (timerRef.current) return
    const begin = Date.now() - ms
    timerRef.current = setInterval(() => setMs(Date.now() - begin), 50)
    console.log('③ ref 시작 — 타이머 ID', timerRef.current)
  }
  function stop() {
    console.log('③ ref 멈춤 — 타이머 ID', timerRef.current)
    clearInterval(timerRef.current)
    timerRef.current = null
  }

  return (
    <p>
      ref 로 만든 스톱워치: <b>{(ms / 1000).toFixed(2)}초</b>{' '}
      <button onClick={start}>시작</button>{' '}
      <button onClick={stop}>멈춤</button>
    </p>
  )
}

const leaked = []
function StopwatchLet() {
  const [ms, setMs] = useState(0)
  let timerId = null

  function start() {
    const begin = Date.now() - ms
    timerId = setInterval(() => setMs(Date.now() - begin), 50)
    leaked.push(timerId)
    console.log('③ let 시작 — timerId', timerId)
  }
  function stop() {
    console.log('③ let 멈춤 — timerId', timerId)
    clearInterval(timerId)
  }
  function stopAll() {
    leaked.splice(0).forEach(id => clearInterval(id))
    console.log('③ 못 멈춘 타이머 모두 정리')
  }

  return (
    <p>
      let 으로 만든 스톱워치: <b>{(ms / 1000).toFixed(2)}초</b>{' '}
      <button onClick={start}>시작</button>{' '}
      <button onClick={stop}>멈춤</button>{' '}
      <button onClick={stopAll}>강제 정리</button>
    </p>
  )
}

function Ex3Stopwatch() {
  return (
    <>
      <Stopwatch />
      <StopwatchLet />
    </>
  )
}

export default Ex3Stopwatch
