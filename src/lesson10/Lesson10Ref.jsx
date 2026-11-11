// 10단계 — useRef: 리렌더링과 상관없이 값 하나를 들고 있기
// 핵심: const r = useRef(처음값) → r.current 로 읽고 쓴다.
//       ① DOM 잡기: <input ref={r}> 로 넘기면 마운트 뒤 r.current 가 그 input DOM 이 된다(포커스·스크롤).
//       ② 값 보관: r.current 를 바꿔도 리렌더링되지 않는다. 리렌더링돼도 값은 남는다(let 과 다른 점).
//       ③ 실무: 타이머 ID 처럼 화면에 보이지 않는 값.
//       규칙: 렌더링 중(컴포넌트 본문)에는 r.current 를 읽거나 쓰지 않는다 — 이벤트 함수·useEffect 안에서만.
//             (② 의 화면 줄 하나만 일부러 어겼다 — 어기면 화면이 낡는다는 것을 보이려고)
// MOCA 에 견주면: ① ≈ $p.get('id') 로 컴포넌트 잡기 · ③ ≈ $p.timer = setInterval(…) 처럼 스코프에 값 걸어 두기.
// F12 콘솔을 열고 보세요.

import { useState, useEffect, useRef } from 'react'

// ───────── ① DOM 잡기 — 화면이 열리면 input 에 포커스 ─────────
function FocusInput() {
  const inputRef = useRef(null)                                        // 처음엔 null — 마운트 뒤에 DOM 이 들어온다

  useEffect(() => {
    console.log('① 마운트 뒤 inputRef.current =', inputRef.current)    // <input> DOM
    inputRef.current.focus()                                           // $p.onpageload 에서 포커스 주던 자리
  }, [])

  return (
    <p>
      <input ref={inputRef} placeholder="이름" />{' '}
      <button onClick={() => inputRef.current.focus()}>input 에 포커스</button>
    </p>
  )
}

// ───────── ② let · state · ref 비교 ─────────
function ThreeCounters() {
  let plain = 0                                                        // 렌더링마다 0 으로 새로 만들어진다
  const [state, setState] = useState(0)                                // 바꾸면 리렌더링
  const ref = useRef(0)                                                // 바꿔도 리렌더링 안 됨, 리렌더링돼도 남음
  const [, rerender] = useState(0)                                     // [리렌더링만] 버튼용

  return (
    <>
      <p>
        <button onClick={() => { plain += 1; console.log('② let =', plain) }}>let +1</button>{' '}
        <button onClick={() => setState(state + 1)}>state +1</button>{' '}
        <button onClick={() => { ref.current += 1; console.log('② ref.current =', ref.current) }}>ref +1</button>{' '}
        <button onClick={() => rerender(n => n + 1)}>리렌더링만</button>
      </p>
      {/* 아래 줄의 ref.current 는 일부러 렌더링 중에 읽었다 — 리렌더링될 때만 화면이 따라온다 */}
      <p>let: {plain} · state: {state} · ref: {ref.current}</p>
    </>
  )
}

// ───────── ③ 타이머 ID 는 ref 에 ─────────
function Stopwatch() {
  const [ms, setMs] = useState(0)
  const timerRef = useRef(null)                                        // 타이머 ID — 화면에 안 보이니 state 일 필요가 없다

  function start() {
    if (timerRef.current) return                                       // 이미 도는 중
    const begin = Date.now() - ms
    timerRef.current = setInterval(() => setMs(Date.now() - begin), 50)
    console.log('③ ref 시작 — 타이머 ID', timerRef.current)
  }
  function stop() {
    console.log('③ ref 멈춤 — 타이머 ID', timerRef.current)            // 리렌더링이 50ms 마다 일어나도 ID 가 남아 있다
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

// 비교용 — 타이머 ID 를 let 에 두면 멈춤이 안 먹힌다
const leaked = []                                                      // 실험용: 못 멈춘 타이머를 모아 두었다가 한꺼번에 정리
function StopwatchLet() {
  const [ms, setMs] = useState(0)
  let timerId = null                                                   // ← 리렌더링(50ms 마다)될 때마다 다시 null

  function start() {
    const begin = Date.now() - ms
    timerId = setInterval(() => setMs(Date.now() - begin), 50)
    leaked.push(timerId)
    console.log('③ let 시작 — timerId', timerId)
  }
  function stop() {
    console.log('③ let 멈춤 — timerId', timerId)                       // null → clearInterval(null) 은 아무것도 안 멈춘다
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

// ───────── ④ 자식 컴포넌트의 DOM 잡기 — React 19 는 ref 를 props 로 받는다 ─────────
// 옛 코드(React 18 까지)는 forwardRef(…) 로 감싸야 했다.
function NameInput({ ref, label }) {
  return <label>{label} <input ref={ref} /></label>
}

function FocusChild() {
  const nameRef = useRef(null)
  return (
    <p>
      <NameInput ref={nameRef} label="이름" />{' '}
      <button onClick={() => nameRef.current.focus()}>자식 input 에 포커스</button>
    </p>
  )
}

function Lesson10Ref() {
  return (
    <>
      <h1>useRef — 리렌더링과 상관없는 값</h1>

      <h3>① DOM 잡기 — 화면이 열리면 input 에 포커스</h3>
      <FocusInput />

      <h3>② let · state · ref — 무엇이 화면에 보이나(콘솔)</h3>
      <ThreeCounters />

      <h3>③ 타이머 ID 는 ref 에 — let 에 두면 멈춤이 안 먹힌다</h3>
      <Stopwatch />
      <StopwatchLet />

      <h3>④ 자식 컴포넌트의 DOM 잡기 — React 19 는 ref 를 props 로</h3>
      <FocusChild />
    </>
  )
}

export default Lesson10Ref
