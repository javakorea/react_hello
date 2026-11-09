// 11단계 — Context: props 를 층층이 넘기지 않고 「위에서 넣고 아래 어디서든 꺼내기」
// 핵심: createContext 로 상자를 만들고 → <상자 value={값}> 로 감싸면(Provider)
//       그 아래 몇 층이든 useContext(상자) 한 줄로 값을 꺼낸다. 중간 컴포넌트는 몰라도 된다.
//       value 가 바뀌면 그 값을 꺼내 쓰는 컴포넌트가 다시 그려진다 — moca.$g 와 다른 점(③).
// React 19 부터 <상자 value> 로 바로 감싼다. 옛 코드에서는 <상자.Provider value> 로 쓴다(같은 뜻).
// F12 콘솔을 열고 보세요. 개발 모드(StrictMode)에서는 그리기 로그가 두 번씩 찍힌다(8단계).

import { createContext, useContext, useState } from 'react'

// 일부러 늦추기 — 로딩바가 보이게
const wait = ms => new Promise(r => setTimeout(r, ms))

// ───────── ① 문제 — props 를 층층이 넘기기(prop drilling) ─────────
// Page1·Header1 은 user 를 쓰지 않는데, 아래로 넘기려고 받는다. 층이 깊어질수록 중간이 다 받아야 한다.
function Badge1({ user }) {
  return <b>{user.name}</b>
}
function Header1({ user }) {                                           // ← 안 쓰는데 받아서 넘김
  return <p>머리말 · <Badge1 user={user} /></p>
}
function Page1({ user }) {                                             // ← 안 쓰는데 받아서 넘김
  return <Header1 user={user} />
}

// ───────── ② Context — 위에서 넣고, 아래에서 꺼낸다 ─────────
// 괄호 안 = Provider 로 감싸지 않은 곳에서 꺼냈을 때 나오는 기본값
const UserContext = createContext({ name: '(로그인 안 함)' })

function Badge2() {
  const user = useContext(UserContext)                                 // 가장 가까운 위쪽 Provider 의 value
  return <b>{user.name}</b>
}
function Header2() {                                                   // props 없음
  return <p>머리말 · <Badge2 /></p>
}
function Page2() {                                                     // props 없음
  return <Header2 />
}

// ───────── ③ 바뀌는 값 — state 를 Context 로 나눠 주기 ─────────
// 실무 모양: state 를 가진 「Provider 컴포넌트」를 하나 만들고 children 을 감싼다.
// 테마가 바뀌면 ThemeContext 를 꺼내 쓰는 ThemeBox·ThemeButton 만 다시 그려진다. NoTheme 은 안 그려진다(콘솔).
const ThemeContext = createContext(null)

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  const toggle = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))
  return (
    <ThemeContext value={{ theme, toggle }}>                           {/* 값 + 바꾸는 함수를 함께 */}
      {children}
    </ThemeContext>
  )
}

function ThemeBox() {
  const { theme } = useContext(ThemeContext)
  console.log('③ ThemeBox 그리기 —', theme)
  const dark = theme === 'dark'
  return (
    <div style={{ padding: 8, background: dark ? '#333' : '#eee', color: dark ? '#fff' : '#000' }}>
      지금 테마: {theme}
    </div>
  )
}
function ThemeButton() {
  const { theme, toggle } = useContext(ThemeContext)
  console.log('③ ThemeButton 그리기')
  return <button onClick={toggle}>{theme === 'dark' ? '밝게' : '어둡게'}</button>
}
function NoTheme() {
  console.log('③ NoTheme 그리기 — Context 안 씀')
  return <p>Context 를 안 쓰는 칸 — 테마를 바꿔도 다시 안 그려진다</p>
}

// ───────── ④ 전역 로딩바 — MOCA tran 처럼 화면은 로딩을 신경 쓰지 않게 ─────────
// 로딩 상태를 LoadingProvider 한 곳이 들고, 맨 위에 로딩바를 그린다.
// 화면은 useApi() 가 준 api() 만 부른다 — 로딩바를 켜고 끄는 것은 api() 가 한다.
// 실제 앱에서는 main.jsx 에서 <App /> 전체를 감싼다. 여기서는 ④ 안에만 감쌌다.
const LoadingContext = createContext(null)

function LoadingProvider({ children }) {
  const [count, setCount] = useState(0)                                // 진행 중인 요청 수 — 여러 개면 다 끝나야 꺼진다
  const start = () => setCount(c => c + 1)
  const end = () => setCount(c => c - 1)
  return (
    <LoadingContext value={{ start, end }}>
      {count > 0 && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, padding: 6, background: '#f0a020', color: '#000', zIndex: 10 }}>
          불러오는 중… (요청 {count}개)
        </div>
      )}
      {children}
    </LoadingContext>
  )
}

// 공통 통신 훅 — 9단계 api() 에 로딩바를 붙인 것(useXxx 로 만드는 법은 12단계 커스텀 훅)
function useApi() {
  const { start, end } = useContext(LoadingContext)
  return async function api(url) {
    start()                                                            // 로딩바 켬
    try {
      await wait(1500)
      const res = await fetch(url, { headers: { Accept: 'application/json' } })
      if (!res.ok) throw new Error('HTTP ' + res.status)
      return await res.json()
    } finally {
      end()                                                            // 성공이든 실패든 끔
    }
  }
}

function UserLoader() {
  const api = useApi()
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)

  async function load(url) {
    setError(null)
    try {
      setUsers(await api(url))                                         // 로딩은 신경 안 씀
    } catch (e) {
      setUsers([])
      setError(e.message)
    }
  }

  return (
    <div>
      <p>
        <button onClick={() => load('/lesson9/users.json')}>목록 불러오기</button>{' '}
        <button onClick={() => { load('/lesson9/users.json'); load('/lesson9/users.json') }}>두 번 동시에</button>{' '}
        <button onClick={() => load('/lesson9/nope.json')}>틀린 주소</button>
      </p>
      {error && <p style={{ color: 'crimson' }}>오류: {error}</p>}
      <ul>
        {users.map(u => <li key={u.id}>{u.name} · {u.dept}</li>)}
      </ul>
    </div>
  )
}

function Lesson11Context() {
  const me = { id: 1, name: '홍길동' }

  return (
    <>
      <h1>Context — 층층이 넘기지 않기</h1>

      <h3>① props 로 층층이 넘기기 — 중간이 다 받아야 한다</h3>
      <Page1 user={me} />

      <h3>② Context — 위에서 넣고 아래에서 꺼낸다</h3>
      <UserContext value={me}>
        <Page2 />                                                      {/* 홍길동 */}
        <UserContext value={{ name: '김영희' }}>
          <Page2 />                                                    {/* 김영희 — 가장 가까운 Provider 가 이긴다 */}
        </UserContext>
      </UserContext>
      <Page2 />                                                        {/* Provider 밖 — createContext 의 기본값 */}

      <h3>③ 바뀌는 값 — 꺼내 쓰는 쪽만 다시 그린다(콘솔)</h3>
      <ThemeProvider>
        <ThemeBox />
        <p><ThemeButton /></p>
        <NoTheme />
      </ThemeProvider>

      <h3>④ 전역 로딩바 — 화면은 로딩을 신경 쓰지 않는다</h3>
      <LoadingProvider>
        <UserLoader />
      </LoadingProvider>
    </>
  )
}

export default Lesson11Context
