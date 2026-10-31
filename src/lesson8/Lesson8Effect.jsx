// 8단계 — useEffect: 「그린 뒤에 할 일」
// 핵심: 컴포넌트 함수는 JSX 를 돌려주는 계산만 한다(그리는 중엔 화면이 아직 없다).
//       타이머·서버 조회·document.title 처럼 「화면 밖」을 건드리는 일은 그린 뒤에 useEffect 로 한다.
//       useEffect(할 일, [지켜볼 값들]) — 두 번째 인자(의존성 배열)가 「언제 다시 할지」를 정한다.
//       할 일이 함수를 돌려주면 그것이 정리 함수 — 다음에 다시 하기 전·화면에서 사라질 때 React 가 부른다.
// F12 콘솔을 열고 보세요. 개발 모드(StrictMode)에서는 처음에 한 번 더 돈다 — ④ 참고.

import { useState, useEffect } from 'react'

// ───────── ① 언제 도는가 — 의존성 배열 세 가지 ─────────
function EffectTiming() {
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)
  console.log('① 그리기', { a, b })                                    // 함수 본문 = 그리는 중

  useEffect(() => { console.log('   ㉠ 배열 없음 — 그릴 때마다') })
  useEffect(() => { console.log('   ㉡ [] — 처음 한 번 ($p.onpageload)') }, [])
  useEffect(() => { console.log('   ㉢ [a] — a 가 바뀔 때만, a =', a) }, [a])

  return (
    <p>
      <button onClick={() => setA(a + 1)}>a {a}</button>{' '}
      <button onClick={() => setB(b + 1)}>b {b}</button>
      {' '}← a 를 누르면 ㉠㉢, b 를 누르면 ㉠ 만
    </p>
  )
}

// ───────── ② 정리 함수 — 켠 것은 끈다 ─────────
function Clock() {
  const [now, setNow] = useState(() => new Date())                    // 함수로 넘기면 처음 한 번만 부른다(그릴 때마다 Date 를 만들지 않게)

  useEffect(() => {
    console.log('② 시계: 타이머 켬')
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => {                                                     // 정리 함수
      console.log('② 시계: 타이머 끔')
      clearInterval(id)                                                // 안 끄면 사라진 뒤에도 1초마다 돈다
    }
  }, [])

  return <p>지금 {now.toLocaleTimeString()}</p>
}

// ───────── ③ 값이 바뀔 때마다 다시 하기 + 정리 — 입력 멈추면 조회 ─────────
// 칠 때마다 조회하면 서버가 힘들다. 0.5초 기다렸다 조회하고, 그 사이 또 치면 지난 예약을 취소한다.
// 진짜 서버 호출(fetch)은 9단계 — 여기서는 「조회했다」고 목록에 적기만 한다.
function Search() {
  const [q, setQ] = useState('')
  const [done, setDone] = useState([])                                 // 실제로 조회한 검색어들

  useEffect(() => {
    if (q === '') return                                               // 빈 칸이면 아무것도 안 함(정리할 것도 없음)
    console.log(`③ 「${q}」 0.5초 뒤 조회 예약`)
    const id = setTimeout(() => setDone(d => [...d, q]), 500)
    return () => {                                                     // q 가 또 바뀌면 다음 실행 전에 이것부터
      console.log(`③ 「${q}」 예약 취소`)
      clearTimeout(id)
    }
  }, [q])

  return (
    <>
      <input value={q} onChange={e => setQ(e.target.value)} placeholder="빠르게 쳐 보세요" />
      <p>실제로 조회한 검색어: {done.join(' → ') || '(없음)'}</p>
    </>
  )
}

function Lesson8Effect() {
  const [showClock, setShowClock] = useState(true)

  return (
    <>
      <h1>useEffect — 그린 뒤에 할 일</h1>

      <h3>① 언제 도는가</h3>
      <EffectTiming />

      <h3>② 정리 함수 — 시계를 숨기면 타이머도 끈다</h3>
      <button onClick={() => setShowClock(!showClock)}>{showClock ? '시계 숨기기' : '시계 보이기'}</button>
      {showClock && <Clock />}

      <h3>③ 입력 멈추면 조회 — 값이 바뀔 때마다 지난 것 정리</h3>
      <Search />

      <h3>④ 처음에 두 번 도는 까닭</h3>
      <p>
        main.jsx 의 &lt;StrictMode&gt; 가 개발 모드에서만 「붙였다 → 뗐다 → 다시 붙임」을 한 번 해 본다.
        정리 함수를 빠뜨렸으면 타이머가 두 개 돌아 그때 드러난다. 빌드(운영)에서는 한 번만 돈다.
      </p>
    </>
  )
}

export default Lesson8Effect
