// 14단계 — 주소 /posts/:id 의 상세 화면
// useParams()  — 주소의 :id 자리 값을 읽는다. /posts/3 이면 { id: '3' } (언제나 문자열).
// useNavigate() — 코드로 화면을 옮기는 함수를 준다. navigate('/posts') · navigate(-1)(뒤로).
// MOCA 에 견주면: useParams 는 $p.getParameter(), navigate 는 openTab·화면 이동.

import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'

function PostDetail() {
  const { id } = useParams()                          // ← 주소에서 읽은 값
  const navigate = useNavigate()
  const [post, setPost] = useState(null)

  useEffect(() => {
    fetch('/example/posts.json')
      .then(res => res.json())
      .then(all => setPost(all.find(p => p.id === Number(id)) ?? 'none'))
  }, [id])                                            // ← id 가 바뀌면 다시 불러온다

  if (post === null) return <p>불러오는 중…</p>
  if (post === 'none') return <p>{id}번 게시글이 없습니다.</p>

  return (
    <div>
      <h2>{post.title}</h2>
      <p>번호 {post.id} · {post.writer} · {post.date}</p>
      <button onClick={() => navigate(-1)}>뒤로</button>{' '}
      <button onClick={() => navigate('/posts')}>목록으로</button>{' '}
      <button onClick={() => navigate(`/posts/${post.id + 1}`)}>다음 글</button>
    </div>
  )
}

export default PostDetail
