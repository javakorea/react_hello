# React 학습 노트

## 진행 상황

| 날짜 | 한 것 |
|---|---|
| 2026-10-26 | Vite React 템플릿으로 프로젝트 생성 (React 19 · Vite 8) · Vite 의 역할 이해 |
| 2026-10-26 | 1단계 JSX 끝 · 2단계 컴포넌트·props 설명 들음 · `&&`·`\|\|`·`??` 가 값을 돌려주는 방식 |
| 2026-10-27 | 2단계 끝(숙제 `Badge.jsx` 는 원격이라 정답 예시로 대신) · 3단계 `useState` 끝 · 4단계 이벤트 시작 |
| 2026-10-28 | 4단계 끝 · 5단계 조건부·목록 렌더링 시작 |
| 2026-10-29 | 5단계 끝 — key 실험(id vs 인덱스) · key = 정체를 맞추는 이름표라는 것 정리 |
| 2026-10-30 | 6단계 폼 끝 — 구조 분해 할당 · 제어 컴포넌트의 흐름(입력→state→value) 이해 · 7단계 state 끌어올리기 끝(컴포넌트 props 의 `onChange` 는 내가 지은 이름 · 형제는 못 찾는다) |
| 2026-10-31 | 8단계 `useEffect` 시작 — 예제 만들고 실제 콘솔 출력(처음 열기·a·b·시계 숨김/보임·입력)으로 설명 들음 |
| 2026-11-02 | 8단계 끝 — 연습 3문제(정리 함수 빼기 · `[a, b]` · 운영 빌드에선 몇 번) · StrictMode 가 두 번 도는 까닭 · 배열 빠뜨리면 낡은 값 · useEffect 가 필요 없는 경우 |
| 2026-11-04 | 9단계 서버 호출 시작 — `fetch` 예제(목록 세 state · 틀린 주소 · 늦게 온 응답 버리기) |
| 2026-11-09 | 9단계 설명 들음(한 파일에 컴포넌트 여럿 · 늦게 온 응답 버리기 · 공통 fetch 함수·훅 · 로딩·오류 공통화) · 10단계는 미루고 11단계 Context 시작 — 예제 만듦 |
| 2026-11-11 | 11단계 끝 — 연습 4문제 전부 정답(바깥 Provider 를 지우면 · 누가 리렌더링되나 · Provider 없이 읽으면 + null 이면 throw · UserProvider 빈칸) |
| 2026-11-11 | 10단계 `useRef` 시작 — 예제 만듦(DOM 포커스 · let/state/ref 비교 · 타이머 ID · React 19 의 ref props) · 설명 들음(ref 는 찾기가 아니라 React 가 만들며 넣기 · 값은 fiber 에 저장 · 인스턴스마다 따로 · key 로 초기화) · 용어를 React 업계 말로 통일 |

**지금 위치: 10단계 `useRef` 하는 중(2026-11-11) — 예제·설명 끝, 다음은 연습. 그 뒤 12단계 커스텀 훅. 9단계 연습·8080 API 불러 보기도 남아 있음.**

- 화면 전환: `src/main.jsx` 의 `import App from ...` 한 줄만 바꾼다. 지금은 `./lesson10/Lesson10Ref.jsx` (원래 `./App.jsx`)
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
| 3 | ☑ | state — `useState` | 값이 바뀌면 리렌더링 · 불변성(배열·객체는 새로 만들기) | MOCA `setValue` → 화면 갱신 |
| 4 | ☑ | 이벤트 | `onClick`·`onChange` · 이벤트 객체 · 함수 넘기기 vs 부르기 | MOCA `data-m-onclick` |
| 5 | ☑ | 조건부·목록 렌더링 | `&&`·삼항 · `map()` · `key` 가 필요한 까닭 | 그리드 행 렌더링 |
| 6 | ☑ | 폼 | 제어 컴포넌트(input 값 = state) · 여러 칸 한 객체로 · 검증 | MOCA form 컴포넌트 |

### 중급 — 화면을 나누고 데이터를 다루기

| # | 상태 | 주제 | 배울 것 | 견줄 것 |
|---|---|---|---|---|
| 7 | ☑ | state 끌어올리기 | 형제 컴포넌트가 값 나누기 · 부모가 state, 자식은 props+콜백 | 그리드 선택 → 상세 폼 |
| 8 | ☑ | `useEffect` | 그린 뒤 할 일 · 의존성 배열 · 정리 함수 · 두 번 도는 까닭(StrictMode) | `$p.onpageload` |
| 9 | ◐ | 서버 호출 | `fetch` · 로딩·오류 상태 · moca2026ai 8080 API 불러 보기 | MOCA `tran` / `select.do` |
| 10 | ◐ | `useRef` | DOM 직접 잡기(포커스) · 다시 그리지 않는 값 보관 | `$p.get('id')` |
| 11 | ☑ | Context | props 를 여러 층 건너 넘기지 않기 · 로그인 사용자·테마 | `moca.$g` 전역 |
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
| `A && B` | B | A | `{isVip && '⭐'}` — 참일 때만 렌더링 |
| `A \|\| B` | A | B | `{name \|\| '손님'}` — 기본값 |
| `A ?? B` | A | A 가 `null`·`undefined` 일 때만 B | 0·`''` 이 정상값일 때 |

- 거짓 같은 값: `false` `0` `''` `null` `undefined` `NaN`.
- `if (a && b)` 가 불린처럼 보이는 건 **`if` 가 참/거짓으로 바꿔서**다. JSX 의 `{}` 는 안 바꾸고 그 값을 렌더링한다.
- React 는 `false`·`null`·`undefined`·`true` 는 렌더링하지 않지만 **숫자 `0` 은 렌더링한다** → `{count && ...}` 대신 `{count > 0 && ...}`.

## 5. state (3단계) — `src/lesson3/Lesson3State.jsx`

- `const [count, setCount] = useState(0)` — 값과 바꾸는 함수 한 쌍. **바꾸는 함수를 불러야 리렌더링된다.**
- 일반 변수(`let`)는 바뀌어도 화면이 안 바뀌고, 리렌더링할 때마다 처음 값으로 돌아간다(함수를 새로 부르니까).
- 리렌더링 = 컴포넌트 함수를 **처음부터 다시 부르는 것**. `useState` 만 이전 값을 기억해 돌려준다.
- **불변성**: 배열·객체는 고치지 말고 새로 만든다 — `[...items, '귤']`, `{ ...user, age: 31 }`.
  `push` 후 같은 배열을 넘기면 React 가 「주소가 같다 = 안 바뀌었다」고 보고 리렌더링하지 않는다(Java 의 `==` 비교).
- 지우기는 `filter`, 고치기는 `map` 으로 새 배열을 만든다.
- MOCA 에 견주면: `setValue` 를 부르면 화면이 바뀌는 것과 같지만, React 는 **화면 전체를 함수로 다시 계산**하고 바뀐 곳만 DOM 에 반영한다.

## 6. 이벤트 (4단계) — `src/lesson4/Lesson4Event.jsx`

- `on` + 카멜 표기(`onClick`·`onChange`·`onSubmit`·`onKeyDown`)에 **함수를 넘긴다**.
- **넘기기 vs 부르기**: `onClick={handle}` ✅ / `onClick={handle()}` ❌ — 렌더링할 때 바로 실행된다. 안에서 setState 하면 무한 반복.
- 인자가 필요하면 화살표로 감싼다: `onClick={() => remove(id)}`.
- 이벤트 객체 `e`: `e.target.value`(입력값) · `e.preventDefault()`(폼 제출 시 새로고침 막기).
- 한 핸들러 안에서 `setCount(count + 1)` 을 세 번 해도 +1 — `count` 는 이번 렌더링 때의 값으로 고정돼 있다.
  이전 값 기준으로 쌓으려면 함수로 넘긴다: `setCount(c => c + 1)`.
- MOCA 에 견주면 `data-m-onclick="fn"` 과 같지만, 문자열이 아니라 **함수 자체**를 넘긴다(Java 의 람다·메서드 참조 `this::handle`).

## 7. 조건부·목록 렌더링 (5단계) — `src/lesson5/Lesson5List.jsx`

- JSX 의 `{}` 안에는 **식**만 → `if` 대신 삼항·`&&`, `for` 대신 `map()`. `if` 는 return 위(JSX 밖)에서 변수에 담아 쓰면 된다.
- `{조건 && <p>…</p>}` — 참일 때만. `{users.length && …}` 는 0명일 때 「0」이 찍히므로 `length > 0 &&`.
- 걸러진 목록(`shown`)은 state 가 아니라 **렌더링 때 계산하는 값** — state 는 원본 하나만 둔다.
- 삭제: `setUsers(users.filter(x => x.id !== u.id))` — `u` 는 `map` 이 행마다 따로 만든 화살표 함수가 기억하는 그 행의 사람(클로저). 원본은 안 건드리고 새 배열로 교체(불변성).

### key — 「바뀐 여부」가 아니라 **「누가 누구인가」** 를 맞추는 이름표 ★

리렌더링은 ① state 가 바뀌면 함수가 다시 돌아 **새 JSX 전체**가 만들어진다 → ② React 가 이전 JSX 와 비교하며 목록은 **같은 key 끼리 짝을 짓는다** → ③ 짝이 맞으면 DOM 재사용(달라진 글자·속성만 고침), 새 key 는 DOM 새로 만듦, 사라진 key 는 DOM 지움.

| key | React 가 하는 일 | 결과 |
|---|---|---|
| 이전에도 있던 key | 그 DOM 을 찾아 재사용, 달라진 부분만 고침 | 빠르고, **DOM 상태(입력값·포커스·스크롤) 유지** |
| 새 key | DOM 새로 만듦 | 빈 input |
| 사라진 key | DOM 지움 | 그 줄의 입력값도 사라짐 |

- 「안 바뀌면 리렌더링하지 않는다」는 key 의 일이 아니다 — 그건 3단계 「같은 배열 주소면 리렌더링 안 함」과 13단계 `memo` 이야기.
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

## 9. 폼 — 제어 컴포넌트 (6단계) — `src/lesson6/Lesson6Form.jsx`

- **제어 컴포넌트** = input 의 값을 DOM 이 아니라 **state 가 들고 있는 것.** `value={form.name}` + `onChange={handleChange}` 가 한 쌍.
- 흐름 한 바퀴: 글자 침 → 브라우저가 DOM 에 넣음 → `onChange` → `setForm` → 다시 그림 → `value` 가 DOM 을 덮어씀. 같은 값이라 티가 안 난다.
- `onChange` 를 빼면 글자가 안 쳐지는 것처럼 보인다 — **막는 게 아니라** 들어온 글자를 이벤트 직후 `value`(`''`)로 되돌리기 때문. React 가 「read-only field」 경고를 낸다.
  그래서 `onChange` 안에서 값을 손보면(숫자만 남기기 등) 저장 단계 하나로 입력 제한이 된다.
- React 는 **DOM 을 스캔하지 않는다.** state 가 바뀌면 함수를 다시 불러 새 JSX 를 만들고, **이전 JSX 와 새 JSX** 를 비교해 달라진 DOM 만 고친다. 키 하나마다 「계산은 전체, DOM 반영은 바뀐 곳만」.
- 리렌더링되는 범위는 **state 를 가진 컴포넌트와 그 아래**. 위(`main.jsx`)는 안 돈다.
- 칸 여러 개는 객체 하나 `form` 에 모으고, `<input name="email">` 의 `name` 을 열쇠로 `setForm({ ...form, [name]: value })`. **`name` 속성 = state 객체의 키**라는 약속. 체크박스는 `value` 대신 `checked`.
- 검증(`errors`)은 state 가 아니라 **렌더링 때 계산** — 5단계 `shown` 과 같은 원칙. `disabled={!isValid}` 로 버튼을 막는다.
- 제출은 `e.preventDefault()` 로 새로고침을 막고 **DOM 이 아니라 `form` state 를 쓴다.** `setForm(빈값)` 하면 모든 칸이 비워진다 — 진실은 state 에 있으니까.
- 견주기: MOCA 는 `data-m-id` 와 데이터 필드를 맞춰 엔진이 DOM 값을 읽어 오지만, React 는 DOM 을 읽지 않고 state 만 본다. input 은 state 를 **보여 주는 창**.

## 10. state 끌어올리기 (7단계) — `src/lesson7/Lesson7Lifting.jsx`

- **형제 컴포넌트는 서로를 모른다** — React 엔 MOCA 의 `$p.get('id')` 같은 「id 로 아무 컴포넌트나 찾는 목록」이 없다. 컴포넌트는 자기 props 만 받는 함수.
  DOM 을 `querySelector` 로 뒤져 형제 input 을 고칠 수는 있지만 state 가 안 바뀌니 다음 렌더링에 되돌려진다(6단계 원리).
- 그래서 둘이 같은 값을 쓰면 **가장 가까운 공통 부모로 올린다.** 부모가 state, 자식은 `value`(props) + `onChange`(콜백). 데이터는 아래로, 바꾸라는 요청은 위로 — 단방향 흐름.
- 이점: 값이 바뀌는 코드가 **state 를 가진 부모 한 곳**에만 있어 추적이 쉽다. MOCA 는 어디서든 `setValue` 할 수 있어 편하지만 큰 화면에선 누가 바꿨는지 찾기 어렵다.
- `selected = users.find(...)` 는 state 아님 — 렌더링 때 계산(5·6단계와 같은 원칙). 따로 state 로 두면 `users` 와 어긋난다.
- 부모가 바꿀 때는 `users.map(u => u.id === changed.id ? changed : u)` — 한 명만 교체한 새 배열(불변성).

### 컴포넌트에 쓴 `onChange`·`onSelect` 는 **내가 지은 props 이름** — HTML 이벤트가 아니다 ★

| 태그 | `onChange={f}` 의 뜻 |
|---|---|
| `<input onChange={f}>` (소문자, DOM) | React 가 실제 입력 이벤트에 `f` 연결 |
| `<CounterShared onChange={f}>` (대문자, 내 컴포넌트) | `props.onChange = f` 로 넘어갈 뿐. 안의 `<button onClick={() => onChange(value + 1)}>` 이 직접 부른다 |

- 구별법은 **태그 첫 글자** 하나. `onBump` 라고 지어도 똑같이 돈다. `on` + 동작 은 `<input>` 처럼 쓰이게 하려는 관례.
- `onChange={setShared}` — setter 도 「값 하나 받는 함수」라 그대로 넘긴다(`v => setShared(v)` 와 같음). 가공이 필요하면 `updateUser` 처럼 따로 만든다.

### 그 밖에 걸렸던 것

- `{' '}` = 공백 한 칸. JSX 는 태그 사이 **줄바꿈·들여쓰기 공백을 버리므로** 띄우려면 문자열로 명시. 같은 줄에 쓰면 필요 없음. 실무선 CSS `gap`.
- 컴포넌트 함수는 **밖**(안에 두면 부모가 렌더링될 때마다 새 컴포넌트로 보여 state·DOM 이 날아감), 핸들러는 **안**(지역 변수 `users`·`setUsers` 를 써야 하니까). Java 로 치면 별도 클래스 vs private 메서드.

## 11. useEffect (8단계) — `src/lesson8/Lesson8Effect.jsx`

- 컴포넌트 함수 본문은 **JSX 를 계산만** 한다(그리는 중엔 화면이 아직 없다). 타이머·서버 조회·`document.title` 처럼 **화면 밖**을 건드리는 일은 그린 뒤 `useEffect` 로.
- `useEffect(할 일, [지켜볼 값들])` — 두 번째 인자가 「언제 다시 할지」.

| 배열 | 언제 도나 | 견주기 |
|---|---|---|
| 없음 | 렌더링할 때마다 | — |
| `[]` | 처음 한 번 | `$p.onpageload` |
| `[a]` | 처음 + `a` 가 바뀔 때 | — |
| `[a, b]` | 처음 + 둘 중 하나라도 바뀔 때 | — |

- **할 일이 함수를 돌려주면 그것이 정리 함수.** React 가 들고 있다가 ① 같은 효과를 다시 하기 직전 ② 화면에서 사라질 때 부른다. `[]` 의 정리 함수 ≈ WebSquare `onpageunload`.
- 한 컴포넌트에 `useEffect` 를 여러 개 써도 된다 — 하는 일마다 하나씩 나누는 게 좋다.
- **정리 함수를 빼면**: 입력 멈추면 조회(debounce)가 칠 때마다 전부 조회된다(r → re → rea → reac → react 다섯 번). 타이머를 켜기만 하고 안 끈 것.
- **개발 모드에서 처음에 두 번 도는 까닭**: `<StrictMode>` 가 「마운트 → 언마운트 → 다시 마운트」를 한 번 해 봐서 **정리 함수가 제대로 정리하는지 확인**하려고. 정리 안 한 setInterval 은 개발에서 2→4→6 으로 두 배씩, 운영 빌드에선 1→2→3. 운영(`npm run build`)에서는 한 번만 돈다. (렌더링 자체도 두 번 — 함수가 순수한지 보려고)
- **배열을 빠뜨리면 낡은 값**: `[]` 로 둔 타이머 안의 `count` 는 영원히 처음 값 0. 효과 안에서 쓰는 state·props 는 전부 배열에 적는다(린트 `react-hooks/exhaustive-deps` 가 「missing dependency」로 알려 줌).
- **useEffect 가 필요 없는 경우**: 다른 state 에서 계산되는 값(성 + 이름 → 전체 이름)은 렌더링 때 계산한다. effect 로 맞추면 한 번 렌더링한 뒤 리렌더링해 **잠깐 어긋난 값(「김 / 홍길동」)이 보이고 렌더링도 두 번**이다.
- `useState(() => new Date())` — 함수로 넘기면 처음 한 번만 부른다(렌더링할 때마다 Date 를 만들지 않게. 린트 react(purity) 경고도 사라짐).

## 12. Context (11단계) — `src/lesson11/Lesson11Context.jsx`

- **풀려는 문제 = prop drilling**: 중간 컴포넌트가 쓰지도 않는 props 를 아래로 넘기려고 받아야 한다.
- 순서 세 줄: ① `createContext(기본값)` 로 Context 를 만든다 ② `<Context value={값}>`(Provider)로 감싼다 ③ 아래 어디서든 `useContext(Context)` 로 value 를 읽는다. 중간 컴포넌트는 props 가 없다.
- `createContext` 는 **컴포넌트 함수 밖**에서 한 번 — 안에 두면 렌더링마다 새 Context 가 생기고, 다른 컴포넌트에서는 보이지도 않는다(Java 의 `static final` 필드).
  여러 파일이 쓰면 그 Context 를 `export` 하고 쓰는 쪽에서 `import` 한다 — Provider 와 consumer 가 **같은 Context 객체**여야 한다.
- `createContext` 가 돌려주는 것은 함수가 아니라 **객체**다(`$$typeof`·`Provider`·`Consumer`). React 19 는 그 객체를 그대로 Provider 로 쓰게 해 준다 — `<Ctx value>` = 옛 표기 `<Ctx.Provider value>`. 이름이 대문자여야 JSX 태그로 쓸 수 있다.
- Provider 의 props 는 **`value` 하나**(+ 감싼 내용 `children`). `user={me}` 처럼 다른 이름을 쓰면 value 가 없는 것으로 보고 `undefined` 가 나온다.
- **가장 가까운 Provider 가 이긴다**: `useContext` 는 위로 올라가며 처음 만난 Provider 의 value 를 쓴다. 겹쳐 쓰면 화면 일부만 값을 바꿀 수 있다(어두운 앱 안의 밝은 인쇄 미리보기). 블록 안 변수 섀도잉 · CSS 변수의 가까운 조상 값과 같은 원리.
  Provider 가 하나도 없을 때만 `createContext(…)` 의 기본값이 나온다.
- 기준은 **코드를 쓴 자리도, DOM 도 아니고 컴포넌트 트리(JSX 에 놓은 자리)**. Provider 는 DOM 에 아무것도 남기지 않고, 포털로 DOM 을 `body` 밑에 옮겨도 Context 는 JSX 자리를 따라간다. MOCA 의 `$p` 스코프는 DOM(frame) 기준이라 다르다.
- **Context 는 화면 조각이 아니라 value 를 아래로 전달하는 통로**. 기억은 `useState`, 전달은 Context, 화면은 JSX — 세 역할이 따로다. 예제 ④ 의 로딩바 `<div>` 는 Context 가 아니라 `LoadingProvider` 컴포넌트가 렌더링한 보통 JSX 다.
- **실무 모양 = Provider 컴포넌트**: state + Context 를 한 컴포넌트에 묶고 `children` 을 감싼다(`ThemeProvider`·`UserProvider`). 이름의 Provider 는 관례일 뿐이다. value 에 값과 바꾸는 함수를 함께 싣는다(`{ theme, toggle }`).
- **리렌더링 범위(연습 2번 실측)**: 테마를 바꾸면 state 주인 `ThemeProvider` 와 그 Context 를 읽는 consumer(`ThemeBox`·`ThemeButton`)만 리렌더링된다. `NoTheme` 은 Provider 안에 있어도 Context 를 안 읽고, 부모가 만든 `children` 이라 리렌더링되지 않는다.
- **Provider 없이 읽으면(연습 3번 실측)**: 기본값 `null` 을 구조 분해하다 `TypeError` → React 는 root 화면 전체를 언마운트한다(멀쩡한 형제까지 빈 화면). 그래서 커스텀 훅은 `if (ctx === null) throw new Error('… Provider 안에서만 쓰세요')` 로 원인을 알려 주고, 기본값은 일부러 `null` 로 둔다.
- `useContext` 같은 hook 은 **컴포넌트나 `use…` 이름의 함수(커스텀 hook)의 맨 위 단계**에서만 부른다. 그래서 보통 함수 `api()` 대신 `useApi()` 가 Context 에서 `start`·`end` 를 읽고 `api` 함수를 돌려준다(12단계 미리보기). 조건·반복·이벤트 함수 안에서는 못 부른다 — React 가 hook 을 부른 순서로 구분하기 때문.
- `setTheme(t => …)` 의 `t` 는 React 가 넣어 준다 — 함수를 받는 쪽이 인자를 채워 부른다(`map` 과 같다, Java `AtomicReference.updateAndGet`).

### 곁가지로 나온 것

- **전역 변수**: Vite 는 모듈이라 `main.jsx` 의 `var a` 는 다른 파일에서 안 보인다. `window.a` 는 보이지만 바꿔도 리렌더링되지 않는다. 바뀌지 않는 값은 모듈 `export const`, 화면에 보이는 값은 state·Context.
- **import 는 파일마다** 해야 한다(Java 도 같다). 줄이는 법: 공통을 `index.js` 한 곳에서 다시 export(배럴) + `vite.config.js` 의 `@` 별칭 + 편집기 자동 import.
- **Zustand**(추스탄트 · 흔히 주스탄드): Provider 없이 쓰는 전역 state 라이브러리. 고른 값이 바뀐 컴포넌트만 리렌더링되고, `useStore.getState()` 로 보통 함수에서도 읽고 바꾼다 — 16단계.

## 13. useRef (10단계) — `src/lesson10/Lesson10Ref.jsx`

- **한 줄**: 리렌더링돼도 사라지지 않는 값 하나(`{ current }` 객체). 다만 `current` 를 바꿔도 리렌더링되지 않는다.

| | 바꾸면 리렌더링 | 리렌더링 뒤 값 | 쓰는 곳 |
|---|---|---|---|
| `let` | ✗ | 처음 값으로 돌아감 | 함수 안 잠깐 계산 |
| `useState` | ✓ | 남음 | 화면에 보이는 값 |
| `useRef` | ✗ | 남음 | 화면과 상관없는 값 · DOM |

- 실측(예제 ②): [let +1]·[ref +1] 을 눌러도 화면은 0. [리렌더링만] 을 누르자 ref 는 2 로 나타나고 let 은 0 으로 돌아갔다.
- **MOCA 대응표** — 이것만 알면 쓴다:

| 하는 일 | MOCA | React |
|---|---|---|
| 이름 정하기 | (id 로) | `const nameRef = useRef(null)` |
| 태그에 붙이기 | `id="name"` | `ref={nameRef}` |
| 쓰기 | `$p.get('name').focus()` | `nameRef.current.focus()` |
| 값 걸어 두기 | `$p.timer = setInterval(…)` | `timerRef.current = setInterval(…)` |

- `nameRef.current` 는 MOCA 컴포넌트가 아니라 **브라우저의 진짜 DOM 요소**(`HTMLInputElement` — `getElementById` 결과와 같은 객체). `setValue` 는 없다(실측: `setValue is not a function`). **값 넣기·읽기는 state, 포커스·스크롤·크기처럼 DOM 이 아니면 못 하는 일만 ref.** 제어 컴포넌트에 `current.value = …` 를 하면 다음 리렌더링에 state 값으로 덮인다.
- **DOM 은 찾는 것이 아니라 React 가 만들면서 넣어 준다**: JSX 는 객체 설계도이고 `ref` 는 그 객체의 props 에 붙어서 넘어간다(실측: `input` 객체 `props.ref === inputRef`). React 가 그 요소를 만들어 마운트한 뒤 `current` 에 넣고, 언마운트하면 `null` 로 돌린다. 그래서 id 가 필요 없고, 같은 컴포넌트를 두 번 써도 각자 자기 DOM 을 잡는다. `ref` 속성은 DOM 에 남지 않는다(`key` 와 같음).
- 마운트 뒤에 채워지므로 **렌더링 중(컴포넌트 본문·JSX)에는 `current` 를 읽거나 쓰지 않는다** — 이벤트 함수·`useEffect` 안에서만. MOCA 에서 `$p.get()` 을 `onpageload` 뒤에 쓰는 것과 같다.
- **리렌더링 ≠ DOM 다시 만들기**: 다시 계산하는 것은 JSX 이고 DOM 은 처음 마운트 때 만든 것을 그대로 쓴다. ref 도 계속 같은 DOM(실측: 리렌더링 2번 뒤 `===` true).
- **나중에 나타나는 요소**: `{show && <input ref={r} />}` 는 `null` → 보이면 DOM → 숨기면 `null`(실측). **개수가 바뀌는 목록**은 hook 을 반복문에서 못 부르므로 `ref` 에 함수(ref 콜백)를 주고 `Map` 에 id → DOM 을 넣고 뺀다(실측: [1,2] → [1,2,3] → [2,3]).
- **React 가 만들지 않은 DOM** 에는 `ref` 속성을 못 붙인다 — `useEffect` 에서 `getElementById` 로 찾아 ref 에 담는다(React 는 그 DOM 을 몰라 리렌더링 대상이 아니다). `createRoot(document.getElementById('root'))`·`createPortal` 은 이미 있는 DOM 안에 React 가 렌더링하는 것, 서버 HTML 을 이어받는 hydration 은 그 DOM 에 ref 가 연결되는 경우.
- **왜 0 으로 안 돌아가나**: `useRef(0)` 의 0 은 처음 마운트 때만 쓰인다. 값은 함수 밖, 컴포넌트마다 있는 **fiber** 에 hook 을 부른 순서대로 저장되고, 리렌더링 때는 지난번 객체를 돌려준다(Java `computeIfAbsent`). `useState` 도 같은 방식 — 그래서 hook 순서 규칙(조건·반복 안 금지)이 있다.
- **전역 변수가 아니다**: 컴포넌트를 쓸 때마다 따로 생기고 언마운트하면 사라진다(실측: A 2 · B 1, B 를 숨겼다 보이자 B 만 0). Java 의 `static` 이 아니라 인스턴스 필드, MOCA 의 `moca.$g` 가 아니라 화면마다 따로인 `$p`.
- **초기화**: ref 하나는 `ref.current = 0`, state 하나는 `setState(0)`, 컴포넌트 안 전부는 **부모에서 `key` 를 바꾼다** — 다른 컴포넌트로 보고 언마운트 → 마운트(실측: ref 5·state 3 → 0·0). 실무: `<UserForm key={selectedId} />` 로 사람을 바꿀 때마다 폼을 새로 시작.
- `current` 에는 무엇이든 담는다(숫자·문자열·배열·Map·DOM·타이머 ID). 내가 넣으면 내 값, 태그에 붙이면 React 가 DOM 을 넣는다 — **DOM 용 ref 와 값 보관용 ref 는 따로** 만든다(태그에 붙인 ref 는 React 가 덮어쓴다). DOM 용은 `useRef(null)` + 이름 끝 `Ref`.
- **타이머 ID 는 ref 에**(예제 ③ 실측): let 에 두면 50ms 마다 리렌더링될 때 `null` 로 돌아가 [멈춤] 이 `clearInterval(null)` 이 되어 안 멈췄다. ref 쪽은 멈췄다.
- **서버 목록을 ref 에 담으면** 도착해도 리렌더링되지 않아 화면이 빈 채로 남는다 → 화면에 보이는 데이터는 state. 다시 조회할지는 담는 곳이 아니라 `useEffect` 배열이 정한다(`[]` 면 다른 state 가 바뀌어도 다시 조회 안 함). 언마운트를 넘어 남기려면 끌어올리기·Context·TanStack Query(15단계).
- **실무에서 자주 쓰는 곳**: ① 저장 전 검사에 걸린 input 에 포커스 ② 채팅·로그 맨 아래로 `scrollIntoView` ③ ECharts 같은 외부 라이브러리에 DOM 넘기기(`echarts.init(ref.current)`) ④ 바깥을 누르면 드롭다운 닫기(`ref.current.contains(e.target)`) ⑤ 타이머 ID. DOM 잡기 쪽이 훨씬 많다.
- **React 19**: 자식 컴포넌트도 `ref` 를 보통 props 로 받는다(`function NameInput({ ref })`). 18 까지는 `forwardRef(…)` 로 감쌌다.
