// 14단계 — 주소 /posts 의 목록 화면. 행마다 상세 화면으로 가는 Link 를 붙인다.
// to={`/posts/${p.id}`} → /posts/1, /posts/2 … 주소가 만들어지고, 상세 화면이 주소에서 id 를 읽는다(PostDetail.jsx).

import { useEffect, useState } from 'react'
import { Link } from 'react-router'

function PostList() {
  const [rows, setRows] = useState([])

  useEffect(() => {
    fetch('/example/posts.json')
      .then(res => res.json())
      .then(setRows)
  }, [])

  return (
    <div>
      <h2>게시글 목록</h2>
      <ul>
        {rows.map(p => (
          <li key={p.id}>
            <Link to={`/posts/${p.id}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostList
