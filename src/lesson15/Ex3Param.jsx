// 15단계 ③ 조건이 있는 조회 — 조건을 queryKey 에 넣는다
// queryKey: ['post', id] → 1번 · 2번 · 3번이 각각 다른 캐시가 된다.
// 1 → 2 → 1 을 누르면 두 번째 1 은 「불러오는 중」 없이 바로 나온다(캐시). 4 는 없는 글이라 오류.
// id 가 바뀌면 키가 바뀌니 라이브러리가 알아서 다시 부른다 — useEffect 의존성 배열을 쓰지 않는다.

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPost } from './fakeApi.js'

function Ex3Param() {
  const [id, setId] = useState(1)
  const { data, isPending, error } = useQuery({
    queryKey: ['post', id],                            // ← 조건이 키에 들어간다
    queryFn: () => getPost(id),
    retry: false,                                      // 오류 때 다시 시도하지 않게(기본은 3번 더 시도)
  })

  return (
    <div>
      {[1, 2, 3, 4].map(n => (
        <button key={n} onClick={() => setId(n)} disabled={n === id}>{n}번</button>
      ))}
      {isPending && <p>불러오는 중…</p>}
      {error && <p>오류: {error.message}</p>}
      {data && <p>{data.id}번: {data.title}</p>}
    </div>
  )
}

export default Ex3Param
