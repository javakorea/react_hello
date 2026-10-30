// 6단계 — 폼: 제어 컴포넌트 · 여러 칸 한 객체로 · 검증 · 제출
// 핵심: input 이 값을 들고 있지 않다. state 가 값을 들고, input 은 그걸 보여 주기만 한다.

import { useState } from 'react'

const 빈값 = { name: '', dept: '개발', email: '', agree: false }

function Lesson6Form() {
  // ① 칸 하나 = state 하나 (가장 단순한 형태)
  const [memo, setMemo] = useState('')

  // ② 칸 여러 개 = 객체 하나
  const [form, setForm] = useState(빈값)
  const [saved, setSaved] = useState([])

  // name 속성으로 어느 칸인지 알아내 그 칸만 바꾼다
  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  // ③ 검증 — state 에서 그릴 때마다 계산 (별도 state 아님)
  const errors = {}
  if (form.name.trim() === '') errors.name = '이름을 입력하세요'
  if (!form.email.includes('@')) errors.email = '이메일 형식이 아닙니다'
  if (!form.agree) errors.agree = '동의가 필요합니다'
  const isValid = Object.keys(errors).length === 0

  // ④ 제출 — 새로고침 막고 state 를 쓴다 (DOM 에서 값을 꺼내지 않는다)
  function handleSubmit(e) {
    e.preventDefault()
    if (!isValid) return
    setSaved([...saved, { ...form, id: Date.now() }])
    setForm(빈값)   // 빈 객체를 넣으면 화면의 칸도 비워진다 — 제어 컴포넌트니까
  }

  return (
    <>
      <h1>폼 — 제어 컴포넌트</h1>

      <h3>① 칸 하나: value 와 onChange 가 한 쌍</h3>
      <input value={memo} onChange={e => setMemo(e.target.value)} placeholder="메모" />
      <p>글자 수: {memo.length} · 대문자: {memo.toUpperCase()}</p>
      <button onClick={() => setMemo('')}>비우기</button>
      {/* 실험: onChange 를 지워 보면 글자가 안 쳐진다 — state 가 안 바뀌니 input 도 안 바뀐다 */}

      <h3>② 칸 여러 개: 객체 하나 + name 속성</h3>
      <form onSubmit={handleSubmit}>
        <p>
          <input name="name" value={form.name} onChange={handleChange} placeholder="이름" />
          {errors.name && <span style={{ color: 'red' }}> {errors.name}</span>}
        </p>
        <p>
          <select name="dept" value={form.dept} onChange={handleChange}>
            <option value="개발">개발</option>
            <option value="영업">영업</option>
            <option value="총무">총무</option>
          </select>
        </p>
        <p>
          <input name="email" value={form.email} onChange={handleChange} placeholder="이메일" />
          {errors.email && <span style={{ color: 'red' }}> {errors.email}</span>}
        </p>
        <p>
          <label>
            <input name="agree" type="checkbox" checked={form.agree} onChange={handleChange} />
            개인정보 수집 동의
          </label>
          {errors.agree && <span style={{ color: 'red' }}> {errors.agree}</span>}
        </p>
        <button type="submit" disabled={!isValid}>저장</button>
        <button type="button" onClick={() => setForm(빈값)}>초기화</button>
      </form>

      <h3>지금 state (입력하는 대로 바뀜)</h3>
      <pre>{JSON.stringify(form, null, 2)}</pre>

      <h3>저장된 것 {saved.length}건</h3>
      <ul>
        {saved.map(s => <li key={s.id}>{s.name} / {s.dept} / {s.email}</li>)}
      </ul>
    </>
  )
}

export default Lesson6Form
