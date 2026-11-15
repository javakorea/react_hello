// 14단계 — 라우팅(React Router): 주소마다 다른 화면
// 이 파일은 「주소 → 화면」 표만 있다. 화면은 하나씩 따로 있다(Layout · Home · PostList · PostDetail · NotFound).
//
// BrowserRouter — 주소창을 지켜보다가 바뀌면 다시 렌더링한다. 앱 맨 바깥에 한 번만 둔다.
// Routes / Route — 주소와 화면의 짝. 위에서부터가 아니라 가장 잘 맞는 하나를 고른다.
// Route 안에 Route — 바깥(Layout)이 공통으로 붙고 안쪽 화면이 Layout 의 <Outlet /> 자리에 들어간다.
// :id   — 주소 매개변수. /posts/3 이면 PostDetail 이 useParams() 로 '3' 을 읽는다.
// *     — 아무 데도 안 맞는 주소.
// Spring 에 견주면: @GetMapping("/posts/{id}") + @PathVariable 와 같은 표를 브라우저 쪽에서 갖는 것.

import { BrowserRouter, Routes, Route } from 'react-router'
import Layout from './Layout.jsx'
import Home from './Home.jsx'
import PostList from './PostList.jsx'
import PostDetail from './PostDetail.jsx'
import NotFound from './NotFound.jsx'

function Lesson14Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Lesson14Router
