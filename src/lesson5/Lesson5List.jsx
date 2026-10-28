// 5단계 — 조건부 렌더링 · 목록 렌더링
// JSX 의 {} 안에는 「식」만 들어간다 → if 대신 && · 삼항, for 대신 map()

import { useState } from 'react'

const 처음목록 = [
  { id: 1, name: '홍길동', dept: '개발', active: true },
  { id: 2, name: '김철수', dept: '영업', active: false },
  { id: 3, name: '이영희', dept: '개발', active: true },
]

function Lesson5List() {
  const [isLogin, setIsLogin] = useState(false)
  const [users, setUsers] = useState(처음목록)
  const [onlyActive, setOnlyActive] = useState(false)
  const [nextId, setNextId] = useState(4)

  // ③ 그리기 전에 미리 걸러 둔다 — 걸러진 배열은 state 가 아니라 계산값
  const shown = onlyActive ? users.filter(u => u.active) : users

  // ④ 맨 앞에 끼워 넣기 — key 가 왜 필요한지 보는 실험용
  function addFirst() {
    setUsers([{ id: nextId, name: '새사람' + nextId, dept: '총무', active: true }, ...users])
    setNextId(nextId + 1)
  }

  // ⑤ if 문은 return 위(JSX 밖)에서는 마음대로 쓸 수 있다
  let 안내
  if (users.length === 0) 안내 = <p style={{ color: 'gray' }}>사용자가 없습니다.</p>
  else 안내 = <p>모두 {users.length}명</p>

  return (
    <>
      <h1>조건부 · 목록 렌더링</h1>

      <h3>① 삼항 — 둘 중 하나 그리기</h3>
      <button onClick={() => setIsLogin(!isLogin)}>{isLogin ? '로그아웃' : '로그인'}</button>
      <p>{isLogin ? '홍길동님 환영합니다' : '로그인해 주세요'}</p>

      <h3>② && — 참일 때만 그리기</h3>
      {isLogin && <p style={{ color: 'green' }}>🔓 관리자 메뉴가 보입니다</p>}
      {users.length > 0 && <p>개발팀 {users.filter(u => u.dept === '개발').length}명</p>}
      {/* users.length && ... 로 쓰면 0명일 때 화면에 「0」 이 찍힌다 (2단계에서 본 함정) */}

      <h3>③ map() — 배열 → 태그 배열</h3>
      <label>
        <input type="checkbox" checked={onlyActive} onChange={e => setOnlyActive(e.target.checked)} />
        재직자만
      </label>
      <table border="1" cellPadding="4">
        <thead>
          <tr><th>ID</th><th>이름</th><th>부서</th><th>상태</th><th>메모(입력해 보기)</th><th></th></tr>
        </thead>
        <tbody>
          {shown.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.dept}</td>
              <td>{u.active ? '재직' : <span style={{ color: 'red' }}>퇴사</span>}</td>
              <td><input placeholder={u.name + ' 메모'} /></td>
              <td><button onClick={() => setUsers(users.filter(x => x.id !== u.id))}>삭제</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>④ key 실험</h3>
      <p>메모 칸에 아무거나 적고 「맨 앞에 추가」를 눌러 보세요. 지금은 key = id 라서 메모가 제 사람을 따라갑니다.</p>
      <button onClick={addFirst}>맨 앞에 추가</button>
      <button onClick={() => setUsers(처음목록)}>되돌리기</button>

      <h3>⑤ JSX 밖에서는 if 도 된다</h3>
      {안내}
    </>
  )
}

export default Lesson5List
