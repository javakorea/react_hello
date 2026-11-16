// 14단계 덧붙임 — MiniRouter 를 쓰는 쪽. Lesson14Router.jsx(react-router)와 모양을 맞췄다.
// main.jsx 의 import 를 이 파일로 바꾸면 혼자 뜬다.

import { MiniRouter, Outlet, Link, useParams, useNavigate } from './MiniRouter.jsx'

function Layout() {
  return (
    <div>
      <nav>
        <Link to="/">홈</Link> |{' '}
        <Link to="/posts/1">1번 글</Link> |{' '}
        <Link to="/posts/2">2번 글</Link> |{' '}
        <Link to="/nowhere">없는 주소</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  )
}

function Home() {
  return <p>홈 화면</p>
}

function Post() {
  const { id } = useParams()
  const navigate = useNavigate()
  return (
    <div>
      <p>{id}번 글 상세</p>
      <button onClick={() => navigate(`/posts/${Number(id) + 1}`)}>다음 글</button>
    </div>
  )
}

function NotFound() {
  return <p>없는 화면입니다</p>
}

function ExMiniRouter() {
  return (
    <MiniRouter
      layout={<Layout />}
      routes={[
        { path: '/', element: <Home /> },
        { path: '/posts/:id', element: <Post /> },
        { path: '*', element: <NotFound /> },
      ]}
    />
  )
}

export default ExMiniRouter
