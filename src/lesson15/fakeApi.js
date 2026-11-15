// 15단계 — 서버 대신 쓰는 가짜 API. 실제 서버라면 이 자리에 fetch('/api/posts') 가 온다.
// 메모리 배열에 저장하고 0.6초 늦게 응답한다. 요청마다 콘솔에 찍어 「몇 번 불렸나」를 볼 수 있게 했다.

const wait = ms => new Promise(r => setTimeout(r, ms))

let posts = [
  { id: 1, title: '11월 서버 점검 안내' },
  { id: 2, title: 'React 스터디 모집' },
  { id: 3, title: '사내 체육대회 일정' },
]

export async function getPosts() {
  console.log('API getPosts 요청')
  await wait(600)
  return [...posts]
}

export async function getPost(id) {
  console.log('API getPost 요청', id)
  await wait(600)
  const p = posts.find(x => x.id === id)
  if (!p) throw new Error(`${id}번 게시글이 없습니다`)
  return p
}

export async function addPost(title) {
  console.log('API addPost 요청', title)
  await wait(600)
  const p = { id: posts.length + 1, title }
  posts = [...posts, p]
  return p
}
