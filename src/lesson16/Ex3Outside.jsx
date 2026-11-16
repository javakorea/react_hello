// 16단계 ③ 컴포넌트 밖에서 읽고 바꾸기 — getState · setState
// hook 은 컴포넌트 안에서만 부를 수 있다(12단계). store 는 보통 JS 함수에서도 쓸 수 있다.
// 공통 함수(로그아웃·통신 오류 처리 등)가 로그인 정보를 읽거나 지울 때 쓴다. MOCA 의 전역 변수 자리.

import { create } from 'zustand'

const useUserStore = create(() => ({
  user: null,
}))

// 컴포넌트가 아닌 보통 함수 — hook 이 아니라 getState · setState 를 쓴다
function login(name) {
  useUserStore.setState({ user: { name } })
}

function logout() {
  const { user } = useUserStore.getState()
  console.log('로그아웃:', user?.name)
  useUserStore.setState({ user: null })
}

function UserBar() {
  const user = useUserStore(s => s.user)           // 컴포넌트 안에서는 hook 으로 — 바뀌면 리렌더링
  return <p>{user ? `${user.name} 님` : '로그인 안 함'}</p>
}

function Ex3Outside() {
  return (
    <div>
      <UserBar />
      <button onClick={() => login('홍길동')}>로그인</button>{' '}
      <button onClick={logout}>로그아웃</button>{' '}
      <button onClick={() => setTimeout(logout, 2000)}>2초 뒤 로그아웃</button>
    </div>
  )
}

export default Ex3Outside
