// 15단계 ① useQuery — 12단계 useFetch 를 라이브러리가 대신 해 준다
// queryKey : 이 데이터의 이름(캐시 키). 같은 키면 같은 데이터로 본다(②).
// queryFn  : 데이터를 가져오는 함수. Promise 를 리턴하면 된다.
// 돌려받는 것: data · isPending(처음 불러오는 중) · error · refetch(다시 불러오기) 등.
// 12단계에서 직접 짠 state 3개 + useEffect + ignore 깃발이 전부 이 안에 있다.

import { useQuery } from '@tanstack/react-query'
import { getPosts } from './fakeApi.js'

function Ex1Basic() {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  if (isPending) return <p>불러오는 중…</p>
  if (error) return <p>오류: {error.message}</p>
  return (
    <div>
      <ul>
        {data.map(p => <li key={p.id}>{p.title}</li>)}
      </ul>
      <button onClick={() => refetch()}>다시 불러오기</button>
    </div>
  )
}

export default Ex1Basic
