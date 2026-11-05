// 9단계 — 서버 호출: fetch
// 핵심: fetch 는 「화면 밖」 일이라 useEffect 안에서 한다(8단계).
//       불러오는 중 · 실패 · 성공 세 가지를 state 로 들고, 그 값대로 그린다.
//       MOCA 의 tran(select.do) 은 엔진이 로딩바·오류창을 띄워 주지만 React 는 내가 그린다.
// 데이터: public/lesson9/*.json — public 폴더의 파일은 주소 그대로 나간다(/lesson9/users.json).
// F12 콘솔을 열고 보세요.

import { useState, useEffect } from 'react'

// 일부러 늦추기 — 파일은 너무 빨리 와서 「불러오는 중」이 안 보인다
const wait = ms => new Promise(r => setTimeout(r, ms))

// ───────── ① 목록 불러오기 — 세 가지 state ─────────
function UserList({ url }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      console.log('① 요청', url)
      try {
        await wait(1000)
        // Accept 를 안 주면 Vite 가 없는 주소에 index.html(200)을 돌려줘
        // 404 대신 「JSON 아님」 오류가 난다(실측 2026-11-05)
        const res = await fetch(url, {
          headers: { Accept: 'application/json' },
        })
        if (!res.ok) throw new Error('HTTP ' + res.status)     // fetch 는 404 여도 오류를 안 던진다
        setUsers(await res.json())                              // 글자 → 자바스크립트 객체
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)                                       // 성공이든 실패든 끝
      }
    }
    load()
  }, [url])

  if (loading) return <p>불러오는 중…</p>
  if (error) return <p style={{ color: 'crimson' }}>오류: {error}</p>
  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name} · {u.dept}</li>)}
    </ul>
  )
}

// ───────── ② 고른 사람 상세 — 늦게 온 응답 버리기 ─────────
// 사람마다 서버 응답 시간이 다르다고 치자(1번이 가장 느림)
const DELAY = { 1: 2000, 2: 300, 3: 800 }

function UserDetail({ id, guard }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    let ignore = false
    console.log(`② ${id}번 요청`)
    async function load() {
      await wait(DELAY[id])
      const res = await fetch(`/lesson9/user-${id}.json`)
      const data = await res.json()
      if (guard && ignore) {
        console.log(`② ${id}번 응답 버림 — 이미 다른 사람을 골랐다`)
        return
      }
      console.log(`② ${id}번 응답 그림`)
      setUser(data)
    }
    load()
    return () => { ignore = true }                              // 다음 요청 전·사라질 때 「이 응답은 버려라」
  }, [id, guard])

  return <p>상세: {user ? `${user.name} · ${user.phone}` : '불러오는 중…'}</p>
}

function Lesson9Fetch() {
  const [id, setId] = useState(3)
  const [guard, setGuard] = useState(true)

  // 1번(느림)을 누르고 0.1초 뒤 2번(빠름)을 누른 것처럼
  function quick() {
    setId(1)
    setTimeout(() => setId(2), 100)
  }

  return (
    <>
      <h1>fetch — 서버에서 불러오기</h1>

      <h3>① 목록 — 맞는 주소 / 틀린 주소</h3>
      <UserList url="/lesson9/users.json" />
      <UserList url="/lesson9/nope.json" />

      <h3>② 상세 — 고른 사람: {id}번</h3>
      {[1, 2, 3].map(n => (
        <button key={n} onClick={() => setId(n)}>{n}번</button>
      ))}{' '}
      <button onClick={quick}>1번 → 2번 빠르게</button>
      <p>
        <label>
          <input type="checkbox" checked={guard} onChange={e => setGuard(e.target.checked)} />
          늦게 온 응답 버리기(ignore)
        </label>
      </p>
      <UserDetail id={id} guard={guard} />
    </>
  )
}

export default Lesson9Fetch
