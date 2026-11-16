// 16단계 ④ persist — store 를 localStorage 에 저장해 새로고침(F5) 뒤에도 남긴다
// 보통 state 는 F5 를 누르면 처음 값으로 돌아간다. persist 로 감싸면 바뀔 때마다 저장하고, 시작할 때 읽어 온다.
// 테마·메뉴 접힘·최근 검색어처럼 「다시 와도 남아야 하는 화면 설정」에 쓴다. 비밀번호·토큰은 넣지 않는다.

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useThemeStore = create(
  persist(
    set => ({
      theme: 'light',
      toggle: () => set(s => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
    }),
    { name: 'lesson16-theme' },                    // localStorage 키 이름
  ),
)

function Ex4Persist() {
  const theme = useThemeStore(s => s.theme)
  const toggle = useThemeStore(s => s.toggle)
  const dark = theme === 'dark'
  return (
    <div style={{ padding: 8, background: dark ? '#333' : '#eee', color: dark ? '#fff' : '#000' }}>
      테마: {theme}{' '}
      <button onClick={toggle}>바꾸기</button>
      <span> ← 바꾼 뒤 F5 를 눌러도 남는다</span>
    </div>
  )
}

export default Ex4Persist
