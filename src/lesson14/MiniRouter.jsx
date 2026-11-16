// 14단계 덧붙임 — react-router 없이 Router · Outlet · Link · useParams 를 직접 만든다(원리 보기용)
// 재료는 전부 배운 것: useState(지금 주소) · useEffect(popstate 구독) · Context 두 개 · History API pushState.
//   RouterContext — 지금 주소 · navigate · params 를 아래 전부에 내려준다
//   OutletContext — 레이아웃 안 <Outlet /> 자리에 렌더링할 element 를 내려준다

import { createContext, useContext, useEffect, useState } from 'react'

const RouterContext = createContext(null)
const OutletContext = createContext(null)

// '/posts/:id' 와 '/posts/3' 을 맞춰 보고, 맞으면 { id: '3' } · 안 맞으면 null
function match(pattern, path) {
  const p = pattern.split('/')
  const a = path.split('/')
  if (p.length !== a.length) return null
  const params = {}
  for (let i = 0; i < p.length; i++) {
    if (p[i].startsWith(':')) params[p[i].slice(1)] = a[i]
    else if (p[i] !== a[i]) return null
  }
  return params
}

// layout = 바깥 틀(Outlet 을 품은 컴포넌트) · routes = [{ path, element }] · 마지막 path '*' = 404
export function MiniRouter({ layout, routes }) {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {                                // 뒤로·앞으로 버튼 → 주소만 바뀌니 state 를 맞춘다
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  function navigate(to) {                          // 주소창만 바꾸고(서버 요청 없음) state 를 바꿔 리렌더링
    window.history.pushState(null, '', to)
    setPath(to)
  }

  let element = null
  let params = {}
  for (const r of routes) {                        // 위에서부터 처음 맞는 것 하나
    const m = r.path === '*' ? {} : match(r.path, path)
    if (m) { element = r.element; params = m; break }
  }

  return (
    <RouterContext value={{ path, navigate, params }}>
      <OutletContext value={element}>
        {layout}
      </OutletContext>
    </RouterContext>
  )
}

export function Outlet() {                         // 고른 element 를 그대로 리턴할 뿐
  return useContext(OutletContext)
}

export function Link({ to, children }) {
  const { path, navigate } = useContext(RouterContext)
  function onClick(e) {
    e.preventDefault()                             // <a> 기본 동작(페이지 새로 받기)을 막는다
    navigate(to)
  }
  const active = path === to
  return (
    <a href={to} onClick={onClick} style={{ fontWeight: active ? 'bold' : 'normal' }}>
      {children}
    </a>
  )
}

export function useParams() {
  return useContext(RouterContext).params
}

export function useNavigate() {
  return useContext(RouterContext).navigate
}
