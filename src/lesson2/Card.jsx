// children = 여는 태그와 닫는 태그 사이에 넣은 내용.
// <Card title="회원">여기 내용</Card> → children 은 「여기 내용」

function Card({ title, children }) {
  return (
    <div style={{ border: '1px solid #aaa', borderRadius: 8, padding: 12, margin: '12px 0' }}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      {children}
    </div>
  )
}

export default Card
