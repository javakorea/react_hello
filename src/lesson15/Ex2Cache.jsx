// 15단계 ② 캐시 — 같은 queryKey 는 한 번만 요청하고 함께 쓴다
// PostCount 와 PostTitles 가 둘 다 ['posts'] 를 쓴다 → 요청은 한 번(콘솔 「API getPosts 요청」).
// [숨기기] 뒤 [보이기] 를 누르면(언마운트 → 마운트) 「불러오는 중」 없이 캐시된 목록이 바로 나온다.
// 동시에 뒤에서 한 번 더 불러와 최신으로 바꾼다 — 그동안 isFetching 이 true(「갱신 중」 표시).
// 12단계 useFetch 는 컴포넌트마다 따로 요청하고, 다시 마운트되면 처음부터 다시 불렀다.

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPosts } from './fakeApi.js'

function usePosts() {                                  // 같은 쿼리를 여러 곳에서 쓰니 커스텀 hook 으로(12단계)
  return useQuery({ queryKey: ['posts'], queryFn: getPosts })
}

function PostCount() {
  const { data, isPending, isFetching } = usePosts()
  if (isPending) return <p>건수: 불러오는 중…</p>
  return <p>건수: {data.length}건 {isFetching && '(갱신 중)'}</p>
}

function PostTitles() {
  const { data, isPending } = usePosts()
  if (isPending) return <p>제목: 불러오는 중…</p>
  return <p>제목: {data.map(p => p.title).join(' / ')}</p>
}

function Ex2Cache() {
  const [show, setShow] = useState(true)
  return (
    <div>
      <button onClick={() => setShow(s => !s)}>{show ? '숨기기' : '보이기'}</button>
      {show && (
        <>
          <PostCount />
          <PostTitles />
        </>
      )}
    </div>
  )
}

export default Ex2Cache
