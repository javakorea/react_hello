import { useState, useRef } from 'react'

function Ex2Counters() {
  let plain = 0
  const [state, setState] = useState(0)
  const ref = useRef(0)
  const [, rerender] = useState(0)

  return (
    <>
      <p>
        <button onClick={() => { plain += 1; console.log('② let =', plain) }}>let +1</button>{' '}
        <button onClick={() => setState(state + 1)}>state +1</button>{' '}
        <button onClick={() => { ref.current += 1; console.log('② ref.current =', ref.current) }}>ref +1</button>{' '}
        <button onClick={() => rerender(n => n + 1)}>리렌더링만</button>
      </p>
      <p>let: {plain} · state: {state} · ref: {ref.current}</p>
    </>
  )
}

export default Ex2Counters
