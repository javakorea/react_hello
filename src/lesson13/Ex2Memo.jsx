// 13단계 ② memo — props 가 그대로면 자식 리렌더링을 건너뛴다
// memo(컴포넌트) 로 감싸면 React 가 이전 props 와 새 props 를 비교해(Object.is) 같으면 이전 결과를 그대로 쓴다.
// [+1] 을 눌러도 MemoChild 는 콘솔에 안 찍힌다. [이름 바꾸기] 를 누르면 name props 가 바뀌어 찍힌다.

import { useState, useEffect, memo } from 'react'

const MemoChild = memo(function MemoChild({ name }) {
  useEffect(() => console.log('② MemoChild 리렌더링', name))
  return <p>이름: {name}</p>
})

function Ex2Memo() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('홍길동')
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>+1 ({count})</button>{' '}
      <button onClick={() => setName(n => (n === '홍길동' ? '김영희' : '홍길동'))}>이름 바꾸기</button>
      <MemoChild name={name} />
    </div>
  )
}

export default Ex2Memo
