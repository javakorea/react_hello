import { useRef } from 'react'

function NameInput({ ref, label }) {
  return <label>{label} <input ref={ref} /></label>
}

function Ex4FocusChild() {
  const nameRef = useRef(null)
  return (
    <p>
      <NameInput ref={nameRef} label="이름" />{' '}
      <button onClick={() => nameRef.current.focus()}>자식 input 에 포커스</button>
    </p>
  )
}

export default Ex4FocusChild
