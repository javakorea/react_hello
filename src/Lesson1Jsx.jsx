// 1단계 — JSX 연습
// 규칙 ①~⑤ 를 하나씩 보여 준다. 값을 바꿔 저장하면 5173 화면에 바로 반영된다(HMR).

function Lesson1Jsx() {
  // 평범한 JS 변수 — JSX 안에서 {} 로 꺼내 쓴다
  const userName = '홍길동'
  const price = 12000
  const qty = 3
  const isAdmin = true
  const today = new Date()

  return (
    // ⑤ 최상위는 태그 하나여야 한다 → 감쌀 div 가 필요 없으면 <> </> (조각, Fragment)
    <>
      {/* ④ 주석은 이렇게 — {} 안에 JS 주석 */}
      <h1>JSX 연습</h1>

      {/* ① {} 안에는 「값이 되는 JS 식」 이면 무엇이든 */}
      <p>이름: {userName}</p>
      <p>합계: {price * qty} 원</p>
      <p>천 단위: {(price * qty).toLocaleString()} 원</p>
      <p>오늘: {today.toLocaleDateString('ko-KR')}</p>
      <p>권한: {isAdmin ? '관리자' : '일반'}</p>
      {/* if 문·for 문은 「식」 이 아니라서 {} 안에 못 쓴다 → 삼항·map 을 쓴다(5단계) */}

      {/* ② 속성 이름이 HTML 과 다른 것들 */}
      <label htmlFor="memo" className="title">메모</label>
      <input id="memo" defaultValue="여기에 입력" />

      {/* ② style 은 문자열이 아니라 객체 — 그래서 중괄호가 두 겹 {{ }} */}
      <p style={{ color: 'crimson', fontWeight: 'bold' }}>빨간 굵은 글씨</p>

      {/* ③ 내용 없는 태그도 반드시 닫는다 — <br> 가 아니라 <br /> */}
      <hr />
      <img src="/favicon.svg" width={32} alt="" />
    </>
  )
}

export default Lesson1Jsx
