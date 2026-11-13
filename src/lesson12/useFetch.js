// 9단계 UserList 안에 있던 「state 3개 + useEffect + 늦게 온 응답 버리기」를 그대로 옮긴 hook.
// 화면은 주소만 넘기고 { data, loading, error, reload } 를 받는다.
import { useState, useEffect } from 'react'

const wait = ms => new Promise(r => setTimeout(r, ms))                 // 「불러오는 중」이 보이게 일부러 늦춘다

export function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [nonce, setNonce] = useState(0)                                // reload() 가 올리는 번호 — 바뀌면 effect 가 다시 돈다

  useEffect(() => {
    let ignore = false                                                 // 9단계: 정리 함수가 세우는 깃발
    async function load() {
      console.log('useFetch 요청', url)
      setLoading(true)
      setError(null)
      try {
        await wait(800)
        const res = await fetch(url, { headers: { Accept: 'application/json' } })
        if (!res.ok) throw new Error('HTTP ' + res.status)
        const json = await res.json()
        if (!ignore) setData(json)
      } catch (e) {
        if (!ignore) setError(e.message)
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    load()
    return () => { ignore = true }
  }, [url, nonce])

  const reload = () => setNonce(n => n + 1)
  return { data, loading, error, reload }                              // 여러 개라 객체로 — 받는 쪽이 필요한 것만 고른다
}
