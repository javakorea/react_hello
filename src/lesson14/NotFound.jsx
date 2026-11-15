// 14단계 — 어느 Route 에도 맞지 않는 주소(path="*")에 뜨는 화면. 서버의 404 페이지와 같은 자리다.

import { Link, useLocation } from 'react-router'

function NotFound() {
  const { pathname } = useLocation()                  // 지금 주소
  return (
    <div>
      <h2>없는 화면</h2>
      <p>{pathname} 주소에 맞는 화면이 없습니다.</p>
      <Link to="/">홈으로</Link>
    </div>
  )
}

export default NotFound
