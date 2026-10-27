// 4단계 — 이벤트
// on + 이벤트이름(카멜 표기)에 「함수」를 넘긴다. 부르지 않는다.

import { useState } from 'react'

function Lesson4Event() {
  const [msg, setMsg] = useState('')
  const [text, setText] = useState('')
  const [fruits, setFruits] = useState(['사과', '배', '귤'])
  const [count, setCount] = useState(0)

  // ① 함수를 따로 만들어 이름으로 넘긴다
  function handleHello() {
    setMsg('안녕! (' + new Date().toLocaleTimeString() + ')')
  }

  // ② 이벤트 객체 e — React 가 함수를 부를 때 넣어 준다
  function handleChange(e) {
    setText(e.target.value)   // e.target = 이벤트가 난 태그(input)
  }

  // ③ 인자가 필요하면 화살표 함수로 한 번 감싼다
  function remove(name) {
    setFruits(fruits.filter(f => f !== name))
  }

  // ④ 폼 제출 — 브라우저 기본 동작(페이지 새로고침)을 막는다
  function handleSubmit(e) {
    e.preventDefault()
    setMsg('제출: ' + text)
  }

  return (
    <>
      <h1>이벤트</h1>

      <h3>① 함수 넘기기 vs 부르기</h3>
      <button onClick={handleHello}>인사</button>
      {/* onClick={handleHello()} 라고 쓰면 그릴 때 바로 불려 버린다.
          안에서 setState 를 하면 → 다시 그림 → 또 부름 → 무한 반복 오류 */}
      <p>{msg}</p>

      <h3>② 이벤트 객체 (onChange)</h3>
      <input value={text} onChange={handleChange} placeholder="입력해 보세요" />
      <p>입력값: {text} ({text.length}자)</p>

      <h3>③ 인자 넘기기</h3>
      {fruits.map(f => (
        <button key={f} onClick={() => remove(f)}>{f} 지우기</button>
      ))}
      <button onClick={() => setFruits(['사과', '배', '귤'])}>되돌리기</button>

      <h3>④ 폼 제출 (Enter 도 됨)</h3>
      <form onSubmit={handleSubmit}>
        <input value={text} onChange={e => setText(e.target.value)} />
        <button type="submit">제출</button>
      </form>

      <h3>⑤ 한 번에 여러 번 바꾸기</h3>
      <button onClick={() => { setCount(count + 1); setCount(count + 1); setCount(count + 1) }}>
        +3 (안 되는 예 → +1)
      </button>
      <button onClick={() => { setCount(c => c + 1); setCount(c => c + 1); setCount(c => c + 1) }}>
        +3 (함수로 넘김 → +3)
      </button>
      <p>count = {count}</p>
    </>
  )
}

export default Lesson4Event
