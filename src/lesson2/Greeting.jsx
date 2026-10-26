// 컴포넌트 = 대문자로 시작하는 함수 하나. props(객체 하나)를 받아 JSX 를 돌려준다.
// props 를 { name, age } 로 바로 풀어 받는 것이 보통이다(구조 분해).
// age = 0 처럼 쓰면 안 넘겼을 때의 기본값.

function Greeting({ name, age = 0, isVip }) {
  return (
    <p>
      안녕하세요, {name} 님 ({age}세) {isVip && '⭐'}
    </p>
  )
}

export default Greeting
