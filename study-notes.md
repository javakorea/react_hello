# React 학습 노트

## 진행 상황

| 날짜 | 한 것 |
|---|---|
| 2026-10-26 | Vite React 템플릿으로 프로젝트 생성 (React 19 · Vite 8) · Vite 의 역할 이해 |
| 2026-10-26 | 1단계 JSX 끝 · 2단계 컴포넌트·props 설명 들음 · `&&`·`\|\|`·`??` 가 값을 돌려주는 방식 |
| 2026-10-27 | 2단계 끝(숙제 `Badge.jsx` 는 원격이라 정답 예시로 대신) · 3단계 `useState` 시작 |

**지금 위치: 3단계(`useState`) 하는 중 — 예제 `src/lesson3/Lesson3State.jsx` 설명 들음. 다음은 4단계(이벤트).**

- 화면 전환: `src/main.jsx` 의 `import App from ...` 한 줄만 바꾼다. 지금은 `./lesson3/Lesson3State.jsx` (원래 `./App.jsx`)
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
| 3 | ◐ | state — `useState` | 값이 바뀌면 다시 그리기 · 불변성(배열·객체는 새로 만들기) | MOCA `setValue` → 화면 갱신 |
| 4 | ☐ | 이벤트 | `onClick`·`onChange` · 이벤트 객체 · 함수 넘기기 vs 부르기 | MOCA `data-m-onclick` |
| 5 | ☐ | 조건부·목록 렌더링 | `&&`·삼항 · `map()` · `key` 가 필요한 까닭 | 그리드 행 그리기 |
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
- MOCA 에 견주면: `setValue` 를 부르면 화면이 바뀌는 것과 같지만, React 는 **화면 전체를 함수로 다시 계산**하고 바뀐 곳만 DOM 에 반영한다.
