// 12단계 ② useToggle — 가장 작은 커스텀 hook
// ①(Ex1Copy.jsx)에서 복사하던 두 줄이 useToggle() 한 줄이 된다. hook 은 useToggle.js 에 있다.

import { useToggle } from './useToggle.js'

function Notice() {
  const [open, toggle] = useToggle()           // 두 줄이 한 줄로
  return (
    <p>
      <button onClick={toggle}>공지 {open ? '접기' : '펼치기'}</button>
      {open && ' 11월 20일 서버 점검이 있습니다.'}
    </p>
  )
}

function Help() {
  const [open, toggle] = useToggle(true)       // 처음 값만 다르게 — 처음부터 펼친다
  return (
    <p>
      <button onClick={toggle}>도움말 {open ? '접기' : '펼치기'}</button>
      {open && ' 조회 조건을 넣고 [조회]를 누르세요.'}
    </p>
  )
}

function Ex2Toggle() {
  return (
    <div>
      <Notice />
      <Help />
    </div>
  )
}

export default Ex2Toggle
