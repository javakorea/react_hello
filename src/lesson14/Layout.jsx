// 14단계 — 공통 레이아웃: 모든 화면 위에 붙는 메뉴 + 아래에 바뀌는 화면 자리(<Outlet />)
// MOCA 에 견주면: index.html 의 헤더·좌측 메뉴가 Layout, 업무 화면이 뜨는 MDI 자리가 <Outlet />.
//
// Link 는 <a> 와 비슷하지만 페이지를 새로 받지 않는다 — 주소만 바꾸고 React 가 그 화면을 렌더링한다(SPA).
// NavLink 는 Link 에 「지금 이 주소인가」를 더한 것 — style 에 함수를 주면 isActive 를 받는다.

import { NavLink, Outlet } from 'react-router'

const menuStyle = ({ isActive }) => ({
  marginRight: 12,
  fontWeight: isActive ? 'bold' : 'normal',
})

function Layout() {
  return (
    <div style={{ textAlign: 'left' }}>
      <nav style={{ borderBottom: '1px solid #ccc', paddingBottom: 8 }}>
        <NavLink to="/" end style={menuStyle}>홈</NavLink>
        <NavLink to="/posts" style={menuStyle}>게시글</NavLink>
        <NavLink to="/nowhere" style={menuStyle}>없는 주소</NavLink>
      </nav>

      <Outlet />{/* ← 주소에 맞는 화면이 여기에 렌더링된다 */}
    </div>
  )
}

export default Layout
