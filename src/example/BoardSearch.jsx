// 예제 — 상단 조회 조건(제목) + [조회] 버튼, 하단 조회 결과 테이블
// MOCA 에 견주면: 조회 form + 그리드 화면. 조회 버튼 = $p.fn_search, 그리드 바인딩 = state 로 렌더링.
// 서버 대신 public/example/posts.json 을 불러와 브라우저에서 제목으로 거른다
// (실제 서버라면 fetch 주소에 ?title= 을 붙여 서버가 거르게 한다).

import { useState, useEffect } from 'react'

const wait = ms => new Promise(r => setTimeout(r, ms))

function BoardSearch() {
  const [title, setTitle] = useState('')      // 조회 조건 input 값(제어 컴포넌트)
  const [rows, setRows] = useState([])        // 조회 결과 — 테이블이 이것으로 렌더링된다
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function search(e) {
    e?.preventDefault()                       // form submit 으로 페이지가 새로 고쳐지지 않게
    setLoading(true)
    setError(null)
    try {
      await wait(300)                         // 「조회 중」이 보이게 일부러 늦춘다
      const res = await fetch('/example/posts.json')
      if (!res.ok) throw new Error('HTTP ' + res.status)
      const all = await res.json()
      const q = title.trim()
      setRows(q ? all.filter(r => r.title.includes(q)) : all)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { search() }, [])           // 화면이 마운트되면 한 번 전체 조회(onpageload 같은 자리)

  return (
    <div style={{ textAlign: 'left' }}>
      <h1>게시글 조회</h1>

      {/* ── 상단: 조회 조건 ── form 이라 input 에서 Enter 를 쳐도 조회된다 */}
      <form onSubmit={search} style={box}>
        <label>
          제목{' '}
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="제목 일부" />
        </label>{' '}
        <button type="submit" disabled={loading}>{loading ? '조회 중…' : '조회'}</button>
      </form>

      {/* ── 하단: 조회 결과 테이블 ── */}
      {error && <p style={{ color: 'crimson' }}>오류: {error}</p>}
      <p>총 {rows.length}건</p>
      <table style={table}>
        <thead>
          <tr>
            <th style={cell}>번호</th>
            <th style={cell}>제목</th>
            <th style={cell}>작성자</th>
            <th style={cell}>작성일</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr><td style={cell} colSpan={4}>조회 결과가 없습니다.</td></tr>
          ) : (
            rows.map(r => (
              <tr key={r.id}>
                <td style={cell}>{r.id}</td>
                <td style={cell}>{r.title}</td>
                <td style={cell}>{r.writer}</td>
                <td style={cell}>{r.date}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

const box = { padding: 12, border: '1px solid #ccc', borderRadius: 6, marginBottom: 12 }
const table = { borderCollapse: 'collapse', width: '100%' }
const cell = { border: '1px solid #ccc', padding: '6px 10px' }

export default BoardSearch
