// 12단계 ① 문제 — 같은 state·함수를 컴포넌트마다 복사
// NoticeCopy 와 HelpCopy 의 첫 두 줄이 글자까지 같다. 이 두 줄을 함수로 빼는 것이 ②(Ex2Toggle.jsx).

import { useState } from 'react'

function NoticeCopy() {
  const [open, setOpen] = useState(false)      // ← 복사 1
  const toggle = () => setOpen(v => !v)
  return (
    <p>
      <button onClick={toggle}>공지 {open ? '접기' : '펼치기'}</button>
      {open && ' 11월 20일 서버 점검이 있습니다.'}
    </p>
  )
}

function HelpCopy() {
  const [open, setOpen] = useState(false)      // ← 복사 2 — 글자까지 같다
  const toggle = () => setOpen(v => !v)
  return (
    <p>
      <button onClick={toggle}>도움말 {open ? '접기' : '펼치기'}</button>
      {open && ' 조회 조건을 넣고 [조회]를 누르세요.'}
    </p>
  )
}

function Ex1Copy() {
  return (
    <div>
      <NoticeCopy />
      <HelpCopy />
    </div>
  )
}

export default Ex1Copy
