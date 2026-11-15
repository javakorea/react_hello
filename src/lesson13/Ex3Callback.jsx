// 13단계 ③ useCallback — 함수 props 때문에 memo 가 깨지는 것 막기
// 부모가 리렌더링될 때마다 const onSave = () => … 는 「새 함수」로 만들어진다(내용이 같아도 다른 객체).
// 그래서 memo 로 감싼 자식도 props 가 바뀌었다고 보고 리렌더링된다(위 버튼).
// useCallback(함수, [의존성]) 은 의존성이 그대로면 지난번 함수를 그대로 돌려준다 → memo 가 다시 먹힌다(아래 버튼).

import { useState, useEffect, useCallback, memo } from 'react'

const SaveButton = memo(function SaveButton({ label, onSave }) {
  useEffect(() => console.log('③ SaveButton 리렌더링', label))
  return <button onClick={onSave}>{label}</button>
})

function Ex3Callback() {
  const [count, setCount] = useState(0)

  const onSavePlain = () => console.log('저장')                  // 렌더링마다 새 함수
  const onSaveCached = useCallback(() => console.log('저장'), [])   // 같은 함수를 계속 씀

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>+1 ({count})</button>
      <p><SaveButton label="그냥 함수" onSave={onSavePlain} /></p>
      <p><SaveButton label="useCallback" onSave={onSaveCached} /></p>
    </div>
  )
}

export default Ex3Callback
