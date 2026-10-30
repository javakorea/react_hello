# React 학습 노트

## 진행 상황

| 날짜 | 한 것 |
|---|---|
| 2026-10-26 | Vite React 템플릿으로 프로젝트 생성 (React 19 · Vite 8) · Vite 의 역할 이해 |
| 2026-10-26 | 1단계 JSX 끝 · 2단계 컴포넌트·props 설명 들음 · `&&`·`\|\|`·`??` 가 값을 돌려주는 방식 |
| 2026-10-27 | 2단계 끝(숙제 `Badge.jsx` 는 원격이라 정답 예시로 대신) · 3단계 `useState` 끝 · 4단계 이벤트 시작 |
| 2026-10-28 | 4단계 끝 · 5단계 조건부·목록 렌더링 시작 |
| 2026-10-29 | 5단계 끝 — key 실험(id vs 인덱스) · key = 정체를 맞추는 이름표라는 것 정리 |

**지금 위치: 5단계 끝(2026-10-29). 다음: 6단계(폼) — 제어 컴포넌트 예제 만들기.**

- 화면 전환: `src/main.jsx` 의 `import App from ...` 한 줄만 바꾼다. 지금은 `./lesson5/Lesson5List.jsx` (원래 `./App.jsx`)
- 남은 숙제(PC 에서): `src/lesson2/Badge.jsx` 정답 예시를 보고 `Lesson2Props.jsx` 에서 import 해 써 보기

---

## 커리큘럼

> 상태: ☑ 끝 · ◐ 하는 중 · ☐ 아직. 단계를 마치면 표시를 바꾸고 위 「진행 상황」에 한 줄 더한다.
> 각 단계는 `src/` 에서 직접 코드를 써 보며 하고, 배운 내용은 이 노트 아래에 절을 하나씩 더한다.

### 기초 — React 가 화면을 그리는 방식

| # | 상태 | 주제 | 배울 것 | 견줄 것 |
|---|---|---|---|---|
| 0 | ☑ | 환경 | Vite·npm·프로젝트 구조(`main.jsx` → `App.jsx`) | Maven·W-Pack (아래 1·2절) |
| 1 | ☑ | JSX | `{}` 안의 JS 식 · `className` · 태그 닫기 · `<>` 조각 · 주석 | MOCA HTML 화면 |
| 2 | ☑ | 컴포넌트와 props | 함수 하나 = 컴포넌트 · props 로 값 넘기기 · `children` · 파일 나누기 | MOCA 컴포넌트 `data-m-*` 속성 |
| 3 | ☑ | state — `useState` | 값이 바뀌면 다시 그리기 · 불변성(배열·객체는 새로 만들기) | MOCA `setValue` → 화면 갱신 |
| 4 | ☑ | 이벤트 | `onClick`·`onChange` · 이벤트 객체 · 함수 넘기기 vs 부르기 | MOCA `data-m-onclick` |
| 5 | ☑ | 조건부·목록 렌더링 | `&&`·삼항 · `map()` · `key` 가 필요한 까닭 | 그리드 행 그리기 |
| 6 | ☐ | 폼 | 제어 컴포넌트(input 값 = state) · 여러 칸 한 객체로 · 검증 | MOCA form 컴포넌트 |

### 중급 — 화면을 나누고 데이터를 다루기

| # | 상태 | 주제 | 배울 것 | 견줄 것 |
|---|---|---|---|---|
| 7 | ☐ | state 끌어올리기 | 형제 컴포넌트가 값 나누기 · 부모가 state, 자식은 props+콜백 | 그리드 선택 → 상세 폼 |
| 8 | ☐ | `useEffect` | 그린 뒤 할 일 · 의존성 배열 · 정리 함수 · 두 번 도는 까닭(StrictMode) | `$p.onpageload` |
| 9 | ☐ | 서버 호출 | `fetch` · 로딩·오류 상태 · moca2026ai 8080 API 불러 보기 | MOCA `tran` / `select.do` |
| 10 | ☐ | `useRef` | DOM 직접 잡기(포커스) · 다시 그리지 않는 값 보관 | `$p.get('id')` |
| 11 | ☐ | Context | props 를 여러 층 건너 넘기지 않기 · 로그인 사용자·테마 | `moca.$g` 전역 |
| 12 | ☐ | 커스텀 훅 | `useXxx` 로 로직 재사용 · 규칙(최상단에서만 부르기) | 공통 API 로 올리기 |
| 13 | ☐ | 성능 | `useMemo`·`useCallback`·`memo` · React Compiler 가 해 주는 것 | — |

### 실전 — 앱 하나를 만들 수 있게

| # | 상태 | 주제 | 배울 것 | 견줄 것 |
|---|---|---|---|---|
| 14 | ☐ | 라우팅 | React Router — 주소별 화면 · 주소 매개변수 · 화면 이동 | MOCA MDI·`openTab` |
| 15 | ☐ | 서버 상태 라이브러리 | TanStack Query — 캐시·다시 불러오기·저장 후 목록 갱신 | — |
| 16 | ☐ | 전역 상태 라이브러리 | Zustand (가벼움) — Redux 는 개념만 | — |
| 17 | ☐ | TypeScript | props·state 에 타입 · `.tsx` | Java 타입 |
| 18 | ☐ | 스타일링 | CSS Modules · Tailwind 맛보기 | MOCA 테마 CSS 변수 |
| 19 | ☐ | 테스트 | Vitest + Testing Library | JUnit |
| 20 | ☐ | 빌드·배포 | `npm run build` · `dist/` 를 서버에 올리기 · 환경변수(`import.meta.env`) | `/moca-ftp` |

### 마무리 과제

| # | 상태 | 과제 |
|---|---|---|
| 21 | ☐ | **MOCA 업무 화면 하나를 React 로 다시 만들기** — 검색 조건 + 그리드 + 상세 폼 + 저장(8080 API). 같은 작업 공간의 `moca_react` 와 견줘 본다 |

---

## 0. 환경 구성 준비물

**PC 에 직접 설치하는 것은 Node.js 하나뿐이다.** npm 은 Node.js 에 같이 들어 있고, Vite·React 는 프로젝트마다 npm 이 받는다.

| 준비물 | 설치 방법 | 이 PC 버전 (2026-10-26) | Java 쪽 짝 |
|---|---|---|---|
| **Node.js** | nodejs.org 에서 LTS 설치 — **이것만 직접 설치** | v24.11.1 | JDK |
| **npm** | Node.js 설치 때 함께 들어옴 | 11.6.2 | Maven |
| **Vite** | 설치 안 함 — `npm create vite` 가 프로젝트 `devDependencies` 에 넣는다 | 8.3.5 | 프로젝트 pom 의 플러그인 |
| **React** | 설치 안 함 — 같은 명령이 `dependencies` 에 넣는다 | 19.3.1 | 프로젝트 pom 의 라이브러리 |
| 편집기 | VS Code (이미 있음) | — | Eclipse |
| 브라우저 | Chrome (+ 확장 「React Developer Tools」 권장) | — | — |

### 새 프로젝트 만드는 순서

```bash
npm create vite@latest 프로젝트이름 -- --template react   # 뼈대 만들기
cd 프로젝트이름
npm install        # package.json 을 보고 node_modules 에 받기 (≈ mvn dependency:resolve)
npm run dev        # http://localhost:5173 에서 확인
```

- Vite 를 `npm install -g vite` 로 PC 전체에 깔지 않는다 — 프로젝트마다 버전이 다를 수 있어 프로젝트 안에 두는 것이 표준이다.
- 다른 PC 에서 이 프로젝트를 받으면 `node_modules/` 가 없으므로(git 밖) `npm install` 부터 한다.

### 폐쇄망

**`C:\Program Files\nodejs` + Path 등록 + `react_hello` 만 카피해 가면 설치 끝남.**

---

## 1. Vite 란

**한 줄 요약: Vite 는 JSX 를 브라우저가 실행하는 표준 JS(React 함수를 부르는 코드)로 변환해 준다.**
그 밖에 개발 서버와 배포용 빌드를 맡는다.

### 하는 일

| 역할 | 명령 | 설명 |
|---|---|---|
| 뼈대 만들기 | `npm create vite` | 실제로는 별도 도구 `create-vite` 가 한다. React 전용 아님(Vue·Svelte 등도) |
| 개발 서버 | `npm run dev` | 5173 포트. 저장하면 새로고침 없이 바로 반영(HMR). 요청한 파일만 그 자리에서 변환 |
| 빌드 | `npm run build` | 변환 + 묶기 + 압축 → `dist/`. 이 폴더만 아무 웹서버에 올리면 된다 |

### 변환 말고 같이 하는 일

- **import 풀기** — `from 'react'` 를 `node_modules/react` 에서 찾아 연결
- **묶기(번들)** — 파일 수십 개를 JS 몇 개로. React 엔진 자체도 함께 넣는다
- **CSS·이미지 import** — `import './App.css'`, `import img from './x.png'` (표준 JS 엔 없는 기능)
- **압축 + 파일명 해시** — `index-a1b2c3.js` — 내용이 바뀌면 이름이 바뀌어 캐시 문제를 막는다

### JSX 변환 예

```jsx
// 내가 쓴 것 (JSX)
<button className="counter" onClick={() => setCount(count + 1)}>
  Count is {count}
</button>
```

```js
// 변환된 것 (표준 JS) — 브라우저가 실제로 실행
jsx("button", {
  className: "counter",
  onClick: () => setCount(count + 1),
  children: ["Count is ", count]
})
```

- JSX 는 `jsx(...)` 함수 호출을 HTML 처럼 보이게 쓰는 문법일 뿐이다.
- `class` 대신 `className` — JS 에서 `class` 는 예약어라서.

---

## 2. 익숙한 것과 견주기

### Maven / Spring Boot

| Java 쪽 | 프론트엔드 쪽 |
|---|---|
| `pom.xml` | `package.json` |
| `~/.m2/repository` | `node_modules/` (프로젝트마다 따로) |
| (짝 없음) | `package-lock.json` — 버전 고정 |
| `mvn archetype:generate` | `npm create vite` |
| `mvn spring-boot:run` | `npm run dev` |
| `mvn package` → `target/` | `npm run build` → `dist/` |
| pom `<build><plugins>` | `vite.config.js` |

- Maven 한 개가 하는 일을 **npm(라이브러리) + Vite(빌드·실행)** 가 나눠 한다.
- **Vite ≠ Spring Boot.** Spring Boot 는 운영에서도 돌며 내 코드가 그 위에서 돈다. Vite 는 개발·빌드 때만 쓰고 운영엔 없다.
- 프레임워크 자리는 **React ≈ Spring** (내 코드가 그 규칙대로 짜인다).

### WebSquare W-Pack

| | W-Pack | Vite build |
|---|---|---|
| 원본 | `ui/<ID>.xml` | `src/App.jsx` |
| 결과 | `_wpack_/ui/<ID>.js` | `dist/assets/index-xxxx.js` |
| 결과를 git 에 | 안 넣음 | 안 넣음 (`.gitignore` 의 `dist`) |

다른 점:
1. W-Pack 결과엔 엔진이 없다(WebSquare 엔진이 따로 깔려 있어야). Vite 는 React 엔진까지 묶는다.
2. WRM 은 저장마다 W-Pack 을 돌려야 한다. Vite 개발 서버는 미리 컴파일하지 않는다.
3. W-Pack 은 컴파일러뿐(화면은 8081 이 낸다). Vite 는 컴파일러 + 개발 서버.

→ **Vite ≈ W-Pack + 개발용 서버**

### MOCA

- React ≈ `vendor/moca` 엔진
- Vite ≈ 개발할 때만 쓰는 서버 + 빌드 도구

---

## 3. JSX (1단계) — `src/Lesson1Jsx.jsx`

| # | 규칙 | HTML·MOCA | JSX |
|---|---|---|---|
| ① | `{}` 안에 JS **식** | 스크립트로 `setValue` | `<p>{price * qty}</p>` — `if`·`for` 문은 안 됨(삼항·`map`) |
| ② | 속성 이름 | `class` `for` `style="..."` | `className` `htmlFor` `style={{ color: 'red' }}`(객체) |
| ③ | 태그 닫기 | `<br>` 허용 | `<br />` 필수 |
| ④ | 주석 | `<!-- -->` | `{/* */}` |
| ⑤ | 최상위 하나 | 나열 가능 | 하나로 감싼다. 감쌀 게 없으면 `<> </>` |

- 이유는 모두 「JSX = `jsx(...)` 함수 호출」 — 예약어 피하기, return 은 값 하나.

## 4. 컴포넌트와 props (2단계) — `src/lesson2/`

- **함수 하나 = 컴포넌트.** 이름은 대문자로 시작(소문자면 HTML 태그로 여김).
- **props** = 속성들을 담은 객체 하나 → `function Greeting({ name, age = 0 })` 로 풀어 받음. 문자열은 `""`, 그 밖은 `{}`. 값 없이 `isVip` 만 쓰면 `true`.
- **`children`** = 여는·닫는 태그 사이 내용 (`Card.jsx`).
- **props 는 읽기 전용**(Java 의 `final` 매개변수). 바꿀 값은 state(3단계).
- 파일 나누기: `export default X` ↔ `import X from './X.jsx'`.
- `<Greeting name="홍" />` → `jsx(Greeting, { name: "홍" })` → 결국 `Greeting({ name: "홍" })` 함수 호출.

### `&&` · `||` · `??` — true/false 가 아니라 **피연산자 값 그대로** 돌려준다

| | A 가 참 같으면 | A 가 거짓 같으면 | 쓰는 곳 |
|---|---|---|---|
| `A && B` | B | A | `{isVip && '⭐'}` — 참일 때만 그리기 |
| `A \|\| B` | A | B | `{name \|\| '손님'}` — 기본값 |
| `A ?? B` | A | A 가 `null`·`undefined` 일 때만 B | 0·`''` 이 정상값일 때 |

- 거짓 같은 값: `false` `0` `''` `null` `undefined` `NaN`.
- `if (a && b)` 가 불린처럼 보이는 건 **`if` 가 참/거짓으로 바꿔서**다. JSX 의 `{}` 는 안 바꾸고 그 값을 그린다.
- React 는 `false`·`null`·`undefined`·`true` 는 안 그리지만 **숫자 `0` 은 그린다** → `{count && ...}` 대신 `{count > 0 && ...}`.

## 5. state (3단계) — `src/lesson3/Lesson3State.jsx`

- `const [count, setCount] = useState(0)` — 값과 바꾸는 함수 한 쌍. **바꾸는 함수를 불러야 다시 그린다.**
- 일반 변수(`let`)는 바뀌어도 화면이 안 바뀌고, 다시 그릴 때마다 처음 값으로 돌아간다(함수를 새로 부르니까).
- 다시 그리기 = 컴포넌트 함수를 **처음부터 다시 부르는 것**. `useState` 만 이전 값을 기억해 돌려준다.
- **불변성**: 배열·객체는 고치지 말고 새로 만든다 — `[...items, '귤']`, `{ ...user, age: 31 }`.
  `push` 후 같은 배열을 넘기면 React 가 「주소가 같다 = 안 바뀌었다」고 보고 안 그린다(Java 의 `==` 비교).
- 지우기는 `filter`, 고치기는 `map` 으로 새 배열을 만든다.
- MOCA 에 견주면: `setValue` 를 부르면 화면이 바뀌는 것과 같지만, React 는 **화면 전체를 함수로 다시 계산**하고 바뀐 곳만 DOM 에 반영한다.

## 6. 이벤트 (4단계) — `src/lesson4/Lesson4Event.jsx`

- `on` + 카멜 표기(`onClick`·`onChange`·`onSubmit`·`onKeyDown`)에 **함수를 넘긴다**.
- **넘기기 vs 부르기**: `onClick={handle}` ✅ / `onClick={handle()}` ❌ — 그릴 때 바로 실행된다. 안에서 setState 하면 무한 반복.
- 인자가 필요하면 화살표로 감싼다: `onClick={() => remove(id)}`.
- 이벤트 객체 `e`: `e.target.value`(입력값) · `e.preventDefault()`(폼 제출 시 새로고침 막기).
- 한 핸들러 안에서 `setCount(count + 1)` 을 세 번 해도 +1 — `count` 는 이번 그리기 때의 값으로 고정돼 있다.
  이전 값 기준으로 쌓으려면 함수로 넘긴다: `setCount(c => c + 1)`.
- MOCA 에 견주면 `data-m-onclick="fn"` 과 같지만, 문자열이 아니라 **함수 자체**를 넘긴다(Java 의 람다·메서드 참조 `this::handle`).

## 7. 조건부·목록 렌더링 (5단계) — `src/lesson5/Lesson5List.jsx`

- JSX 의 `{}` 안에는 **식**만 → `if` 대신 삼항·`&&`, `for` 대신 `map()`. `if` 는 return 위(JSX 밖)에서 변수에 담아 쓰면 된다.
- `{조건 && <p>…</p>}` — 참일 때만. `{users.length && …}` 는 0명일 때 「0」이 찍히므로 `length > 0 &&`.
- 걸러진 목록(`shown`)은 state 가 아니라 **그릴 때 계산하는 값** — state 는 원본 하나만 둔다.
- 삭제: `setUsers(users.filter(x => x.id !== u.id))` — `u` 는 `map` 이 행마다 따로 만든 화살표 함수가 기억하는 그 행의 사람(클로저). 원본은 안 건드리고 새 배열로 교체(불변성).

### key — 「바뀐 여부」가 아니라 **「누가 누구인가」** 를 맞추는 이름표 ★

다시 그리기는 ① state 가 바뀌면 함수가 다시 돌아 **새 JSX 전체**가 만들어진다 → ② React 가 이전 JSX 와 비교하며 목록은 **같은 key 끼리 짝을 짓는다** → ③ 짝이 맞으면 DOM 재사용(달라진 글자·속성만 고침), 새 key 는 DOM 새로 만듦, 사라진 key 는 DOM 지움.

| key | React 가 하는 일 | 결과 |
|---|---|---|
| 이전에도 있던 key | 그 DOM 을 찾아 재사용, 달라진 부분만 고침 | 빠르고, **DOM 상태(입력값·포커스·스크롤) 유지** |
| 새 key | DOM 새로 만듦 | 빈 input |
| 사라진 key | DOM 지움 | 그 줄의 입력값도 사라짐 |

- 「안 바뀌면 안 그린다」는 key 의 일이 아니다 — 그건 3단계 「같은 배열 주소면 다시 안 그림」과 13단계 `memo` 이야기.
- 재사용의 이점은 속도보다 **DOM 이 들고 있는 것(제어 안 된 input 값 등)이 보존되는 것** — 실제 버그는 여기서 난다.

**실험(④)**: 홍길동 메모 칸에 글 적고 「맨 앞에 추가」.
- `key={u.id}` → 메모가 홍길동 줄을 따라간다(홍길동은 밀려도 key 1 이라 자기 `<tr>` 을 가져간다).
- `key={i}`(인덱스) → 메모가 새사람 줄에 남는다. 0번 이름표를 단 `<tr>` 은 「아까 그 줄」이라 믿고 **모든 줄의 글자를 한 칸씩 바꿔 쓰고** DOM 상태는 제자리에 남기 때문. 가운데 줄 삭제 시 메모가 한 칸씩 밀리는 것도 같은 이유.
- 결론: key 는 **데이터의 고유 ID**. 인덱스는 순서가 절대 안 바뀌는 고정 목록에서만.
- 견주기: 그리드가 **행 번호**로 셀을 찾을 때 행을 끼워 넣으면 어긋나는 문제와 같다. Java 로 치면 `equals`·`hashCode` 의 ID 필드.

## 8. JS 문법 — 구조 분해 할당 (6단계 들어가며, 2026-10-30) ★ 어려웠던 것

`src/lesson6/Lesson6Form.jsx` 18줄 `const { name, value, type, checked } = e.target` 에서 나온 문법.
이름은 **구조 분해 할당**(destructuring assignment). ES2015 표준 JS 문법이고 React 전용이 아니다. Java 에는 없다.

```js
const { name, value, type, checked } = e.target
// 이 한 줄 = 변수 선언 네 개
const name    = e.target.name
const value   = e.target.value
const type    = e.target.type
const checked = e.target.checked
```

- `{ }` 안의 이름은 내가 짓는 게 아니라 **원본 객체에 실제로 있는 속성 이름**. 없는 이름은 `undefined`.
- 이 줄이 변수 `name` 을 만들기 때문에 19줄 `[name]: …` 을 쓸 수 있다. 이 줄을 지우면 `[e.target.name]` 으로 같이 바꿔야 한다.
- 다른 이름으로 받기: `const { name: fieldName } = e.target` → `fieldName = e.target.name`. 콜론 왼쪽 = 원본의 키, 오른쪽 = 내 변수.
- `= 원본` 은 `var`/`let`/`const` 가리지 않고 **필수**(Missing initializer 오류). 「어디서 꺼내라는 건지」가 없으니까.
- 같은 이름 재선언: `const`·`let` 은 오류, `var` 는 허용(옛 문법의 느슨함 — 그래서 `var` 는 안 쓴다).
- 배열 버전은 순서로 꺼낸다: `const [count, setCount] = useState(0)`. 매개변수 자리에도 쓴다: `function Greeting({ name, age = 0 })`.

### 객체 리터럴 vs 구조 분해 — 글자는 비슷한데 전혀 다른 문법 ★

갈리는 기준은 **`{ }` 가 `=` 의 어느 쪽에 있느냐**.

| | 코드 | `{ }` 위치 | 뜻 | 풀어 쓰면 |
|---|---|---|---|---|
| 객체 리터럴 | `var a = { name: fieldName }` | `=` 오른쪽 | 객체를 **만든다** | `a.name = fieldName` |
| 구조 분해 | `var { name: fieldName } = a` | `=` 왼쪽 | 객체에서 **꺼낸다** | `fieldName = a.name` |

- 콜론 방향도 반대: 리터럴은 「키 ← 값」, 구조 분해는 「키 → 변수」. 구조 분해는 리터럴을 거울처럼 뒤집은 모양.
- 키와 변수 이름이 같으면 양쪽 다 `{ name }` 으로 축약돼 더 비슷해 보인다.
- `Lesson6Form.jsx` 에선 18줄 `const { name, … } = e.target` 이 구조 분해, 19줄 `setForm({ ...form, [name]: … })` 의 `{ }` 는 값 자리라 객체 리터럴 — 한 함수 안에 둘이 나란히 있다.
