/*
 * 중간평가 문제 데이터
 * 새 주차를 추가할 때는 이 배열 맨 아래에 객체를 이어서 붙이면 된다. (index.html은 수정 불필요)
 *
 * { week: 1, type: "concept" | "short" | "choice", topic: "주제", question: "문제", code: "코드(선택)", options: ["보기1", ...](choice만), answer: "정답", explanation: "한 줄 해설" }
 *   - concept: 개념 맞추기 (짧은 설명 → 개념 이름)
 *   - short  : 단답형 (짧은 코드 결과 / 빈칸 하나)
 *   - choice : 객관식 (보기 4개, answer는 보기 중 하나와 똑같이)
 * hidden: true 를 붙이면 퀴즈 페이지·md에서 빠지지만 번호 자리는 그대로 차지한다. (문제를 빼고 싶을 때 삭제 대신 사용)
 * 문제 번호는 주차 안에서 위에서부터 자동으로 매겨진다.
 * 팀원들의 "모름" 표시가 번호 기준이므로 기존 문제의 순서를 바꾸거나 중간에 끼워 넣지 않는다.
 */
const QUESTIONS = [
  /* ===================== 1주차 ===================== */
  { week: 1, type: "concept", topic: "CSS(최소)", question: "요소의 내용과 테두리 사이의 안쪽 여백을 만드는 CSS 속성은?", answer: "padding", explanation: "padding은 안쪽 여백, margin은 바깥 여백이다.", hidden: true },
  { week: 1, type: "concept", topic: "CSS(최소)", question: "box-sizing에서 width 안에 padding과 border까지 포함하는 값은?", answer: "border-box", explanation: "border-box는 padding과 border를 width/height에 포함해 계산한다.", hidden: true },

  { week: 1, type: "concept", topic: "변수·스코프", question: "값을 다시 할당(재할당)할 수 없는 변수 선언 키워드는?", answer: "const", explanation: "const는 값을 다시 할당할 수 없다." },
  { week: 1, type: "concept", topic: "변수·스코프", question: "블록이 아니라 함수 단위 스코프를 가지는 변수 선언 키워드는?", answer: "var", explanation: "var는 블록을 벗어나도 쓸 수 있고 함수 밖으로만 못 나간다." },
  { week: 1, type: "concept", topic: "변수·스코프", question: "let/const 변수를 `{}` 블록 안에서만 쓸 수 있게 하는 스코프는?", answer: "블록 스코프", explanation: "let/const는 `{}` 기준으로 사용 범위가 정해진다." },
  { week: 1, type: "short", topic: "변수·스코프", question: "출력 결과는?", code: "console.log(status);\nvar status = '완료';", answer: "undefined", explanation: "var는 선언이 끌어올려져(호이스팅) 선언 전에 써도 undefined이다." },

  { week: 1, type: "short", topic: "타입·변환", question: "결과는?", code: "console.log('5' + 1);", answer: "'51'", explanation: "+ 연산자에 문자열이 포함되면 문자열 연결로 동작해 숫자 1이 문자열로 변환된다." },
  { week: 1, type: "concept", topic: "타입·변환", question: "조건문에서 false로 취급되는 값(0, '', null, undefined, NaN 등)을 부르는 말은?", answer: "Falsy", explanation: "그 외 대부분의 값은 Truthy이다." },

  { week: 1, type: "concept", topic: "연산자", question: "&&, ||에서 앞의 값만으로 결과가 정해지면 뒤를 확인하지 않는 동작은?", answer: "단축 평가", explanation: "&&, ||는 상황에 따라 실제 값을 반환한다." },
  { week: 1, type: "short", topic: "연산자", question: "결과는?", code: "console.log(0 || 10);", answer: "10", explanation: "||는 왼쪽이 falsy(0)이면 오른쪽 값을 쓴다." },
  { week: 1, type: "short", topic: "연산자", question: "결과는?", code: "console.log(0 ?? 10);", answer: "0", explanation: "??는 null/undefined일 때만 오른쪽을 쓰므로 0이 그대로 나온다." },
  { week: 1, type: "concept", topic: "연산자", question: "`user.address?.city`에서 `?.` 연산자의 이름은?", answer: "옵셔널 체이닝(?.)", explanation: "왼쪽이 null/undefined면 에러 없이 undefined를 반환한다." },
  { week: 1, type: "concept", topic: "연산자", question: "`조건 ? 값1 : 값2` 형태의 조건 연산자는?", answer: "삼항 연산자", explanation: "조건에 따라 두 값 중 하나를 선택한다." },

  { week: 1, type: "concept", topic: "조건·반복", question: "반복문에서 이번 반복만 건너뛰고 다음 반복으로 넘어가는 키워드는?", answer: "continue", explanation: "break는 반복문 전체를 종료한다." },
  { week: 1, type: "short", topic: "조건·반복", question: "출력되는 값은?", code: "for (let i = 1; i <= 5; i++) {\n    if (i === 3) break;\n    console.log(i); }", answer: "1, 2", explanation: "i가 3일 때 break로 반복문이 종료된다." },
  { week: 1, type: "choice", topic: "조건·반복", question: "조건과 상관없이 최소 한 번은 실행되는 반복문은?", options: ["for", "while", "do...while", "for...in"], answer: "do...while", explanation: "while은 조건을 먼저 확인한다." },
  { week: 1, type: "concept", topic: "조건·반복", question: "객체의 키(key)를 하나씩 꺼내는 반복문은?", answer: "for...in", explanation: "`객체[key]`로 값에 접근할 수 있다." },

  { week: 1, type: "concept", topic: "객체·prototype", question: "생성자 함수 안에서 새로 만들어지는 객체를 가리키는 키워드는?", answer: "this", explanation: "`this.이름 = 이름`은 새 객체에 속성을 만든다." },
  { week: 1, type: "concept", topic: "객체·prototype", question: "생성자 함수로 새 객체를 만들 때 앞에 붙이는 키워드는?", answer: "new", explanation: "`new 학생('영동', 30)`처럼 객체를 생성한다." },
  { week: 1, type: "concept", topic: "객체·prototype", question: "객체에 없는 속성·메서드를 연결된 부모 쪽에서 찾게 해주는 구조는?", answer: "프로토타입(prototype)", explanation: "prototype에 둔 메서드는 여러 객체가 공유한다." },

  { week: 1, type: "concept", topic: "함수·콜백", question: "함수가 '정의된 위치'를 기준으로 변수를 찾는 규칙은?", answer: "렉시컬 스코프", explanation: "함수는 자신이 선언된 위치의 바깥 스코프에서 변수를 찾는다." },
  { week: 1, type: "concept", topic: "함수·콜백", question: "다른 함수에 인자로 전달되어 나중에 실행되는 함수는?", answer: "콜백 함수", explanation: "`manager(sayHello, 3)`에서 sayHello가 콜백이다." },
  { week: 1, type: "concept", topic: "함수·콜백", question: "함수를 인자로 받거나 함수를 반환하는 함수는?", answer: "고차 함수", explanation: "고차 함수에 전달되는 함수가 콜백 함수이다." },

  { week: 1, type: "short", topic: "배열·문자열", question: "결과는?", code: "console.log([1, 2, 3].map(x => x * 2));", answer: "[2, 4, 6]", explanation: "map은 각 요소를 가공해 새 배열을 반환한다." },
  { week: 1, type: "short", topic: "배열·문자열", question: "출력 결과는? (forEach의 반환값)", code: "const r = [1, 2, 3].forEach(x => x * 2);\nconsole.log(r);", answer: "undefined", explanation: "forEach의 반환값은 항상 undefined이다." },
  { week: 1, type: "short", topic: "배열·문자열", question: "결과는?", code: "console.log([5, 10, 15].filter(x => x > 7));", answer: "[10, 15]", explanation: "filter는 조건이 true인 요소만 새 배열로 반환한다." },
  { week: 1, type: "choice", topic: "배열·문자열", question: "조건에 맞는 첫 번째 요소 하나만 반환하는 배열 메서드는?", options: ["find", "filter", "some", "every"], answer: "find", explanation: "못 찾으면 undefined를 반환한다." },
  { week: 1, type: "concept", topic: "배열·문자열", question: "배열 요소 중 하나라도 조건에 맞으면 true를 반환하는 메서드는?", answer: "some", explanation: "모든 요소가 맞아야 true인 것은 every이다." },
  { week: 1, type: "concept", topic: "배열·문자열", question: "배열의 모든 요소가 조건에 맞아야 true를 반환하는 메서드는?", answer: "every", explanation: "하나라도 맞으면 true인 것은 some이다." },
  { week: 1, type: "short", topic: "배열·문자열", question: "내림차순 정렬이 되도록 빈칸을 채우시오.", code: "[30, 10, 20].sort((a, b) => ______);", answer: "b - a", explanation: "오름차순은 a - b, 내림차순은 b - a이다." },
  { week: 1, type: "short", topic: "배열·문자열", question: "결과는?", code: "console.log([10, 20, 30, 40, 50].slice(1, 4));", answer: "[20, 30, 40]", explanation: "인덱스는 0부터 시작하고, slice의 끝 번호(4)는 포함하지 않는다." },
  { week: 1, type: "short", topic: "배열·문자열", question: "결과는?", code: "console.log([10, 20, 30].reduce((sum, cur) => sum + cur, 0));", answer: "60", explanation: "0부터 시작해 10, 30, 60으로 누적된다." },
  { week: 1, type: "concept", topic: "배열·문자열", question: "`.filter().map()`처럼 메서드를 이어 붙여 쓰는 방식은?", answer: "메서드 체이닝", explanation: "앞 메서드가 반환한 값을 뒤 메서드가 사용할 수 있어야 한다." },

  { week: 1, type: "short", topic: "화살표 함수", question: "출력 결과는?", code: "const f = x => { x * 2 };\nconsole.log(f(3));", answer: "undefined", explanation: "중괄호를 쓰면 return을 직접 써야 한다." },
  { week: 1, type: "concept", topic: "화살표 함수", question: "화살표 함수에서 객체를 바로 반환할 때 `{ }`를 감싸는 기호는?", answer: "소괄호 ( )", explanation: "중괄호가 함수 코드 블록으로 해석되는 것을 막는다." },

  { week: 1, type: "concept", topic: "클래스", question: "constructor와 메서드를 가지는, 객체를 만드는 설계도 문법은?", answer: "클래스(class)", explanation: "생성자 함수와 비슷한 역할이며 `new`로 객체를 만든다." },
  { week: 1, type: "short", topic: "클래스", question: "빈칸에 들어갈 키워드는?", code: "class Person {\n    ______(name) { this.name = name; }\n}", answer: "constructor", explanation: "constructor는 `new`로 객체를 만들 때 실행되는 초기화 메서드이다." },

  { week: 1, type: "concept", topic: "Spread/Rest", question: "`...`로 배열을 하나씩 펼치는 문법은?", answer: "Spread", explanation: "Rest는 반대로 여러 값을 배열로 모은다." },
  { week: 1, type: "concept", topic: "Spread/Rest", question: "함수 매개변수 `...args`처럼 여러 값을 배열로 모으는 문법은?", answer: "Rest", explanation: "Spread는 펼치기, Rest는 모으기이다." },
  { week: 1, type: "short", topic: "Spread/Rest", question: "결과는?", code: "console.log([...[1, 2], ...[3, 4]]);", answer: "[1, 2, 3, 4]", explanation: "두 배열을 펼쳐서 새 배열로 합친다." },

  /* ===================== 2주차 ===================== */
  { week: 2, type: "choice", topic: "DOM", question: "대입한 문자열을 HTML이 아닌 일반 텍스트로 넣는 프로퍼티는?", options: ["textContent", "innerHTML", "value", "className"], answer: "textContent", explanation: "HTML 태그도 문자 그대로 표시된다." },
  { week: 2, type: "concept", topic: "DOM", question: "대입한 문자열을 HTML로 해석해서 넣는 프로퍼티는?", answer: "innerHTML", explanation: "`<p>`처럼 태그가 실제 요소로 만들어진다." },
  { week: 2, type: "short", topic: "DOM", question: "`$li`를 `$list`의 마지막 자식으로 추가하는 메서드는?", code: "$list.______($li);", answer: "appendChild", explanation: "appendChild는 노드를 부모의 마지막 자식으로 추가한다." },
  { week: 2, type: "short", topic: "DOM", question: "이미 화면에 있는 노드를 다른 부모에 appendChild하면? (복사 / 이동)", answer: "이동", explanation: "복사되지 않고 위치가 옮겨진다." },

  { week: 2, type: "short", topic: "Attribute·class", question: "`<input value=\"홍길동\">`에 사용자가 `김철수`를 입력했다. `$input.value`는?", answer: "'김철수'", explanation: ".value는 현재 입력값을 반환한다." },
  { week: 2, type: "short", topic: "Attribute·class", question: "같은 상황에서 `$input.getAttribute('value')`는?", answer: "'홍길동'", explanation: "getAttribute는 HTML에 작성된 초기값을 반환한다." },
  { week: 2, type: "short", topic: "Attribute·class", question: "`<div class=\"box active\">`에서 `$box.className = 'circle'` 실행 후 class 값은?", answer: "circle", explanation: "className은 class 전체를 교체한다." },

  { week: 2, type: "short", topic: "이벤트", question: "버튼을 클릭했을 때 출력되는 값은?", code: "$btn.onclick = function() { console.log('A'); };\n$btn.onclick = function() { console.log('B'); };", answer: "B", explanation: "onclick은 함수 하나만 저장하므로 나중 함수가 덮어쓴다." },
  { week: 2, type: "concept", topic: "이벤트", question: "같은 이벤트에 함수를 여러 개 등록할 수 있는 메서드는?", answer: "addEventListener", explanation: "onclick은 함수 1개만 저장된다." },
  { week: 2, type: "concept", topic: "이벤트", question: "이벤트가 실제로 발생한 요소를 가리키는 프로퍼티는?", answer: "e.target", explanation: "자식을 클릭하면 자식 요소가 target이 될 수 있다." },
  { week: 2, type: "choice", topic: "이벤트", question: "이벤트 리스너를 등록한 요소를 가리키는 프로퍼티는?", options: ["e.target", "e.currentTarget", "e.key", "e.code"], answer: "e.currentTarget", explanation: "target과 다를 수 있다." },
  { week: 2, type: "concept", topic: "이벤트", question: "자식에서 발생한 이벤트가 부모 쪽으로 올라가며 전달되는 현상은?", answer: "이벤트 버블링", explanation: "이벤트는 기본적으로 버블링된다." },
  { week: 2, type: "concept", topic: "이벤트", question: "부모에 이벤트를 한 번 등록해 자식들의 이벤트를 처리하는 방법은?", answer: "이벤트 위임", explanation: "버블링을 이용해 자식마다 이벤트를 등록하지 않아도 된다." },
  { week: 2, type: "concept", topic: "이벤트", question: "조건에 맞는 가장 가까운 조상 요소를 찾는 메서드는?", answer: "closest()", explanation: "못 찾으면 null을 반환한다." },
  { week: 2, type: "choice", topic: "이벤트", question: "폼 제출, 링크 이동 같은 브라우저 기본 동작을 막는 메서드는?", options: ["preventDefault()", "stopPropagation()", "closest()", "addEventListener()"], answer: "preventDefault()", explanation: "stopPropagation은 전파를 막는다." },
  { week: 2, type: "concept", topic: "이벤트", question: "이벤트가 부모로 전파(버블링)되는 것을 막는 메서드는?", answer: "stopPropagation()", explanation: "버블링을 차단한다." },
  { week: 2, type: "concept", topic: "이벤트", question: "키보드 이벤트에서 키의 물리적 위치(예: 'KeyA')를 알려주는 프로퍼티는?", answer: "e.code", explanation: "실제 입력된 키('a', 'A')는 e.key이다." },

  { week: 2, type: "concept", topic: "비동기·BOM", question: "정해진 시간 뒤에 콜백을 딱 한 번 실행하는 함수는?", answer: "setTimeout", explanation: "반복 실행은 setInterval이다." },
  { week: 2, type: "concept", topic: "비동기·BOM", question: "정해진 시간마다 콜백을 반복 실행하는 함수는?", answer: "setInterval", explanation: "멈추려면 clearInterval을 쓴다." },
  { week: 2, type: "short", topic: "비동기·BOM", question: "출력 순서는?", code: "console.log('1');\nsetTimeout(() => console.log('2'), 0);\nconsole.log('3');", answer: "1, 3, 2", explanation: "setTimeout 콜백은 Task Queue에서 대기하다 Call Stack이 비면 실행된다." },
  { week: 2, type: "concept", topic: "비동기·BOM", question: "Call Stack이 비면 Task Queue의 콜백을 Call Stack으로 옮기는 것은?", answer: "이벤트 루프(Event Loop)", explanation: "그래서 비동기 콜백은 나중에 실행된다." },

  { week: 2, type: "concept", topic: "React 기초", question: "React에서 화면을 이루는 독립적인 UI 단위는?", answer: "컴포넌트", explanation: "컴포넌트를 나누면 재사용과 관리가 쉽다." },
  { week: 2, type: "concept", topic: "React 기초", question: "JavaScript 안에서 HTML처럼 UI를 작성하는 문법은?", answer: "JSX", explanation: "`{}` 안에서 JavaScript 표현식을 쓸 수 있다." },
  { week: 2, type: "short", topic: "React 기초", question: "index.html에는 `<div id=\"root\"></div>` 하나만 있다. React가 이 영역을 관리하도록 지정하는 함수는?", code: "const root = ReactDOM.( ? )(document.getElementById('root'));\nroot.render(<App />);", answer: "createRoot", explanation: "createRoot로 React가 관리할 영역(#root)을 잡고, render로 그 안에 컴포넌트를 그린다." },

  { week: 2, type: "concept", topic: "Props·State", question: "부모 컴포넌트가 자식 컴포넌트에게 전달하는 데이터는?", answer: "Props", explanation: "자식은 읽기만 하고 직접 변경하지 않는다." },
  { week: 2, type: "concept", topic: "Props·State", question: "컴포넌트 안에서 관리하며, 바뀌면 화면이 다시 그려지는 데이터는?", answer: "State", explanation: "State는 내가 관리하는 값, Props는 외부에서 전달받는 값이다." },
  { week: 2, type: "concept", topic: "Props·State", question: "State가 바뀌어 컴포넌트가 다시 실행되고 화면이 업데이트되는 것은?", answer: "리렌더링(Rerender)", explanation: "변경된 State로 JSX가 다시 계산된다." },
  { week: 2, type: "short", topic: "Props·State", question: "`onClick={handleEnter()}`처럼 쓰면 함수는 언제 실행되는가?", answer: "렌더링할 때 바로", explanation: "클릭 시 실행하려면 `onClick={handleEnter}`처럼 함수 자체를 전달한다." },

  { week: 2, type: "concept", topic: "Input·객체 State", question: "input의 value를 State와 연결하고 onChange로 State를 바꾸는 방식은?", answer: "Controlled Input", explanation: "State가 Input의 값을 관리한다." },
  { week: 2, type: "short", topic: "Input·객체 State", question: "onChange에서 현재 입력값을 가져오도록 빈칸을 채우시오.", code: "onChange={e => setUsername(e.target.______)}", answer: "value", explanation: "e.target은 input 요소, e.target.value는 현재 입력값이다." },
  { week: 2, type: "short", topic: "Input·객체 State", question: "결과 객체는?", code: "const form = { username: '영동', email: 'a@a.com' };\nconst next = { ...form, email: 'b@b.com' };", answer: "{ username: '영동', email: 'b@b.com' }", explanation: "...form은 기존 값을 복사하고 email만 덮어쓴다." },
  { week: 2, type: "concept", topic: "Input·객체 State", question: "`{ [name]: value }`처럼 변수 값을 속성 이름으로 쓰는 문법은?", answer: "계산된 속성명", explanation: "name이 'email'이면 `email: value`가 된다." },

  { week: 2, type: "short", topic: "Todo·useEffect", question: "결과는?", code: "console.log([1, 2, 3].filter(x => x !== 2));", answer: "[1, 3]", explanation: "삭제할 항목을 제외한 새 배열을 만드는 방식이다." },
  { week: 2, type: "concept", topic: "Todo·useEffect", question: "`todos.map(todo => <li ____={todo.id}>...</li>)`에서 각 항목을 구분하는 속성은?", answer: "key", explanation: "보통 객체의 고유한 id를 쓰며 화면에는 표시되지 않는다." },
  { week: 2, type: "concept", topic: "Todo·useEffect", question: "렌더링 후에 실행할 작업(타이머, API 요청 등)을 작성하는 Hook은?", answer: "useEffect", explanation: "화면을 그리는 코드가 아니라 화면이 그려진 뒤 실행할 작업이다." },
  { week: 2, type: "short", topic: "Todo·useEffect", question: "이 Effect는 언제 실행되는가?", code: "useEffect(() => { console.log('실행'); }, []);", answer: "처음 화면에 나타날 때 한 번", explanation: "빈 의존성 배열은 의존하는 값이 없어 Mount 때만 실행된다." },
  { week: 2, type: "short", topic: "Todo·useEffect", question: "이 Effect는 언제 실행되는가?", code: "useEffect(() => { console.log('실행'); }, [count]);", answer: "처음 실행 + count가 변경될 때", explanation: "의존성 배열의 값이 바뀔 때 다시 실행된다." },
  { week: 2, type: "concept", topic: "Todo·useEffect", question: "useEffect에서 `return () => {}`로 반환하는 정리용 함수는?", answer: "Cleanup 함수", explanation: "타이머 등을 정리할 때 사용한다." },
  { week: 2, type: "concept", topic: "Todo·useEffect", question: "`{showTimer && <Timer />}`처럼 조건에 따라 보여주거나 숨기는 방식은?", answer: "조건부 렌더링", explanation: "showTimer가 true일 때만 Timer가 표시된다." },

  /* ===================== 3주차 ===================== */
  { week: 3, type: "concept", topic: "Hooks", question: "계산 결과값을 기억해서 의존성이 바뀔 때만 다시 계산하는 Hook은?", answer: "useMemo", explanation: "useMemo는 함수가 아니라 계산된 값을 기억한다." },
  { week: 3, type: "choice", topic: "Hooks", question: "함수를 기억해서 의존성이 바뀌지 않으면 같은 함수를 재사용하게 하는 Hook은?", options: ["useMemo", "useCallback", "useRef", "useEffect"], answer: "useCallback", explanation: "useCallback은 함수 참조, useMemo는 계산 결과값을 기억한다." },
  { week: 3, type: "concept", topic: "Hooks", question: "값이 바뀌어도 리렌더링되지 않고, DOM 요소 접근에도 쓰는 Hook은?", answer: "useRef", explanation: "ref.current를 바꿔도 그 자체로 리렌더링이 발생하지 않는다." },
  { week: 3, type: "concept", topic: "Hooks", question: "Hook 로직을 함수로 분리해 여러 컴포넌트에서 재사용하는 것은?", answer: "Custom Hook", explanation: "예: useDelayReady(delay)처럼 Hook 로직을 함수로 분리해 여러 컴포넌트에서 재사용한다." },

  { week: 3, type: "concept", topic: "Promise·async/await", question: "콜백 안에 콜백이 계속 중첩되어 코드가 깊어지는 현상은?", answer: "콜백 지옥(Callback Hell)", explanation: "가독성과 유지보수성이 떨어져 Promise나 async/await를 쓴다." },
  { week: 3, type: "concept", topic: "Promise·async/await", question: "비동기 작업의 미래 결과(성공/실패)를 나타내는 객체는?", answer: "Promise", explanation: "pending, fulfilled, rejected 세 가지 상태를 가진다." },
  { week: 3, type: "concept", topic: "Promise·async/await", question: "Promise에서 실패(오류)를 처리하는 메서드는?", answer: ".catch()", explanation: ".then()은 성공 결과를 처리한다." },
  { week: 3, type: "choice", topic: "Promise·async/await", question: "성공·실패와 관계없이 마지막에 항상 실행되는 Promise 메서드는?", options: [".then()", ".catch()", ".finally()", "await"], answer: ".finally()", explanation: "try/catch/finally의 finally와 같은 역할이다." },
  { week: 3, type: "short", topic: "Promise·async/await", question: "`callAPI()`가 반환하는 것은? (문자열 / Promise)", code: "async function callAPI() {\n    return '완료';\n}", answer: "Promise", explanation: "async 함수는 문자열을 반환해도 항상 Promise를 반환한다." },
  { week: 3, type: "concept", topic: "Promise·async/await", question: "async 함수 안에서 Promise 결과가 나올 때까지 기다리는 키워드는?", answer: "await", explanation: "브라우저 전체가 멈추는 것은 아니다." },

  { week: 3, type: "short", topic: "Fetch·Axios", question: "`await` 없이 `fetch(url)`을 호출하면 반환되는 것은?", answer: "Promise", explanation: "서버 데이터가 바로 들어오는 것이 아니라 Promise 객체가 반환된다." },
  { week: 3, type: "short", topic: "Fetch·Axios", question: "`const response = await fetch(url);`의 `response`는 무엇인가?", answer: "Response 객체", explanation: "아직 파싱된 JSON 데이터가 아니다." },
  { week: 3, type: "short", topic: "Fetch·Axios", question: "`await response.json()`의 결과는?", answer: "파싱된 JavaScript 데이터(객체·배열)", explanation: "response.json()도 Promise를 반환하므로 await가 필요하다." },
  { week: 3, type: "concept", topic: "Fetch·Axios", question: "fetch 응답이 성공(200~299)인지 true/false로 알려주는 값은?", answer: "response.ok", explanation: "fetch는 HTTP 404/500만으로는 자동 reject되지 않는다." },
  { week: 3, type: "short", topic: "Fetch·Axios", question: "Axios에서 서버 응답 데이터가 들어 있는 프로퍼티는?", answer: "response.data", explanation: "Fetch는 response.json()이 필요하지만 Axios는 JSON을 자동 파싱해 data로 제공한다." },

  { week: 3, type: "concept", topic: "API 렌더링", question: "loading·error일 때 먼저 return해서 화면을 나누는 패턴은?", answer: "Early Return", explanation: "보통 error → loading → 데이터 순서로 검사한다." },
  { week: 3, type: "short", topic: "API 렌더링", question: "콜백 방식 API를 await로 쓸 수 있게 감싸도록 빈칸을 채우시오.", code: "return ______((resolve, reject) => {\n    navigator.geolocation.getCurrentPosition(resolve, reject);\n});", answer: "new Promise", explanation: "new Promise로 감싸면 `await getPosition()`처럼 쓸 수 있다." },

  { week: 3, type: "concept", topic: "Next.js 라우팅", question: "Next.js App Router에서 여러 페이지의 공통 화면 구조를 만드는 파일은?", answer: "layout.js", explanation: "`children` 자리에 현재 page.js 내용이 들어온다." },
  { week: 3, type: "short", topic: "Next.js 라우팅", question: "`app/menu/[menuCode]/page.js`에서 URL이 `/menu/5`일 때 `menuCode`의 값은?", answer: "5", explanation: "`[menuCode]`는 URL의 동적인 부분이다." },
  { week: 3, type: "choice", topic: "Next.js 라우팅", question: "동적 라우팅 URL(`/menu/5`)에서 파라미터 값을 가져오는 Hook은?", options: ["useParams()", "useSearchParams()", "usePathname()", "useRouter()"], answer: "useParams()", explanation: "Query String은 useSearchParams로 가져온다." },
  { week: 3, type: "concept", topic: "Next.js 라우팅", question: "JSX에서 클릭해 페이지를 이동하는 Next.js 컴포넌트는?", answer: "Link", explanation: "코드로 이동시키는 것은 useRouter이다." },
  { week: 3, type: "concept", topic: "Next.js 라우팅", question: "`router.push('/menu')`처럼 코드로 페이지를 이동할 때 쓰는 Hook은?", answer: "useRouter()", explanation: "Link는 링크를 눌러 이동, useRouter는 코드로 이동한다." },
  { week: 3, type: "short", topic: "Next.js 라우팅", question: "URL이 `/menu/search?menuName=열무`일 때 `searchParams.get('menuName')`의 결과는?", answer: "\"열무\"", explanation: "`?키=값`의 Query String에서 값을 가져온다." },
  { week: 3, type: "concept", topic: "Next.js 라우팅", question: "Query String(`?menuName=열무`)의 값을 가져오는 Hook은?", answer: "useSearchParams()", explanation: "동적 라우팅 값은 useParams, Query String은 useSearchParams이다." },
  { week: 3, type: "choice", topic: "Next.js 라우팅", question: "현재 URL의 경로(예: `/menu`)를 가져오는 Hook은?", options: ["useParams()", "useSearchParams()", "usePathname()", "useRouter()"], answer: "usePathname()", explanation: "`pathname === path`로 현재 페이지를 비교할 수 있다." },
  { week: 3, type: "concept", topic: "Next.js 라우팅", question: "파일 맨 위에 써서 클라이언트 컴포넌트로 지정하는 문구는?", answer: "'use client'", explanation: "useRouter, useParams 등을 쓰는 페이지에 필요하다." },

  { week: 3, type: "concept", topic: "Zustand·상태관리", question: "props를 여러 단계의 자식에게 계속 전달해야 하는 문제는?", answer: "Props Drilling", explanation: "이를 줄이기 위해 Zustand 같은 전역 상태 관리를 쓴다." },
  { week: 3, type: "concept", topic: "Zustand·상태관리", question: "Store를 만들어 전역 상태를 관리하는 라이브러리는?", answer: "Zustand", explanation: "`create()`로 Store를 만들고 `set()`으로 상태를 바꾼다." },
  { week: 3, type: "short", topic: "Zustand·상태관리", question: "Zustand Store를 만드는 함수 빈칸은?", code: "export const useStore = ______((set) => ({ count: 0 }));", answer: "create", explanation: "`import { create } from \"zustand\"`로 가져온다." },

  { week: 3, type: "choice", topic: "Fetch·Axios", question: "CRUD에서 데이터의 일부를 수정할 때 쓰는 HTTP 메서드는?", options: ["GET", "POST", "PATCH", "DELETE"], answer: "PATCH", explanation: "Create=POST, Read=GET, Update=PATCH, Delete=DELETE." },

  { week: 3, type: "concept", topic: "Zustand·상태관리", question: "Zustand 상태를 localStorage에 저장해 새로고침 후에도 유지하는 middleware는?", answer: "persist", explanation: "`name`은 localStorage에 저장할 키 이름이다." },
  { week: 3, type: "concept", topic: "Zustand·상태관리", question: "서버의 첫 렌더링 결과와 브라우저의 첫 렌더링 결과가 달라 생기는 문제는?", answer: "Hydration 문제", explanation: "isMounted 상태로 마운트 이후에 화면을 그리는 방식으로 해결한다." },

  { week: 3, type: "concept", topic: "React Query", question: "서버 데이터의 로딩·에러·캐시를 관리해 주는 라이브러리는?", answer: "React Query(TanStack Query)", explanation: "내부 상태는 Zustand, 서버 데이터는 React Query가 담당한다." },
  { week: 3, type: "choice", topic: "React Query", question: "QueryClient를 하위 컴포넌트에서 쓸 수 있게 감싸 주는 컴포넌트는?", options: ["QueryClient", "QueryClientProvider", "useQuery", "queryKey"], answer: "QueryClientProvider", explanation: "useQuery를 쓰기 전에 Provider 설정이 필요하다." },
  { week: 3, type: "concept", topic: "React Query", question: "useQuery에서 Query를 구분하는 키(예: `[\"users\"]`) 옵션은?", answer: "queryKey", explanation: "queryFn은 데이터를 어떻게 가져올지 정하는 함수이다." },
  { week: 3, type: "choice", topic: "React Query", question: "useQuery에서 실제로 서버 데이터를 가져오는 함수를 지정하는 옵션은?", options: ["queryKey", "queryFn", "isLoading", "isFetching"], answer: "queryFn", explanation: "queryKey는 식별, queryFn은 가져오는 방법이다." },
  { week: 3, type: "concept", topic: "React Query", question: "useQuery에서 처음 데이터를 불러오는 중인지 알려주는 값은?", answer: "isLoading", explanation: "재요청까지 포함해 fetch 중인지 확인하는 것은 isFetching이다." },
  { week: 3, type: "concept", topic: "React Query", question: "useQuery에서 재요청을 포함해 지금 데이터를 가져오는 중인지 알려주는 값은?", answer: "isFetching", explanation: "isLoading은 처음 로딩, isFetching은 재요청 포함 진행 여부이다." },

  /* ===================== 4주차 ===================== */
  { week: 4, type: "short", topic: "자료형·형변환", question: "출력 결과는?", code: "System.out.println('a' + 'b');", answer: "195", explanation: "문자끼리는 유니코드 숫자(97 + 98)로 계산되어 \"ab\"가 아니다." },
  { week: 4, type: "short", topic: "자료형·형변환", question: "출력 결과는?", code: "System.out.println(9 + 9 + \"9\");", answer: "189", explanation: "왼쪽부터 9+9=18을 먼저 계산한 뒤 문자열 \"9\"와 이어 붙인다." },
  { week: 4, type: "short", topic: "자료형·형변환", question: "출력 결과는? (byte 범위: -128 ~ 127)", code: "byte num = 127;\nnum++;\nSystem.out.println(num);", answer: "-128", explanation: "범위를 넘으면 반대쪽 끝으로 넘어가는 오버플로우가 일어난다." },
  { week: 4, type: "short", topic: "자료형·형변환", question: "int 곱셈이 범위를 넘지 않도록 빈칸을 채우시오.", code: "int a = 1000000, b = 70000;\nlong result = (______) a * b;", answer: "long", explanation: "계산 전에 하나를 long으로 바꿔야 계산 전체가 long으로 처리된다." },
  { week: 4, type: "short", topic: "자료형·형변환", question: "출력 결과는?", code: "float f = 4.7f;\nSystem.out.println((long) f);", answer: "4", explanation: "실수를 정수로 강제 형변환하면 소수점이 버려진다." },

  { week: 4, type: "short", topic: "연산자", question: "result의 값은?", code: "int firstNum = 10;\nint result = ++firstNum * 3;", answer: "33", explanation: "전위 증가는 먼저 1 증가(11)한 뒤 사용하므로 11 * 3이다." },
  { week: 4, type: "short", topic: "연산자", question: "마지막 비교 결과는?", code: "String a = \"java\";\nString c = new String(\"java\");\nSystem.out.println(a == c);", answer: "false", explanation: "new로 만들면 새 객체라 ==는 주소가 달라 false이다(내용 비교는 equals)." },
  { week: 4, type: "short", topic: "연산자", question: "출력되는 num의 값은?", code: "int num = 10;\nboolean r = false && ++num > 0;\nSystem.out.println(num);", answer: "10", explanation: "&&는 앞이 false면 뒤를 실행하지 않는다(단락 평가)." },

  { week: 4, type: "concept", topic: "메소드·static", question: "메소드를 호출할 때 넘기는 실제 값은? (예: `printAge(5)`의 5)", answer: "전달인자(argument)", explanation: "`printAge(5)`의 5가 전달인자이다." },
  { week: 4, type: "concept", topic: "메소드·static", question: "메소드 선언부에서 값을 받는 변수는? (예: `printAge(int age)`의 age)", answer: "매개변수(parameter)", explanation: "`printAge(int age)`의 age가 매개변수이다." },
  { week: 4, type: "concept", topic: "메소드·static", question: "객체 없이 `클래스명.메소드()`로 호출하는 메소드는?", answer: "static 메소드", explanation: "static 메소드는 객체가 아니라 클래스에 속한다." },
  { week: 4, type: "short", topic: "메소드·static", question: "10~15 사이 난수를 만들도록 빈칸을 채우시오.", code: "int r = (int) (Math.random() * ______) + 10;", answer: "6", explanation: "개수 = 최대값 - 최소값 + 1 = 15 - 10 + 1 = 6이다." },

  { week: 4, type: "concept", topic: "Scanner", question: "`nextInt()` 다음 `nextLine()`이 빈 문자열을 읽는 이유는 버퍼에 무엇이 남아서인가?", answer: "엔터(줄바꿈 \\n)", explanation: "nextInt는 숫자만 가져가고 엔터는 남겨서 nextLine이 그것을 바로 읽는다." },

  { week: 4, type: "choice", topic: "배열", question: "마지막 줄에서 발생하는 예외는?", code: "int[] arr = new int[3];\narr[3] = 1;", options: ["ArrayIndexOutOfBoundsException", "NullPointerException", "NumberFormatException", "ClassCastException"], answer: "ArrayIndexOutOfBoundsException", explanation: "길이 3인 배열의 마지막 인덱스는 2이다." },
  { week: 4, type: "concept", topic: "배열", question: "`int[] b = a;`처럼 배열의 주소만 복사하는 방식은?", answer: "얕은 복사", explanation: "배열은 하나이고 변수만 둘이라 b를 바꾸면 a도 바뀐다." },
  { week: 4, type: "short", topic: "배열", question: "새 배열을 만들어 복사하도록 빈칸을 채우시오.", code: "int[] copy = Arrays.______(origin, origin.length);", answer: "copyOf", explanation: "Arrays.copyOf는 새 배열을 반환하고 길이를 조절할 수 있다." },
  { week: 4, type: "short", topic: "배열", question: "출력 결과는?", code: "int[] arr = {1, 2, 3};\nfor (int value : arr) value += 10;\nSystem.out.println(arr[0]);", answer: "1", explanation: "향상된 for의 value는 복사본이라 원본 배열이 바뀌지 않는다." },
  { week: 4, type: "short", topic: "배열", question: "두 값을 교환하도록 빈칸을 채우시오.", code: "int temp = a;\na = b;\nb = ______;", answer: "temp", explanation: "원래 a 값을 temp에 보관해야 b에 넣을 수 있다." },

  { week: 4, type: "concept", topic: "정렬", question: "옆 칸끼리 비교해 큰 값을 뒤로 보내는 정렬은?", answer: "버블 정렬", explanation: "한 회차마다 가장 큰 값이 맨 뒤로 확정된다." },
  { week: 4, type: "concept", topic: "정렬", question: "남은 값 중 가장 작은 값을 찾아 앞자리와 바꾸는 정렬은?", answer: "선택 정렬", explanation: "버블 정렬은 조건이 맞을 때마다 여러 번 교환한다." },

  { week: 4, type: "concept", topic: "제어문", question: "중첩 반복문을 한 번에 빠져나가는 `break outer;`에서 `outer` 같은 이름은?", answer: "라벨", explanation: "`outer:`를 반복문 앞에 쓰고 `break outer;`로 탈출한다." },
  { week: 4, type: "concept", topic: "제어문", question: "향상된 switch(`case ->`) 블록에서 결과값을 돌려주는 키워드는?", answer: "yield", explanation: "return은 메소드 전체를 끝내지만 yield는 switch의 결과값만 정한다." },
  { week: 4, type: "concept", topic: "제어문", question: "switch에서 break를 빼먹어 아래 case까지 계속 실행되는 현상은?", answer: "fall-through", explanation: "break를 만날 때까지 아래 case가 모두 실행된다." },
  { week: 4, type: "concept", topic: "제어문", question: "본문을 먼저 실행하고 조건을 나중에 검사해서 최소 한 번은 실행되는 반복문은?", answer: "do-while", explanation: "본문을 먼저 실행하고 나중에 조건을 검사한다." },

  { week: 4, type: "concept", topic: "클래스·캡슐화", question: "필드와 메소드를 정의한 객체의 설계도는?", answer: "클래스", explanation: "클래스 자체는 객체가 아니며 new로 객체를 만든다." },
  { week: 4, type: "concept", topic: "클래스·캡슐화", question: "필드를 private으로 숨기고 getter/setter로만 접근하게 하는 것은?", answer: "캡슐화", explanation: "setter에서 검증해 잘못된 값(음수 나이 등)을 막을 수 있다." },
  { week: 4, type: "choice", topic: "클래스·캡슐화", question: "같은 패키지 + 상속받은 자식 클래스까지 접근할 수 있는 접근제한자는?", options: ["public", "protected", "default", "private"], answer: "protected", explanation: "public은 모든 패키지, default는 같은 패키지만, private은 해당 클래스 내부만 접근된다." },
  { week: 4, type: "short", topic: "클래스·캡슐화", question: "`private boolean isActivated;`의 getter 메소드 이름은?", answer: "isActivated()", explanation: "boolean 필드의 getter는 get 대신 is로 시작한다." },
  { week: 4, type: "concept", topic: "클래스·캡슐화", question: "CarRacer가 Car를 필드로 가지는 것처럼 한 클래스가 다른 클래스를 '가지는' 관계는?", answer: "has-a 관계", explanation: "상속(is-a)과 달리 소유 관계이다." },
  { week: 4, type: "concept", topic: "클래스·캡슐화", question: "로직 없이 데이터만 묶어서 전달하는 객체는?", answer: "DTO", explanation: "Data Transfer Object는 데이터 저장·전달만 담당한다." },

  { week: 4, type: "short", topic: "생성자", question: "`public User(String id) { }` 생성자만 있는 클래스에서 `new User()`를 호출하면?", answer: "컴파일 에러", explanation: "매개변수 있는 생성자가 하나라도 있으면 기본 생성자가 자동 추가되지 않는다." },
  { week: 4, type: "concept", topic: "생성자", question: "생성자 첫 줄에서 같은 클래스의 다른 생성자를 호출하는 것은?", answer: "this()", explanation: "super()는 부모 생성자를 호출한다." },

  { week: 4, type: "short", topic: "오버로딩·파라미터", question: "반환 타입만 다른 `int test()`와 `void test()`는 오버로딩이 되는가?", answer: "성립하지 않는다", explanation: "반환 타입만 다르면 시그니처(이름 + 매개변수)가 같아 구분할 수 없다." },
  { week: 4, type: "short", topic: "오버로딩·파라미터", question: "`static void change(int n) { n = 99; }`일 때 출력 결과는?", code: "int num = 20;\nchange(num);\nSystem.out.println(num);", answer: "20", explanation: "기본 자료형은 값이 복사되어 전달되므로 원본이 바뀌지 않는다." },
  { week: 4, type: "concept", topic: "오버로딩·파라미터", question: "`String... toppings`처럼 인자 개수가 정해지지 않을 때 쓰는 매개변수는?", answer: "가변인자", explanation: "메소드 내부에서 배열로 취급하며 매개변수 목록의 마지막에 둔다." },

  { week: 4, type: "concept", topic: "final·static·싱글톤", question: "모든 객체가 하나를 공유하는 클래스 변수를 만드는 키워드는?", answer: "static", explanation: "인스턴스 변수는 객체마다 따로 존재한다." },
  { week: 4, type: "short", topic: "final·static·싱글톤", question: "`final String ssn;` 같은 final 필드는 어디에서 초기화해야 하는가?", answer: "생성자", explanation: "객체 생성 시 한 번만 결정되고 이후에는 바꿀 수 없다." },
  { week: 4, type: "concept", topic: "final·static·싱글톤", question: "인스턴스가 딱 하나만 만들어지도록 보장하는 디자인 패턴은?", answer: "싱글톤", explanation: "생성자를 private으로 막고 static getInstance()로만 접근한다." },
  { week: 4, type: "concept", topic: "final·static·싱글톤", question: "싱글톤에서 처음 getInstance()를 호출할 때 인스턴스를 만드는 방식은?", answer: "늦은 초기화(Lazy)", explanation: "처음 getInstance() 호출 때 생성하는 방식은 Lazy. 반대로 클래스 로딩 때 미리 생성하는 방식은 Eager." },

  /* ===================== 5주차 ===================== */
  { week: 5, type: "short", topic: "객체 배열·역할 분리", question: "출력 결과는?", code: "Car[] carArray = new Car[3];\nSystem.out.println(carArray[0]);", answer: "null", explanation: "new Car[3]은 칸만 만들고 각 칸은 객체를 넣기 전까지 null이다." },

  { week: 5, type: "concept", topic: "상속·오버라이딩", question: "자식 생성자에서 부모 생성자를 호출하는 것은?", answer: "super()", explanation: "생성자의 첫 줄에 위치하며, 부모 필드가 private이어도 초기화할 수 있다." },
  { week: 5, type: "choice", topic: "상속·오버라이딩", question: "오버라이딩한 메소드 안에서 부모의 메소드를 실행하는 방법은?", options: ["super()", "super.메소드()", "this()", "this.메소드()"], answer: "super.메소드()", explanation: "super()는 생성자에서 부모 초기화, super.메소드()는 부모 메소드 재사용이다." },
  { week: 5, type: "concept", topic: "상속·오버라이딩", question: "부모 메소드를 이름·매개변수는 그대로 두고 자식에서 다시 작성하는 것은?", answer: "오버라이딩", explanation: "매개변수가 다르면 오버라이딩이 아니라 오버로딩이다." },

  { week: 5, type: "concept", topic: "다형성·추상·인터페이스", question: "자식 객체를 부모 타입 변수에 담는 자동 형변환은?", answer: "업캐스팅", explanation: "업캐스팅 후에는 부모에 정의된 메소드만 접근할 수 있다." },
  { week: 5, type: "concept", topic: "다형성·추상·인터페이스", question: "부모 타입을 자식 타입으로 바꾸는 명시적 형변환은?", answer: "다운캐스팅", explanation: "`((Rabbit)a1).jump()`처럼 쓰며 잘못하면 ClassCastException이 발생한다." },
  { week: 5, type: "concept", topic: "다형성·추상·인터페이스", question: "`Animal a1 = new Rabbit(); a1.cry();`에서 실행 시 Rabbit의 cry()가 호출되는 것은?", answer: "동적 바인딩", explanation: "컴파일 때는 부모 메소드로 보이지만 실행할 때 실제 객체의 메소드가 호출된다." },
  { week: 5, type: "concept", topic: "다형성·추상·인터페이스", question: "다운캐스팅 전에 실제 객체의 타입을 확인하는 연산자는?", answer: "instanceof", explanation: "확인 후 다운캐스팅해야 ClassCastException을 피할 수 있다." },
  { week: 5, type: "concept", topic: "다형성·추상·인터페이스", question: "객체를 직접 만들 수 없고 추상 메소드를 가질 수 있는 미완성 부모 클래스는?", answer: "추상 클래스(abstract class)", explanation: "자식이 추상 메소드를 반드시 오버라이딩해야 하며 일반 메소드도 가질 수 있다." },
  { week: 5, type: "short", topic: "다형성·추상·인터페이스", question: "인스턴스 필드를 가질 수 있는 것은? (추상 클래스 / 인터페이스)", answer: "추상 클래스", explanation: "인터페이스는 인스턴스 필드를 가질 수 없고 상수만 가능하다." },

  { week: 5, type: "concept", topic: "Object·String·Wrapper", question: "문자열을 반복해서 붙일 때 새 객체를 만들지 않고 내부 버퍼에 추가하는 클래스는?", answer: "StringBuilder", explanation: "String은 불변이라 연결할 때마다 새 객체가 생겨 느리다." },
  { week: 5, type: "short", topic: "Object·String·Wrapper", question: "출력 결과는?", code: "String input = null;\nSystem.out.println(\"java\".equals(input));", answer: "false", explanation: "리터럴을 앞에 두고 equals를 호출하면 null이어도 NullPointerException이 나지 않는다." },
  { week: 5, type: "choice", topic: "Object·String·Wrapper", question: "`Integer.parseInt(\"abc\")`를 실행하면 발생하는 예외는?", options: ["NumberFormatException", "NullPointerException", "ClassCastException", "ArrayIndexOutOfBoundsException"], answer: "NumberFormatException", explanation: "숫자로 바꿀 수 없는 문자열을 파싱하면 NumberFormatException이 발생한다." },

  { week: 5, type: "concept", topic: "제네릭", question: "`<T extends Rabbit>`처럼 제네릭 타입을 Rabbit 계열로만 제한하는 문법은?", answer: "타입 제한(extends)", explanation: "Rabbit 계열이 아닌 타입은 컴파일 에러로 차단된다." },

  { week: 5, type: "short", topic: "컬렉션(List·Set·Map)", question: "중간 추가·삭제에 유리한 것은? (ArrayList / LinkedList)", answer: "LinkedList", explanation: "연결만 바꾸면 되지만, ArrayList는 뒤 요소를 밀어야 한다." },
  { week: 5, type: "concept", topic: "컬렉션(List·Set·Map)", question: "클래스 안에 compareTo()를 구현해 기본 정렬 기준을 정하는 인터페이스는?", answer: "Comparable", explanation: "클래스 밖에 `compare(o1, o2)`로 다른 기준을 정하는 것은 Comparator이다." },
  { week: 5, type: "concept", topic: "컬렉션(List·Set·Map)", question: "클래스 밖에서 compare(o1, o2)로 다른 정렬 기준을 정하는 인터페이스는?", answer: "Comparator", explanation: "`compare(o1, o2)`를 구현하며 `list.sort(new 기준())`으로 사용한다." },
  { week: 5, type: "short", topic: "컬렉션(List·Set·Map)", question: "출력 결과는?", code: "Deque<Integer> stack = new ArrayDeque<>();\nstack.push(1); stack.push(2);\nSystem.out.println(stack.pop());", answer: "2", explanation: "Stack은 후입선출(LIFO)이라 나중에 넣은 값이 먼저 나온다." },
  { week: 5, type: "short", topic: "컬렉션(List·Set·Map)", question: "출력 결과는?", code: "Queue<String> queue = new ArrayDeque<>();\nSystem.out.println(queue.poll());", answer: "null", explanation: "빈 Queue에 poll()하면 에러가 아니라 null을 반환한다." },
  { week: 5, type: "choice", topic: "컬렉션(List·Set·Map)", question: "중복 없이 입력한 순서를 기억하는 Set은?", options: ["HashSet", "LinkedHashSet", "TreeSet", "ArrayList"], answer: "LinkedHashSet", explanation: "HashSet은 순서 보장이 없고, TreeSet은 자동 정렬이다." },
  { week: 5, type: "concept", topic: "컬렉션(List·Set·Map)", question: "중복 없이 저장할 때마다 자동으로 오름차순 정렬하는 Set은?", answer: "TreeSet", explanation: "객체를 담으려면 Comparable 구현 또는 Comparator 전달이 필요하다." },
  { week: 5, type: "short", topic: "컬렉션(List·Set·Map)", question: "`Map<String, String> map = new HashMap<>();`일 때 출력 결과는?", code: "map.put(\"two\", \"jdbc\");\nmap.put(\"two\", \"html\");\nSystem.out.println(map.get(\"two\"));", answer: "html", explanation: "key는 중복될 수 없어서 같은 key로 put하면 값을 덮어쓴다." },

  { week: 5, type: "concept", topic: "예외처리", question: "예외를 지금 직접 발생시키는 키워드는?", answer: "throw", explanation: "throw가 실행되면 그 아래 코드는 실행되지 않는다." },
  { week: 5, type: "choice", topic: "예외처리", question: "메소드 선언부에 붙여 예외 처리를 호출한 쪽에 넘기는 키워드는?", options: ["throw", "throws", "try", "catch"], answer: "throws", explanation: "throw는 발생시키는 행동, throws는 던질 수 있다는 선언이다." },

  { week: 5, type: "choice", topic: "입출력(IO)", question: "텍스트를 문자 단위로 읽어 한글이 깨지지 않는 기본 스트림은?", options: ["FileInputStream", "FileReader", "BufferedReader", "Properties"], answer: "FileReader", explanation: "FileInputStream은 1바이트씩 읽어서 한글이 깨질 수 있다." },
  { week: 5, type: "short", topic: "입출력(IO)", question: "`BufferedReader.readLine()`은 더 읽을 줄이 없으면 무엇을 반환하는가?", answer: "null", explanation: "read()의 끝 신호는 -1이고 readLine()의 끝 신호는 null이다." },
  { week: 5, type: "concept", topic: "입출력(IO)", question: "try 괄호 안에서 만든 스트림을 블록이 끝나면 자동으로 close()해 주는 문법은?", answer: "try-with-resources", explanation: "finally와 null 체크, close 예외 처리가 필요 없어진다." },
  { week: 5, type: "concept", topic: "입출력(IO)", question: "key=value 설정을 파일로 저장(store)하고 읽어오는(load) 클래스는?", answer: "Properties", explanation: "key와 value는 모두 String이며 DB 접속 정보 등을 코드 밖으로 분리할 때 쓴다." },

  { week: 5, type: "concept", topic: "enum", question: "정해진 값들만 가질 수 있는 전용 타입을 만드는 문법은?", answer: "enum(열거형)", explanation: "int 상수와 달리 타입 안전성이 있고 출력하면 이름이 나온다." },

  { week: 5, type: "concept", topic: "람다·함수형 인터페이스", question: "추상 메소드가 딱 1개라서 람다를 담을 수 있는 인터페이스는?", answer: "함수형 인터페이스", explanation: "`@FunctionalInterface`로 추상 메소드가 1개인지 검사할 수 있다." },
  { week: 5, type: "concept", topic: "람다·함수형 인터페이스", question: "값을 받아 처리만 하고 반환하지 않는(accept) 함수형 인터페이스는?", answer: "Consumer", explanation: "출력만 하는 용도이며 `accept(t)`를 쓴다." },
  { week: 5, type: "concept", topic: "람다·함수형 인터페이스", question: "입력 없이 값만 주는(get) 함수형 인터페이스는?", answer: "Supplier", explanation: "자판기처럼 기본값을 제공할 때 쓴다." },
  { week: 5, type: "choice", topic: "람다·함수형 인터페이스", question: "값을 받아 true/false를 반환하는(test) 함수형 인터페이스는?", options: ["Function", "Consumer", "Supplier", "Predicate"], answer: "Predicate", explanation: "스트림 filter가 받는 람다 타입이기도 하다." },
  { week: 5, type: "choice", topic: "람다·함수형 인터페이스", question: "값을 받아 다른 값으로 바꿔 반환하는(apply) 함수형 인터페이스는?", options: ["Function", "Consumer", "Supplier", "Predicate"], answer: "Function", explanation: "T를 받아 R을 반환하는 Function<T, R>, 메소드는 apply(). (받기만 하면 Consumer, 주기만 하면 Supplier, true/false면 Predicate)" },
  { week: 5, type: "short", topic: "람다·함수형 인터페이스", question: "결과는?", code: "Calculator c = (a, b) -> a - b;   // int operate(int a, int b)\nSystem.out.println(c.operate(10, 19));", answer: "-9", explanation: "람다가 10 - 19를 계산한다." },
  { week: 5, type: "short", topic: "람다·함수형 인터페이스", question: "`Integer::parseInt`를 람다로 바꾸면? (매개변수 이름은 value)", answer: "value -> Integer.parseInt(value)", explanation: "받은 값을 그대로 static 메소드에 넘기기만 할 때 `::`로 줄인다." },

  { week: 5, type: "concept", topic: "스트림", question: "스트림이 최종 연산을 호출하기 전까지 실행되지 않는 성질은?", answer: "지연 실행(lazy)", explanation: "최종 연산이 호출될 때 비로소 실행된다." },
  { week: 5, type: "concept", topic: "스트림", question: "`findFirst()`처럼 값이 없을 수도 있는 결과를 null 대신 담는 객체는?", answer: "Optional", explanation: "`ifPresent`로 값이 있을 때만 실행한다." },
  { week: 5, type: "concept", topic: "스트림", question: "스트림 요소를 기준별로 묶어 `Map<기준, List<요소>>`로 만드는 Collectors 메소드는?", answer: "groupingBy", explanation: "`collect(Collectors.groupingBy(기준))` 형태로 쓴다." },

  /* ===================== 6주차 ===================== */
  { week: 6, type: "short", topic: "WHERE·DISTINCT·LIMIT", question: "결과는? (1 = true, 0 = false)", code: "SELECT 1 OR 0 AND 0;", answer: "1", explanation: "AND가 OR보다 먼저 계산되어 1 OR (0 AND 0) = 1 OR 0 = 1이다." },
  { week: 6, type: "concept", topic: "WHERE·DISTINCT·LIMIT", question: "양 끝 값을 포함하는 범위 조건 키워드는? (`menu_price ____ 10000 AND 25000`)", answer: "BETWEEN", explanation: "`>= 10000 AND <= 25000`과 같다." },
  { week: 6, type: "short", topic: "WHERE·DISTINCT·LIMIT", question: "`WHERE menu_name LIKE '마늘%'`로 조회되는 메뉴는?", answer: "이름이 '마늘'로 시작하는 메뉴", explanation: "`%`는 0글자 이상 아무거나를 뜻하고 `_`는 정확히 한 글자이다." },
  { week: 6, type: "short", topic: "WHERE·DISTINCT·LIMIT", question: "NULL인 행을 찾도록 빈칸을 채우시오.", code: "WHERE ref_category_code ______ NULL;", answer: "IS", explanation: "NULL은 `= NULL`로 비교할 수 없고 `IS NULL`/`IS NOT NULL`을 써야 한다." },
  { week: 6, type: "concept", topic: "WHERE·DISTINCT·LIMIT", question: "조회 결과에서 중복된 값을 없애는 키워드는?", answer: "DISTINCT", explanation: "여러 열이면 지정한 열의 조합이 같을 때만 중복으로 본다." },
  { week: 6, type: "short", topic: "WHERE·DISTINCT·LIMIT", question: "`LIMIT 5, 5`는 몇 번째 행부터 몇 개를 가져오는가?", answer: "6번째부터 5개", explanation: "`LIMIT [건너뛸 개수], [가져올 개수]`이므로 앞 5개를 건너뛴다." },

  { week: 6, type: "concept", topic: "JOIN", question: "양쪽 테이블에 짝이 있는 행만 보여주는 JOIN은? (`JOIN`만 써도 이것)", answer: "INNER JOIN", explanation: "짝이 없는 행은 결과에서 빠진다(교집합)." },
  { week: 6, type: "choice", topic: "JOIN", question: "왼쪽 테이블은 전부 보여주고, 오른쪽에 짝이 없으면 NULL로 채우는 JOIN은?", options: ["INNER JOIN", "LEFT JOIN", "SELF JOIN", "UNION"], answer: "LEFT JOIN", explanation: "FROM 쪽(왼쪽) 테이블이 기준이다." },
  { week: 6, type: "concept", topic: "JOIN", question: "같은 테이블에 별칭 a, b를 붙여 자기 자신과 연결하는 JOIN은?", answer: "SELF JOIN", explanation: "하위 카테고리와 상위 카테고리처럼 한 테이블 안의 행 사이 관계를 볼 때 쓴다." },

  { week: 6, type: "choice", topic: "GROUP BY·서브쿼리", question: "GROUP BY로 묶은 뒤 그룹을 조건으로 거르는 절은?", options: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"], answer: "HAVING", explanation: "WHERE는 그룹화 전 개별 행에 쓰고 집계 함수를 쓸 수 없다." },
  { week: 6, type: "concept", topic: "GROUP BY·서브쿼리", question: "GROUP BY 결과에 소계·총계 행을 추가하는 구문은?", answer: "WITH ROLLUP", explanation: "마지막 줄의 NULL 행이 전체 총계이다." },
  { week: 6, type: "concept", topic: "GROUP BY·서브쿼리", question: "바깥 쿼리의 값을 참조해서 바깥 행마다 다시 실행되는 서브쿼리는?", answer: "상관 서브쿼리", explanation: "예: `WHERE category_code = a.category_code`처럼 바깥 별칭을 참조한다." },
  { week: 6, type: "short", topic: "GROUP BY·서브쿼리", question: "FROM 절 서브쿼리(파생 테이블)에 꼭 붙여야 하는 것은?", answer: "별칭", explanation: "파생 테이블은 별칭이 없으면 에러가 난다." },

  { week: 6, type: "choice", topic: "집합 연산자", question: "두 SELECT 결과를 합치면서 중복을 없애는 연산자는?", options: ["UNION", "UNION ALL", "INNER JOIN", "DISTINCT"], answer: "UNION", explanation: "중복을 포함하는 것은 UNION ALL이다." },
  { week: 6, type: "concept", topic: "집합 연산자", question: "LEFT JOIN 후 `b.menu_code IS NULL`로 'B에 없는 A'만 구하는 집합 연산은?", answer: "차집합", explanation: "LEFT JOIN은 A를 모두 남기고 B에 없으면 NULL이 된다." },

  { week: 6, type: "concept", topic: "DML", question: "INSERT할 때 PRIMARY KEY가 겹치면 기존 행을 지우고 새로 넣는 명령은?", answer: "REPLACE", explanation: "UPDATE가 아니라 삭제 후 다시 추가하는 방식이다." },
  { week: 6, type: "short", topic: "DML", question: "WHERE 없이 `UPDATE tbl_menu SET category_code = 7;`를 실행하면?", answer: "테이블 전체 행이 수정된다", explanation: "WHERE 조건이 없으면 모든 행이 대상이다." },

  { week: 6, type: "concept", topic: "트랜잭션", question: "모두 성공하거나 모두 실패해야 하는 하나의 작업 단위는?", answer: "트랜잭션", explanation: "All or Nothing이며 성공하면 COMMIT, 실패하면 ROLLBACK한다." },
  { week: 6, type: "short", topic: "트랜잭션", question: "트랜잭션 중에 `CREATE TABLE`(DDL)을 실행하면 그 전 작업은 어떻게 되는가?", answer: "자동으로 COMMIT된다(암시적 커밋)", explanation: "그래서 이후 ROLLBACK으로 되돌릴 수 없다." },

  { week: 6, type: "choice", topic: "DDL", question: "테이블 구조는 두고 데이터만 비우며 AUTO_INCREMENT도 처음부터 다시 시작하는 명령은?", options: ["DELETE", "TRUNCATE", "DROP", "ALTER"], answer: "TRUNCATE", explanation: "DROP은 테이블 자체를 삭제한다." },
  { week: 6, type: "short", topic: "DDL", question: "DELETE, TRUNCATE, DROP 중 ROLLBACK으로 되돌릴 수 있는 것은?", answer: "DELETE", explanation: "DELETE는 DML이고 TRUNCATE와 DROP은 DDL이라 ROLLBACK이 안 된다." },
  { week: 6, type: "concept", topic: "DDL", question: "ALTER TABLE에서 컬럼 이름과 타입을 함께 바꾸는 문법은? (`MODIFY`는 타입만)", answer: "CHANGE COLUMN", explanation: "이름이 그대로여도 기존 이름을 두 번 써야 한다." },

  { week: 6, type: "concept", topic: "제약조건", question: "NULL과 중복을 모두 막고, 테이블당 1개만 두는 대표 키는?", answer: "PRIMARY KEY", explanation: "NULL도 중복도 허용하지 않는다." },
  { week: 6, type: "choice", topic: "제약조건", question: "NULL은 허용하지만 중복은 막는 제약조건은?", options: ["PRIMARY KEY", "UNIQUE", "NOT NULL", "FOREIGN KEY"], answer: "UNIQUE", explanation: "PRIMARY KEY와 달리 NULL이 가능하다." },
  { week: 6, type: "concept", topic: "제약조건", question: "자식 테이블에 부모 테이블에 있는 값만 들어가게 하는 제약조건은?", answer: "FOREIGN KEY", explanation: "`REFERENCES 부모테이블(컬럼)`으로 지정한다." },
  { week: 6, type: "short", topic: "제약조건", question: "`ON DELETE SET NULL`일 때 부모 행을 삭제하면 자식의 참조 컬럼 값은?", answer: "NULL", explanation: "CASCADE면 자식도 함께 삭제되고, 옵션이 없으면 삭제가 막힌다." },
  { week: 6, type: "concept", topic: "제약조건", question: "`age INT ____ (age >= 19)`처럼 직접 정한 조건을 만족하는 값만 넣게 하는 제약조건은?", answer: "CHECK", explanation: "조건에 맞지 않는 값은 INSERT가 거부된다." },

  { week: 6, type: "short", topic: "형변환", question: "MySQL에서 결과는?", code: "SELECT '1' + '2';", answer: "3", explanation: "MySQL의 +는 문자열 이어붙이기가 아니라 숫자 덧셈이다(암시적 형변환)." },
  { week: 6, type: "short", topic: "형변환", question: "MySQL CAST에서 정수로 바꿀 때 INT 대신 쓰는 타입은?", answer: "SIGNED", explanation: "`CAST(AVG(menu_price) AS SIGNED INTEGER)`처럼 쓴다." },

  { week: 6, type: "concept", topic: "인덱스", question: "데이터를 빨리 찾기 위한 목차(색인) 역할의 DB 객체는?", answer: "인덱스", explanation: "없으면 테이블 전체를 훑는 Full Table Scan을 한다." },
  { week: 6, type: "short", topic: "인덱스", question: "`WHERE phone_name LIKE '%phone'`은 인덱스를 탈 수 있는가?", answer: "탈 수 없다", explanation: "앞에 %가 오면 인덱스를 못 타고 `'iph%'`처럼 뒤에 %가 와야 가능하다." },
  { week: 6, type: "short", topic: "인덱스", question: "인덱스를 만들면 느려지는 작업은?", answer: "쓰기(INSERT/UPDATE/DELETE)", explanation: "데이터 변경 때 인덱스도 함께 고쳐야 하고 저장 공간도 더 쓴다." },

  { week: 6, type: "short", topic: "JDBC", question: "`.properties` 파일을 읽어오도록 빈칸을 채우시오.", code: "Properties prop = new Properties();\nprop.______(reader);", answer: "load", explanation: "`load(Reader)`로 키=값 설정을 읽고 `getProperty(\"키\")`로 꺼낸다." },
  { week: 6, type: "concept", topic: "JDBC", question: "사용자 입력을 SQL에 그대로 이어 붙일 때 생기는 공격(예: `' OR '1'='1`)은?", answer: "SQL Injection", explanation: "Statement는 취약하고 PreparedStatement는 안전하다." },
  { week: 6, type: "choice", topic: "JDBC", question: "`?` 자리에 setXxx()로 값을 넣어 SQL Injection에 안전한 객체는?", options: ["Statement", "PreparedStatement", "ResultSet", "Connection"], answer: "PreparedStatement", explanation: "Statement는 문자열 이어붙이기라 취약하고 실무에선 거의 안 쓴다." },
  { week: 6, type: "choice", topic: "JDBC", question: "INSERT/UPDATE/DELETE를 실행하고 영향받은 행 수(int)를 반환하는 메서드는?", options: ["executeQuery()", "executeUpdate()", "getProperty()", "close()"], answer: "executeUpdate()", explanation: "SELECT는 `executeQuery()`로 ResultSet을 반환한다." },
  { week: 6, type: "choice", topic: "JDBC", question: "쿼리를 XML 파일(`<entry key=...>`)에서 읽어올 때 쓰는 Properties 메서드는?", options: ["load()", "loadFromXML()", "storeToXML()", "getProperty()"], answer: "loadFromXML()", explanation: "FileInputStream으로 읽고 `getProperty(키)`로 쿼리를 꺼낸다." },
  { week: 6, type: "concept", topic: "JDBC", question: "JDBCTemplate에서 `close()`를 매개변수 타입별로 여러 개 만든 방식은?", answer: "오버로딩", explanation: "매개변수 타입만 다르게 같은 이름의 메서드를 정의한다." },

  { week: 6, type: "short", topic: "SELECT·WHERE·ORDER BY", question: "결과는?", code: "SELECT 6 + 3;", answer: "9", explanation: "FROM 없이 SELECT만 써도 연산 결과를 확인할 수 있다." },
  { week: 6, type: "short", topic: "SELECT·WHERE·ORDER BY", question: "가격이 높은 순으로 정렬되도록 빈칸을 채우시오.", code: "SELECT menu_name, menu_price\nFROM tbl_menu\nORDER BY menu_price ______;", answer: "DESC", explanation: "ASC는 오름차순(기본값), DESC는 내림차순이다." },

  { week: 6, type: "short", topic: "JOIN", question: "메뉴와 카테고리를 연결하도록 빈칸을 채우시오.", code: "SELECT a.menu_name, b.category_name\nFROM tbl_menu a\nJOIN tbl_category b ON a.category_code = ______;", answer: "b.category_code", explanation: "JOIN은 두 테이블의 공통 컬럼(category_code)이 같은 행끼리 연결한다." },

  { week: 6, type: "short", topic: "GROUP BY·서브쿼리", question: "카테고리별 메뉴 개수를 구하도록 빈칸을 채우시오.", code: "SELECT category_code, COUNT(*)\nFROM tbl_menu\n______ category_code;", answer: "GROUP BY", explanation: "GROUP BY가 같은 값끼리 묶고 COUNT(*)가 그룹별 행 개수를 센다." },

  /* ===================== 7주차 ===================== */
  { week: 7, type: "concept", topic: "IoC·Bean", question: "객체 생성·관리를 개발자가 아니라 스프링 컨테이너에 맡기는 것은?", answer: "IoC(제어의 역전)", explanation: "내가 new로 만들던 객체의 제어권이 컨테이너로 넘어간다." },
  { week: 7, type: "concept", topic: "IoC·Bean", question: "스프링 컨테이너가 만들고 관리하는 객체는?", answer: "Bean", explanation: "컨테이너(ApplicationContext)가 Bean을 보관하고 꺼내준다." },
  { week: 7, type: "concept", topic: "IoC·Bean", question: "클래스끼리 얼마나 강하게 묶여 있는지를 나타내는 말은? (new로 직접 만들면 높아짐)", answer: "결합도", explanation: "객체 생성이 코드에 박혀 있어 결합도가 높아진다." },

  { week: 7, type: "choice", topic: "Bean 등록 방식", question: "XML 설정 파일로 Bean을 등록할 때 쓰는 컨테이너 클래스는?", options: ["GenericXmlApplicationContext", "AnnotationConfigApplicationContext", "ApplicationContext", "@Configuration"], answer: "GenericXmlApplicationContext", explanation: "Java 설정 방식은 AnnotationConfigApplicationContext를 쓴다." },
  { week: 7, type: "choice", topic: "Bean 등록 방식", question: "Java 설정 클래스로 Bean을 등록할 때 쓰는 컨테이너 클래스는?", options: ["GenericXmlApplicationContext", "AnnotationConfigApplicationContext", "ApplicationContext", "@Configuration"], answer: "AnnotationConfigApplicationContext", explanation: "`new AnnotationConfigApplicationContext(설정클래스.class)`로 생성한다." },
  { week: 7, type: "short", topic: "Bean 등록 방식", question: "XML `<bean>`의 class 속성에는 무엇을 쓰는가? (클래스 이름만 / 패키지 포함 전체 경로)", answer: "패키지 포함 전체 경로", explanation: "클래스 이름만 쓰면 컨테이너가 클래스를 찾지 못한다." },
  { week: 7, type: "short", topic: "Bean 등록 방식", question: "XML에서 다른 Bean을 주입할 때 value 대신 쓰는 속성은?", answer: "ref", explanation: "value는 문자열·숫자 같은 기본값, ref는 다른 Bean의 id이다." },
  { week: 7, type: "concept", topic: "Bean 등록 방식", question: "Java 설정 클래스에 붙이는 어노테이션은?", answer: "@Configuration", explanation: "@Configuration 클래스 안의 @Bean 메서드가 반환한 객체가 Bean이 된다." },
  { week: 7, type: "short", topic: "Bean 등록 방식", question: "아래 Bean의 이름은?", code: "@Bean\npublic MemberDTO getMember() { return new MemberDTO(); }", answer: "getMember", explanation: "@Bean에 name을 주지 않으면 메서드 이름이 Bean 이름이 된다." },

  { week: 7, type: "concept", topic: "컴포넌트 스캔", question: "지정한 패키지에서 @Component 클래스를 찾아 자동으로 Bean 등록하는 어노테이션은?", answer: "@ComponentScan", explanation: "`@ComponentScan(basePackages = \"...\")`로 스캔 범위를 지정한다." },
  { week: 7, type: "short", topic: "컴포넌트 스캔", question: "`@Component public class MemberDAO`의 Bean 이름은?", answer: "memberDAO", explanation: "@Component의 기본 Bean 이름은 클래스명의 첫 글자를 소문자로 바꾼 것이다." },

  { week: 7, type: "concept", topic: "DI 개념·계층", question: "필요한 객체를 직접 만들지 않고 스프링이 넣어주는 것은?", answer: "DI(의존성 주입)", explanation: "A가 B를 사용하면 A는 B에 의존한다고 한다." },
  { week: 7, type: "choice", topic: "DI 개념·계층", question: "XML에서 생성자로 값을 주입할 때 쓰는 태그는?", options: ["constructor-arg", "property", "ref", "value"], answer: "constructor-arg", explanation: "세터 주입에는 `<property>`를 쓴다." },
  { week: 7, type: "concept", topic: "DI 개념·계층", question: "XML에서 setter로 값을 주입할 때 쓰는 태그는?", answer: "property", explanation: "property 방식은 기본 생성자와 setter가 있어야 동작한다." },
  { week: 7, type: "short", topic: "DI 개념·계층", question: "Controller → ( ? ) → Repository 에서 가운데 계층은?", answer: "Service", explanation: "Service는 비즈니스 로직을 담당하고 Controller는 Repository를 직접 부르지 않는다." },
  { week: 7, type: "concept", topic: "DI 개념·계층", question: "Service가 Repository를 인터페이스 타입으로 받으면 좋은 점은?", answer: "구현체 교체가 쉬움(Service 코드 수정 불필요)", explanation: "메모리용인지 DB용인지 몰라도 되므로 구현체만 바꾸면 된다." },

  { week: 7, type: "concept", topic: "@Autowired", question: "타입이 맞는 Bean을 찾아 자동으로 주입하는 어노테이션은?", answer: "@Autowired", explanation: "이름이 아니라 타입 기준으로 찾는다." },
  { week: 7, type: "concept", topic: "@Autowired", question: "필드·세터·생성자 주입 중 권장되는 방식은?", answer: "생성자 주입", explanation: "final을 쓸 수 있어 한 번 주입되면 바뀌지 않고 의존 객체 없이는 생성이 안 된다." },
  { week: 7, type: "short", topic: "@Autowired", question: "생성자 주입에서 @Autowired를 생략할 수 있는 조건은?", answer: "생성자가 딱 1개일 때", explanation: "스프링 4.3 이상에서 생성자가 1개뿐이면 생략 가능하다." },
  { week: 7, type: "concept", topic: "@Autowired", question: "필드 주입에서는 쓸 수 없지만 생성자 주입에서는 쓸 수 있어서, 주입된 값이 바뀌지 않게 해주는 키워드는?", answer: "final", explanation: "생성자 주입은 final을 쓸 수 있어 권장되고, 필드 주입은 final 사용이 불가능하다." },

  { week: 7, type: "choice", topic: "같은 타입 Bean 충돌", question: "Pokemon 타입 Bean이 3개인데 `@Autowired private Pokemon pokemon;`으로 주입하면 발생하는 예외는?", options: ["NoUniqueBeanDefinitionException", "NullPointerException", "IllegalArgumentException", "MethodArgumentNotValidException"], answer: "NoUniqueBeanDefinitionException", explanation: "같은 타입 후보가 여러 개라 스프링이 하나를 고르지 못한다." },
  { week: 7, type: "concept", topic: "같은 타입 Bean 충돌", question: "같은 타입 Bean이 여러 개일 때 기본으로 주입될 Bean(구현체)에 붙이는 어노테이션은?", answer: "@Primary", explanation: "@Primary는 구현체에 붙인다." },
  { week: 7, type: "choice", topic: "같은 타입 Bean 충돌", question: "주입받는 쪽에서 Bean 이름으로 특정 Bean을 고르는 어노테이션은?", options: ["@Primary", "@Qualifier", "@Autowired", "@Component"], answer: "@Qualifier", explanation: "`@Qualifier(\"pikachu\")`처럼 대소문자를 정확히 써야 한다." },
  { week: 7, type: "short", topic: "같은 타입 Bean 충돌", question: "@Primary와 @Qualifier가 둘 다 있으면 어느 쪽이 우선인가?", answer: "@Qualifier", explanation: "더 구체적인 지정이 우선한다." },
  { week: 7, type: "short", topic: "같은 타입 Bean 충돌", question: "같은 타입 Bean을 `Map<String, Pokemon>`으로 받으면 key에 들어가는 것은?", answer: "Bean 이름", explanation: "List는 객체만, Map은 Bean 이름(key)과 객체(value)를 받는다." },

  { week: 7, type: "concept", topic: "Bean scope", question: "아무것도 지정하지 않았을 때 Bean의 기본 scope는?", answer: "singleton", explanation: "아무것도 지정하지 않으면 singleton이다." },
  { week: 7, type: "concept", topic: "Bean scope", question: "getBean할 때마다 새 객체를 만드는 scope는?", answer: "prototype", explanation: "손님마다 장바구니가 따로 필요한 경우에 쓴다." },
  { week: 7, type: "short", topic: "Bean scope", question: "`cart` Bean이 prototype일 때 출력 결과는?", code: "ShoppingCart c1 = context.getBean(\"cart\", ShoppingCart.class);\nShoppingCart c2 = context.getBean(\"cart\", ShoppingCart.class);\nSystem.out.println(c1 == c2);", answer: "false", explanation: "prototype은 getBean마다 새 객체를 만든다(singleton이면 true)." },

  { week: 7, type: "choice", topic: "init·destroy", question: "`@Bean(____ = \"...\")`에서 Bean이 소멸될 때 실행할 메서드 이름을 지정하는 속성은?", options: ["initMethod", "destroyMethod", "@PostConstruct", "@PreDestroy"], answer: "destroyMethod", explanation: "생성 후 실행은 initMethod이고, 값은 메서드 이름 문자열이다." },
  { week: 7, type: "short", topic: "init·destroy", question: "destroyMethod가 실행되게 하려면 컨테이너에 호출해야 하는 메서드는?", answer: "close()", explanation: "close()를 하지 않으면 destroy 메서드가 실행되지 않는다." },

  { week: 7, type: "choice", topic: "properties", question: "읽어올 .properties 파일의 경로를 지정하는 어노테이션은?", options: ["@PropertySource", "@Value", "@Configuration", "@ComponentScan"], answer: "@PropertySource", explanation: "경로는 resources 폴더 기준이다." },
  { week: 7, type: "short", topic: "properties", question: "`@Value(\"${bread.price:0}\")`에서 `:` 뒤의 `0`은?", answer: "key가 없을 때 쓰는 기본값", explanation: "콜론 뒤가 기본값이며, 기본값이 없는데 key가 없으면 에러가 난다." },

  { week: 7, type: "choice", topic: "AOP", question: "AOP에서 공통 기능을 적용할 대상 메소드를 고르는 조건은?", options: ["Aspect", "Advice", "JoinPoint", "Pointcut"], answer: "Pointcut", explanation: "`execution(* 패키지.*Service.*(..))`처럼 대상을 지정한다." },
  { week: 7, type: "concept", topic: "AOP", question: "메소드 실행 전후를 감싸고 `proceed()`로 원래 메소드를 실행하는 Advice는?", answer: "@Around", explanation: "매개변수로 JoinPoint가 아닌 ProceedingJoinPoint를 받는다." },
  { week: 7, type: "choice", topic: "AOP", question: "대상 메소드에서 예외가 발생했을 때만 실행되는 Advice는?", options: ["@Before", "@AfterReturning", "@AfterThrowing", "@After"], answer: "@AfterThrowing", explanation: "정상 반환 후에만 실행되는 것은 @AfterReturning이다." },

  { week: 7, type: "concept", topic: "Spring Boot", question: "Spring Boot 시작 클래스에 붙이는 어노테이션은? (@Configuration + @EnableAutoConfiguration + @ComponentScan)", answer: "@SpringBootApplication", explanation: "이 클래스가 있는 패키지와 하위 패키지를 스캔한다." },

  { week: 7, type: "concept", topic: "Request Mapping", question: "반환값을 화면이 아니라 JSON 응답 본문으로 보내는 Controller 어노테이션은?", answer: "@RestController", explanation: "@Controller + @ResponseBody이며, Map·DTO를 반환하면 Jackson이 JSON으로 변환한다." },
  { week: 7, type: "short", topic: "Request Mapping", question: "클래스와 메소드에 아래 어노테이션이 있을 때 처리하는 요청은? (HTTP 메소드 + URL)", code: "@RequestMapping(\"/api/v1/menus\")   // 클래스\n@DeleteMapping(\"/{menuCode}\")      // 메소드", answer: "DELETE /api/v1/menus/{menuCode}", explanation: "메소드 주소는 클래스 주소 뒤에 이어 붙는다." },
  { week: 7, type: "short", topic: "Request Mapping", question: "등록 성공 시 201 응답을 보내도록 빈칸을 채우시오.", code: "return ResponseEntity.status(HttpStatus.______).body(response);", answer: "CREATED", explanation: "ResponseEntity.ok()는 200 OK이다." },

  { week: 7, type: "concept", topic: "Handler Method", question: "`?keyword=coffee&page=1` 같은 Query String 값을 받는 어노테이션은?", answer: "@RequestParam", explanation: "required = false면 없을 때 null, defaultValue면 기본값이 들어간다." },
  { week: 7, type: "choice", topic: "Handler Method", question: "`/api/v1/menus/5`처럼 URL 경로 안의 값을 받는 어노테이션은?", options: ["@RequestParam", "@PathVariable", "@RequestBody", "@RequestHeader"], answer: "@PathVariable", explanation: "경로의 `{menuCode}` 이름과 매개변수를 연결한다." },
  { week: 7, type: "concept", topic: "Handler Method", question: "요청 본문의 JSON을 DTO 객체로 바꿔서 받는 어노테이션은?", answer: "@RequestBody", explanation: "JSON 키 이름과 DTO 프로퍼티 이름이 같아야 하고 기본 생성자가 필요하다." },

  { week: 7, type: "concept", topic: "Jackson", question: "Java 객체를 JSON으로 바꾸는 것은?", answer: "직렬화", explanation: "반대로 JSON을 Java 객체로 바꾸는 것은 역직렬화이다." },
  { week: 7, type: "concept", topic: "Jackson", question: "Java 필드 `no`를 JSON 키 `memberNo`로 주고받게 하는 어노테이션은?", answer: "@JsonProperty", explanation: "`@JsonProperty(\"memberNo\")`는 직렬화·역직렬화 모두에 적용된다." },

  { week: 7, type: "choice", topic: "Exception Handler", question: "모든 Controller의 예외를 한 곳에서 처리하는 클래스 어노테이션은?", options: ["@RestController", "@RestControllerAdvice", "@ExceptionHandler", "@Valid"], answer: "@RestControllerAdvice", explanation: "메소드에는 @ExceptionHandler(예외.class)를 붙여 예외 타입별로 처리한다." },
  { week: 7, type: "concept", topic: "Exception Handler", question: "@RequestBody DTO 앞에 붙여 @NotBlank, @Min 검증을 실행하는 어노테이션은?", answer: "@Valid", explanation: "검증에 실패하면 MethodArgumentNotValidException이 발생한다." },
  { week: 7, type: "short", topic: "Exception Handler", question: "없는 회원을 조회했을 때 응답할 HTTP 상태 코드는?", answer: "404", explanation: "대상이 없는 것은 서버 오류(500)가 아니라 404 Not Found이다." },

  /* ===================== 8주차 (JPA chap00~05) ===================== */
  { week: 8, type: "concept", topic: "JPA 개요", question: "객체와 관계형 DB 테이블을 매핑해서, 개발자 대신 SQL을 만들어 실행해 주는 기술은?", answer: "ORM(Object-Relational Mapping)", explanation: "JPA는 Java의 ORM 표준이다." },
  { week: 8, type: "choice", topic: "JPA 개요", question: "Java ORM의 표준 명세(인터페이스 모음)로, 코드에서 `jakarta.persistence` 패키지로 import하는 것은?", options: ["JPA", "Hibernate", "JDBC", "MyBatis"], answer: "JPA", explanation: "Hibernate는 JPA를 실제로 구현한 구현체이다." },
  { week: 8, type: "concept", topic: "JPA 개요", question: "객체는 참조와 상속으로, 테이블은 FK와 분리된 테이블로 데이터를 표현하기 때문에 생기는 구조 차이를 부르는 말은?", answer: "패러다임 불일치", explanation: "상속, 연관관계, 객체 그래프 탐색에서 차이가 생긴다." },
  { week: 8, type: "concept", topic: "JPA 개요", question: "JDBC에서 조회 컬럼을 바꾸면 객체에 채워지는 값과 변환 코드까지 모두 고쳐야 하는 문제를 부르는 말은? (SQL ○○적인 개발)", answer: "SQL 의존", explanation: "객체에 무엇이 채워질지를 SQL이 결정해서, 객체만 보고는 믿고 쓸 수 없다." },
  { week: 8, type: "short", topic: "JPA 개요", question: "JDBC로 같은 행(MENU_CODE = 1)을 두 번 조회해 각각 `new Menu()`에 담았다. 출력 결과는?", code: "System.out.println(menu1 == menu2);", answer: "false", explanation: "조회할 때마다 새 객체를 만들기 때문이다. JPA는 같은 영속성 컨텍스트 안에서 같은 객체를 돌려준다." },

  { week: 8, type: "choice", topic: "EntityManager", question: "생성 비용이 커서 애플리케이션에 하나만 만들어 공유하는 객체는?", options: ["EntityManager", "EntityManagerFactory", "EntityTransaction", "Persistence"], answer: "EntityManagerFactory", explanation: "EntityManager는 작업마다 새로 만들고 스레드끼리 공유하지 않는다." },
  { week: 8, type: "short", topic: "EntityManager", question: "persistence.xml의 `<persistence-unit name=\"jpatest\">`로 팩토리를 만들도록 빈칸을 채우시오.", code: "EntityManagerFactory factory = Persistence.______(\"jpatest\");", answer: "createEntityManagerFactory", explanation: "EntityManager는 `factory.createEntityManager()`로 만든다." },
  { week: 8, type: "concept", topic: "EntityManager", question: "EntityManager가 엔티티를 보관하고 관리하는 논리적인 공간으로, 1차 캐시와 변경 감지가 일어나는 곳은?", answer: "영속성 컨텍스트", explanation: "EntityManager마다 자기 영속성 컨텍스트를 가진다." },
  { week: 8, type: "short", topic: "EntityManager", question: "같은 EntityManager로 같은 PK를 두 번 조회했다. 출력 결과는?", code: "Menu menu1 = entityManager.find(Menu.class, 3);\nMenu menu2 = entityManager.find(Menu.class, 3);\nSystem.out.println(menu1 == menu2);", answer: "true", explanation: "두 번째는 1차 캐시에서 꺼내므로 SELECT는 1번만 나가고 같은 객체가 반환된다." },
  { week: 8, type: "concept", topic: "EntityManager", question: "영속 엔티티의 값을 바꾸면 flush 때 처음 스냅샷과 비교해 UPDATE SQL을 자동으로 만들어 주는 기능은?", answer: "변경 감지(dirty checking)", explanation: "그래서 JPA에는 update 메소드가 따로 없다." },
  { week: 8, type: "choice", topic: "EntityManager", question: "영속성 컨텍스트에 쌓인 변경 내용을 SQL로 DB에 보내지만, 트랜잭션을 확정하지는 않는 메소드는?", options: ["commit()", "flush()", "clear()", "close()"], answer: "flush()", explanation: "flush 후에도 rollback하면 되돌릴 수 있다. commit은 flush + 확정이다." },

  { week: 8, type: "choice", topic: "엔티티 생명주기", question: "`new Menu(...)`로 만들었고 persist나 find를 거친 적이 없는 객체의 상태는?", options: ["비영속", "영속", "준영속", "삭제"], answer: "비영속", explanation: "PK와 값이 DB 행과 같아도 JPA가 관리하지 않으면 비영속이다." },
  { week: 8, type: "choice", topic: "엔티티 생명주기", question: "영속 상태였다가 detach()나 clear()로 영속성 컨텍스트에서 분리된 상태는?", options: ["비영속", "영속", "준영속", "삭제"], answer: "준영속", explanation: "식별자는 있지만 관리되지 않아 변경 감지가 동작하지 않는다." },
  { week: 8, type: "short", topic: "엔티티 생명주기", question: "아래 코드에서 flush() 때 UPDATE SQL이 실행되는가? (실행됨 / 실행 안 됨)", code: "Menu foundMenu = entityManager.find(Menu.class, 10);\nentityManager.detach(foundMenu);\nfoundMenu.setMenuPrice(foundMenu.getMenuPrice() + 1000);\nentityManager.flush();", answer: "실행 안 됨", explanation: "detach로 준영속이 되어 변경 감지 대상이 아니다." },
  { week: 8, type: "short", topic: "엔티티 생명주기", question: "준영속 객체 detachedMenu를 merge했다. 출력 결과는?", code: "Menu mergedMenu = entityManager.merge(detachedMenu);\nSystem.out.println(entityManager.contains(detachedMenu) + \" \" + entityManager.contains(mergedMenu));", answer: "false true", explanation: "merge는 넘긴 객체가 아니라 값을 복사한 영속 객체를 반환한다. 이후에는 반환값을 써야 한다." },

  { week: 8, type: "concept", topic: "엔티티 매핑", question: "PK 값 생성을 DB의 AUTO_INCREMENT에 맡기는 `@GeneratedValue`의 strategy 값은?", answer: "GenerationType.IDENTITY", explanation: "INSERT를 해야 PK를 알 수 있어서 persist 시점에 바로 INSERT가 실행된다." },
  { week: 8, type: "choice", topic: "엔티티 매핑", question: "enum 순서가 바뀌어도 DB 값의 의미가 유지되도록, enum을 이름(ROLE_MEMBER)으로 저장하는 설정은?", options: ["@Enumerated(EnumType.ORDINAL)", "@Enumerated(EnumType.STRING)", "@Column(name = \"member_role\")", "@Embedded"], answer: "@Enumerated(EnumType.STRING)", explanation: "기본값 ORDINAL은 순서 번호(0, 1)로 저장해서 enum 순서를 바꾸면 의미가 바뀐다." },
  { week: 8, type: "short", topic: "엔티티 매핑", question: "JPA가 조회 결과로 엔티티 객체를 만들 때 필요한 생성자와, 수업 코드에서 외부 사용을 막으려고 붙인 접근 제어자는?", answer: "기본 생성자, protected", explanation: "예: `protected Member() {}` — public이면 아무 데서나 빈 객체를 만들 수 있다." },
  { week: 8, type: "choice", topic: "엔티티 매핑", question: "애플리케이션 시작 시 기존 테이블을 DROP하고 엔티티 기준으로 다시 CREATE하는 `ddl-auto` 값은?", options: ["none", "validate", "update", "create"], answer: "create", explanation: "기존 데이터가 사라지므로 실제 데이터가 있는 DB에는 쓰지 않는다. chap03부터는 none을 사용했다." },
  { week: 8, type: "concept", topic: "엔티티 매핑", question: "별도 테이블 없이 엔티티 안에 포함되어 같은 테이블의 컬럼으로 저장되는 값 객체(Price) 클래스에 붙이는 어노테이션은?", answer: "@Embeddable", explanation: "그 값 객체를 쓰는 엔티티 필드에는 @Embedded를 붙인다." },
  { week: 8, type: "short", topic: "엔티티 매핑", question: "`new Price(43000, 0.1)`의 sellPrice 값은?", code: "private int calculateSellPrice(int regularPrice, double discountRate) {\n    return (int) (regularPrice - (regularPrice * discountRate));\n}", answer: "38700", explanation: "43000 - 4300 = 38700. 할인율이 0~1 밖이면 생성자에서 IllegalArgumentException이 발생한다." },
  { week: 8, type: "concept", topic: "엔티티 매핑", question: "Spring이 현재 트랜잭션에 맞는 EntityManager를 Repository 필드에 주입하도록 붙이는 어노테이션은?", answer: "@PersistenceContext", explanation: "Spring을 쓰면 트랜잭션 begin/commit도 @Transactional이 대신한다." },

  { week: 8, type: "short", topic: "연관관계 매핑", question: "Menu가 tbl_menu의 FK 컬럼으로 Category와 연결되도록 빈칸을 채우시오.", code: "@ManyToOne(fetch = FetchType.LAZY)\n@JoinColumn(name = \"______\")\nprivate Category category;", answer: "category_code", explanation: "@ManyToOne의 @JoinColumn name은 내 테이블(tbl_menu)의 FK 컬럼 이름이다." },
  { week: 8, type: "choice", topic: "연관관계 매핑", question: "Menu(@ManyToOne)와 Category(@OneToMany) 양방향 매핑에서 FK 값을 등록·수정하는 연관관계의 주인은?", options: ["Category (@OneToMany 쪽)", "Menu (@ManyToOne 쪽)", "둘 다", "먼저 조회한 쪽"], answer: "Menu (@ManyToOne 쪽)", explanation: "주인은 FK를 가진 테이블(tbl_menu)과 매핑된 쪽이다." },
  { week: 8, type: "choice", topic: "연관관계 매핑", question: "Menu에 `private Category category;`가 @ManyToOne으로 매핑되어 있다. Category의 `@OneToMany(mappedBy = \"____\")`에 들어갈 값은?", options: ["category_code", "category", "tbl_menu", "menuList"], answer: "category", explanation: "mappedBy에는 DB 컬럼명이 아니라 반대편 엔티티의 연관관계 필드명을 쓴다." },
  { week: 8, type: "choice", topic: "연관관계 매핑", question: "양방향 매핑에서 연관관계의 주인이 아닌 쪽(FK를 관리하지 않고 조회만 하는 쪽)에 쓰는 것은?", options: ["@JoinColumn(name = \"category_code\")", "@OneToMany(mappedBy = \"category\")", "@ManyToOne(fetch = FetchType.LAZY)", "@Column(name = \"category_code\")"], answer: "@OneToMany(mappedBy = \"category\")", explanation: "@JoinColumn은 FK를 관리하는 주인 쪽에 쓴다." },
  { week: 8, type: "choice", topic: "연관관계 매핑", question: "fetch를 지정하지 않았을 때의 기본 fetch 전략으로 맞는 것은?", options: ["@ManyToOne = EAGER, @OneToMany = LAZY", "@ManyToOne = LAZY, @OneToMany = EAGER", "둘 다 LAZY", "둘 다 EAGER"], answer: "@ManyToOne = EAGER, @OneToMany = LAZY", explanation: "수업 코드는 @ManyToOne에 fetch = FetchType.LAZY를 직접 지정했다." },
  { week: 8, type: "concept", topic: "연관관계 매핑", question: "양방향에서 `menuList.add(menu)`와 `menu.setCategory(this)`를 한 메소드에서 같이 처리해 양쪽 객체 상태를 맞추는 메소드는?", answer: "연관관계 편의 메소드", explanation: "주인 쪽(menu.setCategory)만 FK에 반영되지만, 메모리의 양쪽 객체도 맞춰 두기 위해 쓴다." },
  { week: 8, type: "short", topic: "연관관계 매핑", question: "양방향 엔티티 Menu와 Category의 toString()이 서로 상대를 출력하면 발생하는 에러는?", answer: "StackOverflowError", explanation: "Menu → Category → Menu ... 무한 호출이 된다. 그래서 Category의 toString에서 menuList를 뺐다." },
  { week: 8, type: "short", topic: "연관관계 매핑", question: "1:N 단방향 Category에 붙인 `@JoinColumn(name = \"category_code\", insertable = false, updatable = false)`에서 insertable/updatable = false의 의미는?", answer: "Category 쪽에서는 FK 값을 넣거나 바꾸지 않고 조회만 한다", explanation: "같은 category_code 컬럼을 Menu의 categoryCode 필드가 이미 관리한다." },

  { week: 8, type: "short", topic: "Spring Data JPA CRUD", question: "Menu의 @Id 필드가 `private int menuCode;`일 때 빈칸에 들어갈 타입은?", code: "public interface MenuRepository extends JpaRepository<Menu, ______> {\n}", answer: "Integer", explanation: "두 번째 제네릭은 엔티티 @Id 필드의 타입이고, 제네릭에는 기본형을 쓸 수 없다." },
  { week: 8, type: "short", topic: "Spring Data JPA CRUD", question: "`menuRepository.findById(menuCode)`의 반환 타입은?", answer: "Optional<Menu>", explanation: "없을 수도 있어서 Optional이다. `.orElseThrow(() -> new ResourceNotFoundException(...))`로 꺼낸다." },
  { week: 8, type: "short", topic: "Spring Data JPA CRUD", question: "아래 @Transactional 메소드가 끝나고 커밋될 때 실행되는 SQL 종류는?", code: "@Transactional\npublic MenuResponse updateMenu(int menuCode, MenuRequest request) {\n    Menu menu = findMenuEntity(menuCode);   // findById\n    menu.update(request.getMenuName(), request.getMenuPrice(), category, request.getOrderableStatus());\n    return toResponse(menu);                // save() 호출 없음\n}", answer: "UPDATE", explanation: "findById로 꺼낸 영속 엔티티를 바꿨기 때문에 커밋 직전 flush에서 변경 감지가 UPDATE를 만든다." },
  { week: 8, type: "choice", topic: "Spring Data JPA CRUD", question: "조회 메소드에 붙여 flush와 변경 감지(스냅샷 비교)를 하지 않게 하는 설정은?", options: ["@Transactional", "@Transactional(readOnly = true)", "@Commit", "@PersistenceContext"], answer: "@Transactional(readOnly = true)", explanation: "데이터를 바꾸는 등록·수정·삭제에는 그냥 @Transactional을 쓴다." },
  { week: 8, type: "short", topic: "Spring Data JPA CRUD", question: "`@Transactional(readOnly = true)` 메소드 안에서 영속 엔티티의 값을 바꾸면 DB에 반영되는가? (반영됨 / 반영 안 됨)", answer: "반영 안 됨", explanation: "readOnly에서는 flush를 하지 않아 UPDATE가 나가지 않는다. 에러도 나지 않아서 찾기 힘든 버그가 된다." },
  { week: 8, type: "short", topic: "Spring Data JPA CRUD", question: "`open-in-view: false`일 때, Service 트랜잭션이 끝난 뒤 Controller에서 LAZY 연관 객체의 `getCategoryName()`을 호출하면 발생하는 예외는?", answer: "LazyInitializationException", explanation: "영속성 컨텍스트가 닫혀 LAZY 로딩을 못 한다. 그래서 Service 안에서 DTO로 변환한다." },
  { week: 8, type: "concept", topic: "Spring Data JPA CRUD", question: "메뉴나 카테고리를 찾지 못했을 때 Service에서 던지고, GlobalExceptionHandler가 404 응답으로 바꾸는 사용자 정의 예외는?", answer: "ResourceNotFoundException", explanation: "RuntimeException을 상속하고, Handler는 `new ErrorResponse(exception.getMessage())`를 본문으로 보낸다." },
  { week: 8, type: "short", topic: "Spring Data JPA CRUD", question: "삭제 성공 시 본문 없이 204 응답을 보내도록 빈칸을 채우시오.", code: "return ResponseEntity.______().build();", answer: "noContent", explanation: "본문이 없으니 반환 타입은 ResponseEntity<Void>이다." },

  { week: 8, type: "short", topic: "쿼리 메소드·JPQL", question: "아래 쿼리 메소드를 `(20000)`으로 호출할 때 만들어지는 WHERE 조건은?", code: "List<Menu> findByMenuPriceGreaterThanEqualOrderByMenuPriceDesc(int minPrice);", answer: "menuPrice >= 20000", explanation: "GreaterThanEqual은 >=, 결과는 OrderByMenuPriceDesc로 가격 내림차순이다." },
  { week: 8, type: "choice", topic: "쿼리 메소드·JPQL", question: "`findByMenuNameContaining`처럼 메소드 이름 규칙만으로 쿼리를 만들어 주는 방법은?", options: ["쿼리 메소드", "JPQL", "Native Query", "JOIN FETCH"], answer: "쿼리 메소드", explanation: "이름 속 MenuName은 컬럼이 아니라 엔티티 필드 menuName이다." },
  { week: 8, type: "choice", topic: "쿼리 메소드·JPQL", question: "테이블과 컬럼이 아니라 엔티티와 필드를 대상으로, @Query에 직접 작성하는 JPA 쿼리 언어는?", options: ["쿼리 메소드", "JPQL", "Native Query", "JDBC SQL"], answer: "JPQL", explanation: "실행할 때 Hibernate가 매핑 정보를 보고 실제 SQL로 바꾼다." },
  { week: 8, type: "short", topic: "쿼리 메소드·JPQL", question: "엔티티 클래스 `Menu`가 `@Table(name = \"tbl_menu\")`에 매핑되어 있다. JPQL 빈칸에 들어갈 것은?", code: "@Query(\"SELECT m FROM ______ m WHERE m.menuName LIKE CONCAT('%', :keyword, '%')\")", answer: "Menu", explanation: "JPQL의 FROM에는 테이블 이름이 아니라 엔티티 이름을 쓴다." },
  { week: 8, type: "short", topic: "쿼리 메소드·JPQL", question: "JPQL의 `:keyword`에 매개변수 값이 바인딩되도록 빈칸을 채우시오.", code: "List<Menu> searchByMenuName(______(\"keyword\") String keyword);", answer: "@Param", explanation: "`:keyword`와 @Param(\"keyword\")의 이름이 같아야 한다." },

  { week: 8, type: "concept", topic: "페이징·fetch join", question: "요청에 page/size/sort가 없을 때 Pageable의 기본값(size = 5, sort = \"menuCode\")을 지정하는 어노테이션은?", answer: "@PageableDefault", explanation: "요청 예: `?page=0&size=5&sort=menuCode,asc` — page는 0부터 시작한다." },
  { week: 8, type: "choice", topic: "페이징·fetch join", question: "`Page<Menu>`의 페이지 번호·전체 건수는 유지하면서 content만 MenuResponse로 바꿔 `Page<MenuResponse>`를 얻는 코드는?", options: ["page.map(this::toResponse)", "page.stream().map(this::toResponse).toList()", "page.getContent()", "PageResponse.from(page)"], answer: "page.map(this::toResponse)", explanation: "stream().map().toList()는 결과가 List라 페이지 정보가 사라진다." },
  { week: 8, type: "concept", topic: "페이징·fetch join", question: "메뉴 목록을 1번 조회한 뒤, 각 메뉴의 LAZY 카테고리를 꺼낼 때마다 SELECT가 추가로 실행되는 문제는?", answer: "N+1 문제", explanation: "목록 1번 + 연관 객체 조회 N번이 실행된다." },
  { week: 8, type: "short", topic: "페이징·fetch join", question: "메뉴와 카테고리를 SELECT 한 번으로 함께 로딩하도록 빈칸을 채우시오.", code: "@Query(\"SELECT m FROM Menu m ______ m.category\")", answer: "JOIN FETCH", explanation: "일반 JOIN은 조인만 하고 category는 여전히 LAZY로 남는다." },
  { week: 8, type: "short", topic: "페이징·fetch join", question: "`JOIN FETCH`를 쓰는 페이징 @Query에서 `countQuery = \"SELECT COUNT(m) FROM Menu m\"`를 따로 지정하는 이유는?", answer: "count 쿼리에는 fetch join을 쓸 수 없고, 개수를 세는 데 조인이 필요 없어서", explanation: "Page를 반환하면 내용 조회 + 전체 건수 조회 SQL 2번이 실행된다." }
];
