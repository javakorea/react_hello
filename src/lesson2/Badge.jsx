// 2단계 숙제 정답 예시 — props 두 개(label·color)를 받아 색깔 꼬리표를 그린다.
// color 를 안 넘기면 기본값 'lightgray'.

function Badge({ label, color = 'lightgray' }) {
  return (
    <span style={{ background: color, padding: '2px 8px', borderRadius: 8, marginRight: 4 }}>
      {label}
    </span>
  )
}

export default Badge
