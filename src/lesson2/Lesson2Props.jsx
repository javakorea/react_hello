// 2단계 — 컴포넌트와 props
// 다른 파일의 컴포넌트를 import 해서 태그처럼 쓴다.

import Greeting from './Greeting.jsx'
import Card from './Card.jsx'

function Lesson2Props() {
  return (
    <>
      <h1>컴포넌트와 props</h1>

      {/* 같은 컴포넌트를 값만 바꿔 여러 번 — 문자열은 "", 그 밖의 값은 {} */}
      <Greeting name="홍길동" age={30} isVip={true} />
      <Greeting name="김철수" age={25} />
      <Greeting name="이영희" isVip />  {/* 값 없이 이름만 쓰면 true. age 는 기본값 0 */}

      {/* children — 태그 사이에 넣은 것이 Card 안으로 들어간다 */}
      <Card title="회원 정보">
        <Greeting name="박민수" age={41} />
        <p>Card 는 테두리만 그리고, 안의 내용은 쓰는 쪽이 정한다.</p>
      </Card>

      <Card title="공지">
        <ul>
          <li>컴포넌트 이름은 대문자로 시작</li>
          <li>props 는 읽기 전용</li>
        </ul>
      </Card>
    </>
  )
}

export default Lesson2Props
