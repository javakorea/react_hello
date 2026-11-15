// 13단계 ④ useMemo — 무거운 계산 결과를 저장해 두기
// 행 30만 개를 거르는 계산이 컴포넌트 본문에 있으면, 상관없는 state(count)가 바뀌어 리렌더링될 때도 다시 돈다.
// useMemo(() => 계산, [의존성]) 은 의존성(keyword)이 그대로면 지난번 결과를 그대로 돌려준다.
// 화면에 계산에 걸린 시간이 나온다 — [+1] 을 눌러 보면 위(그냥)는 매번 다시 계산, 아래(useMemo)는 안 한다.

import { useState, useMemo } from 'react'

const ROWS = Array.from({ length: 300000 }, (_, i) => `게시글 ${i}`)

function search(keyword) {
  const t = performance.now()
  const hit = ROWS.filter(r => r.includes(keyword)).length
  return { hit, ms: (performance.now() - t).toFixed(1) }
}

function Plain({ keyword, count }) {
  const r = search(keyword)                                       // 렌더링마다 계산
  return <p>그냥: {r.hit}건 · {r.ms}ms (count {count})</p>
}

function Cached({ keyword, count }) {
  const r = useMemo(() => search(keyword), [keyword])             // keyword 가 바뀔 때만 계산
  return <p>useMemo: {r.hit}건 · {r.ms}ms (count {count})</p>
}

function Ex4UseMemo() {
  const [count, setCount] = useState(0)
  const [keyword, setKeyword] = useState('7')
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>+1 ({count})</button>{' '}
      검색어 <input value={keyword} onChange={e => setKeyword(e.target.value)} />
      <Plain keyword={keyword} count={count} />
      <Cached keyword={keyword} count={count} />
    </div>
  )
}

export default Ex4UseMemo
