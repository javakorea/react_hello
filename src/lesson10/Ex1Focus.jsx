import { useEffect, useRef } from 'react'

function Ex1Focus() {
  const inputRef = useRef(null)

  useEffect(() => {
    console.log('① 마운트 뒤 inputRef.current =', inputRef.current)
    inputRef.current.focus()
  }, [])

  return (
    <p>
      <input ref={inputRef} placeholder="이름" />{' '}
      <button onClick={() => inputRef.current.focus()}>input 에 포커스</button>
    </p>
  )
}

export default Ex1Focus
