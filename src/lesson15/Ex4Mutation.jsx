// 15단계 ④ 저장 뒤 목록 갱신 — useMutation + invalidateQueries
// useMutation : 저장·수정·삭제처럼 서버를 바꾸는 요청. mutate(값) 으로 실행한다.
// onSuccess 에서 invalidateQueries(['posts']) → 「posts 캐시는 낡았다」고 표시 →
// ['posts'] 를 쓰는 화면이 전부 알아서 다시 불러온다. ①·② 의 목록도 같이 늘어난다(같은 키).
// MOCA 에 견주면: 저장 콜백에서 조회 함수를 다시 부르던 것을, 키 하나로 「이 데이터 쓰는 곳 전부」에 알린다.

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addPost } from './fakeApi.js'

function Ex4Mutation() {
  const [title, setTitle] = useState('')
  const queryClient = useQueryClient()                 // Lesson15Query.jsx 의 Provider 가 준 그 client

  const { mutate, isPending } = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      setTitle('')
    },
  })

  return (
    <p>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="새 글 제목" />{' '}
      <button onClick={() => mutate(title)} disabled={!title || isPending}>
        {isPending ? '저장 중…' : '저장'}
      </button>
    </p>
  )
}

export default Ex4Mutation
