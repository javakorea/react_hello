// 7단계 — state 끌어올리기(lifting state up)
// 핵심: 형제 컴포넌트는 서로를 모른다. 둘이 같은 값을 써야 하면 그 값을 공통 부모로 올리고,
//       부모가 state 를 들고 자식에게는 props(값) + 콜백(바꾸는 함수)을 내려 준다.
//       데이터는 아래로(props), 바꾸라는 요청은 위로(콜백) — 단방향 흐름.

import { useState } from 'react'

// ───────── ① 문제: 형제가 각자 state 를 들면 서로 모른다 ─────────
function CounterAlone({ label }) {
  const [n, setN] = useState(0)          // 자기만의 state
  return <button onClick={() => setN(n + 1)}>{label} {n}</button>
}

// ───────── ② 해법: 부모가 state, 자식은 props + 콜백 ─────────
// 자식은 state 가 없다. 값은 받고(value), 바꾸고 싶으면 부모가 준 함수를 부른다(onChange).
function CounterShared({ label, value, onChange }) {
  return <button onClick={() => onChange(value + 1)}>{label} {value}</button>
}

// ───────── ③ 실전: 그리드(목록) 선택 → 상세 폼 ─────────
// 그리드와 폼은 형제. 「누가 선택됐는가」「사용자 목록」은 둘이 같이 쓰므로 부모(Lesson7Lifting)에 둔다.

function UserGrid({ users, selectedId, onSelect }) {
  return (
    <table border="1" cellPadding="4">
      <thead><tr><th>이름</th><th>부서</th></tr></thead>
      <tbody>
        {users.map(u => (
          <tr key={u.id}
              onClick={() => onSelect(u.id)}                          // 「나를 선택해 줘」 — 부모에게 요청
              style={{ background: u.id === selectedId ? '#def' : '', cursor: 'pointer' }}>
            <td>{u.name}</td><td>{u.dept}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function UserDetail({ user, onChange }) {
  if (!user) return <p>왼쪽에서 사용자를 고르세요</p>

  // 6단계 폼과 같은 꼴 — 단지 state 가 여기 없고 부모에게 있다
  function handleChange(e) {
    const { name, value } = e.target
    onChange({ ...user, [name]: value })                               // 고친 사용자 객체를 부모에게 올림
  }

  return (
    <div>
      <p><input name="name" value={user.name} onChange={handleChange} /></p>
      <p>
        <select name="dept" value={user.dept} onChange={handleChange}>
          <option>개발</option><option>영업</option><option>총무</option>
        </select>
      </p>
      <p style={{ color: '#888' }}>id {user.id} · 입력하는 즉시 왼쪽 그리드도 바뀐다</p>
    </div>
  )
}

function Lesson7Lifting() {
  // ② 의 공유 state
  const [shared, setShared] = useState(0)

  // ③ 의 공유 state — 그리드와 폼이 함께 쓰는 것은 전부 여기
  const [users, setUsers] = useState([
    { id: 1, name: '홍길동', dept: '개발' },
    { id: 2, name: '김영희', dept: '영업' },
    { id: 3, name: '이철수', dept: '총무' },
  ])
  const [selectedId, setSelectedId] = useState(null)

  // 그릴 때 계산하는 값 — 선택된 사용자 객체 (state 로 따로 두지 않는다. 5단계 shown 과 같은 이유)
  const selected = users.find(u => u.id === selectedId)

  // 폼이 올려 준 사용자로 목록의 그 한 명만 교체 (불변성 — map 으로 새 배열)
  function updateUser(changed) {
    setUsers(users.map(u => (u.id === changed.id ? changed : u)))
  }

  return (
    <>
      <h1>state 끌어올리기</h1>

      <h3>① 각자 state — 형제가 서로 모른다</h3>
      <CounterAlone label="A" /> <CounterAlone label="B" />
      <p>A 를 눌러도 B 는 모른다. 둘의 합도 아무 데서도 못 구한다.</p>

      <h3>② 부모로 올린 state — 같은 값을 함께 본다</h3>
      <CounterShared label="A" value={shared} onChange={setShared} />{' '}
      <CounterShared label="B" value={shared} onChange={setShared} />
      <p>부모가 아는 값: {shared} — 어느 쪽을 눌러도 둘이 같이 바뀐다.</p>

      <h3>③ 그리드 선택 → 상세 폼 (형제 사이의 데이터 공유)</h3>
      <div style={{ display: 'flex', gap: 24 }}>
        <UserGrid users={users} selectedId={selectedId} onSelect={setSelectedId} />
        <UserDetail user={selected} onChange={updateUser} />
      </div>

      <h3>부모의 state</h3>
      <pre>{JSON.stringify({ selectedId, users }, null, 2)}</pre>
    </>
  )
}

export default Lesson7Lifting
