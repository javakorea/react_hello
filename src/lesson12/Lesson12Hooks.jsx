// 12단계 — 커스텀 hook: state·effect 가 든 로직을 함수로 빼서 여러 컴포넌트가 쓰기
// 핵심: 이름이 use 로 시작하고 안에서 다른 hook 을 부르는 함수 = 커스텀 hook. 새 문법이 아니라 보통 함수다.
//       컴포넌트에는 「무엇을 렌더링할지」만 남기고, 「어떻게 하는지」(state·effect·ref)는 hook 으로 보낸다.
//       hook 은 로직을 공유하지 state 를 공유하지 않는다 — 부르는 컴포넌트마다 state 가 따로 생긴다(④).
//       state 자체를 여러 컴포넌트가 함께 쓰려면 끌어올리기(7단계)·Context(11단계).
// 규칙: hook 은 컴포넌트나 다른 hook 의 맨 위 단계에서만 부른다(조건·반복·이벤트 함수 안 금지) — 11단계에서 본 것.
// MOCA 에 견주면: 화면마다 복사하던 로직을 공통 API(com.js·moca.$g)로 올리는 것 — 다만 state 와 effect 를 품을 수 있다.
// F12 콘솔을 열고 보세요.

import { useState, useRef, useEffect } from 'react'
import { useToggle } from './useToggle.js'
import { useFetch } from './useFetch.js'

// ───────── ① 문제 — 같은 로직을 컴포넌트마다 복사 ─────────
function NoticeCopy() {
  const [open, setOpen] = useState(false)                              // ← 복사 1
  const toggle = () => setOpen(v => !v)
  return (
    <p>
      <button onClick={toggle}>공지 {open ? '접기' : '펼치기'}</button>
      {open && ' 11월 20일 서버 점검이 있습니다.'}
    </p>
  )
}
function HelpCopy() {
  const [open, setOpen] = useState(false)                              // ← 복사 2 — 글자까지 같다
  const toggle = () => setOpen(v => !v)
  return (
    <p>
      <button onClick={toggle}>도움말 {open ? '접기' : '펼치기'}</button>
      {open && ' 조회 조건을 넣고 [조회]를 누르세요.'}
    </p>
  )
}

// ───────── ② useToggle — 가장 작은 커스텀 hook ─────────
function Notice() {
  const [open, toggle] = useToggle()                                   // 두 줄이 한 줄로
  return (
    <p>
      <button onClick={toggle}>공지 {open ? '접기' : '펼치기'}</button>
      {open && ' 11월 20일 서버 점검이 있습니다.'}
    </p>
  )
}
function Help() {
  const [open, toggle] = useToggle(true)                               // 처음 값만 다르게 — 처음부터 펼친다
  return (
    <p>
      <button onClick={toggle}>도움말 {open ? '접기' : '펼치기'}</button>
      {open && ' 조회 조건을 넣고 [조회]를 누르세요.'}
    </p>
  )
}

// ───────── ③ useFetch — 9단계 UserList 를 hook 으로 ─────────
// 9단계에서는 state 3개 + useEffect 25줄이 컴포넌트 안에 있었다. 지금은 한 줄.
function UserList({ url }) {
  const { data, loading, error, reload } = useFetch(url)

  if (loading) return <p>불러오는 중…</p>
  if (error) return <p style={{ color: 'crimson' }}>오류: {error} <button onClick={reload}>다시</button></p>
  return (
    <div>
      <ul>
        {data.map(u => <li key={u.id}>{u.name} · {u.dept}</li>)}
      </ul>
      <button onClick={reload}>다시 불러오기</button>
    </div>
  )
}

// ───────── ④ hook 은 로직을 공유한다 — state 는 부르는 쪽마다 따로 ─────────
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

// ───────── ⑤ hook 이 hook 을 부른다 — 10단계 스톱워치를 hook 으로 ─────────
// 타이머 ID 를 든 ref 도 hook 안으로 들어간다. 컴포넌트를 두 번 쓰면 hook 도 두 번 불려 ref 가 각자 생긴다
// — 그래서 둘이 따로 멈춘다(함수 밖 let 에 두면 서로 덮어쓰던 것과 견줘 볼 것).
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
  useEffect(() => () => clearInterval(timerRef.current), [])           // 언마운트되면 타이머 정리 — 쓰는 쪽은 신경 쓰지 않는다

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

function Lesson12Hooks() {
  return (
    <>
      <h1>커스텀 hook — 로직을 함수로 빼기</h1>

      <h3>① 문제 — 같은 state·함수를 컴포넌트마다 복사</h3>
      <div>
        <NoticeCopy />
        <HelpCopy />
      </div>

      <h3>② useToggle — 두 줄이 한 줄로</h3>
      <div>
        <Notice />
        <Help />
      </div>

      <h3>③ useFetch — 9단계 목록을 hook 한 줄로(맞는 주소 / 틀린 주소)</h3>
      <UserList url="/lesson9/users.json" />
      <UserList url="/lesson9/nope.json" />

      <h3>④ 같은 hook 을 둘이 써도 state 는 따로(콘솔)</h3>
      <p>
        <CounterA /> <CounterB />
      </p>

      <h3>⑤ hook 이 hook 을 부른다 — 스톱워치 둘이 따로 멈춘다</h3>
      <div>
        <Stopwatch name="스톱워치 1" />
        <Stopwatch name="스톱워치 2" />
      </div>
    </>
  )
}

export default Lesson12Hooks
