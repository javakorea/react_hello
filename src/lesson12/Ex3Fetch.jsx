// 12단계 ③ useFetch — 9단계 UserList 를 hook 으로
// 9단계에서는 state 3개 + useEffect 25줄이 컴포넌트 안에 있었다. 지금은 useFetch(url) 한 줄.
// hook 은 useFetch.js 에 있다. F12 콘솔에 「useFetch 요청」이 찍힌다.

import { useFetch } from './useFetch.js'

function UserList({ url }) {
  const { data, loading, error, reload } = useFetch(url)

  if (loading) return <p>불러오는 중…</p>
  if (error) {
    return (
      <p style={{ color: 'crimson' }}>
        오류: {error} <button onClick={reload}>다시</button>
      </p>
    )
  }
  return (
    <div>
      <ul>
        {data.map(u => <li key={u.id}>{u.name} · {u.dept}</li>)}
      </ul>
      <button onClick={reload}>다시 불러오기</button>
    </div>
  )
}

function Ex3Fetch() {
  return (
    <div>
      <UserList url="/lesson9/users.json" />   {/* 맞는 주소 */}
      <UserList url="/lesson9/nope.json" />    {/* 틀린 주소 — 오류 */}
    </div>
  )
}

export default Ex3Fetch
