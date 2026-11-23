# AI Agent 01 - 파이썬 기초 · GPT 원리 · 프롬프트 복습

## 0. 오늘의 큰 그림
- 파이썬 기초 문법 → JSON 주고받기 → LLM 응답 검사 → 벡터·유사도
- GPT 처리 흐름: 텍스트 → **토큰화** → **임베딩** → **어텐션** → **다음 토큰 예측** → 반복
- 프롬프트는 길게가 아니라 **필요한 조건을 분명하게** (R-C-I-O)
- 환경: conda `pystudy_env` + `pip install openai python-dotenv`

---

## 1) 변수 · 리스트 · 딕셔너리

    name = '새싹'
    print(f'팀 이름: {name}')        # f-string: {} 안에 변수

    scores = [88, 90, 67]
    scores.append(100)               # 맨 뒤에 추가
    scores.insert(2, 75)             # 2번 위치에 끼워 넣기
    last = scores.pop()              # 맨 뒤 꺼내고 제거

    user = {'name': '홍길동', 'age': 30}
    user['job'] = '의적'              # 없으면 추가, 있으면 덮어쓰기
    user.get('email', '정보 없음')    # 없는 키도 에러 없이 기본값

- `user['email']`처럼 없는 키를 바로 꺼내면 **KeyError** → 안전하게는 `get(키, 기본값)`
- 리스트 안에 딕셔너리: `users[1]['name']`

## 2) 문자열 · 제어문

    text = "Hello, World!"
    text[:5]     # Hello  (끝 인덱스는 포함 안 됨)
    text[5:]     # , World!

    if score >= 90:
        grade = 'A'
    elif score >= 80:
        grade = 'B'
    else:
        grade = 'C'

    for food in foods:
        print(food)

- 중괄호 대신 **콜론 + 들여쓰기**로 블록 구분
- `input().strip()` → 양쪽 공백·줄바꿈 제거 (Java의 `trim()`)

## 3) 리스트 컴프리헨션

    # for + if + append 를 한 줄로
    [f.upper() for f in fruits if len(f) >= 5]

- 읽는 순서: **무엇을 담을지** → for → if

## 4) 함수 · 타입 힌트

    def create_greeting(name: str, age: int) -> str:
        return f"Hello, {name}! You are {age}."

    create_greeting(age=45, name="Charlie")   # 키워드 인자는 순서 상관없음

- 타입 힌트는 **설명용**, 틀려도 실행은 됨 (Java처럼 컴파일 에러 X)

## 5) JSON · 예외 처리

    json.dumps(data, ensure_ascii=False)   # dict → JSON 문자열 (한글 그대로)
    json.loads(text)                       # JSON 문자열 → dict

    try:
        json.loads(broken)
    except json.JSONDecodeError as e:
        print("JSON 아님:", e)

- `dumps` / `loads` = 문자열(s) · `dump` / `load` = 파일

## 6) LLM 응답 다루기

    def parse_response(reply):
        payload = json.loads(reply)                  # 1. JSON인지
        if "items" not in payload:                   # 2. 최상위 키
            raise ValueError("items 없음")
        for item in payload["items"]:                # 3. 필수 키
            if not all(k in item for k in ["id", "sentiment", "score", "key_reason"]):
                raise ValueError(f"필드 누락: {item}")
        return payload["items"]

- **LLM 응답은 믿지 말고 검사**: 잘린 JSON(JSONDecodeError), 키 누락(ValueError)
- `if __name__ == "__main__":` → 직접 실행할 때만 `main()` 실행

## 7) 벡터 · 코사인 유사도

    [1, 2] + [3, 4]                     # [1, 2, 3, 4]  리스트는 이어붙이기
    np.array([1, 2]) + np.array([3, 4]) # [4 6]  같은 위치끼리 계산

    def cosine_similarity(a, b):
        return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

- 벡터 = 같은 기준·순서로 나열한 숫자 (예: 액션, 스릴러, 코미디, 감동)
- 코사인 유사도: **방향이 비슷할수록 1에 가까움**

---

## 8) GPT는 글을 어떻게 처리할까

| 단계 | 하는 일 | 예시 |
|---|---|---|
| 토큰화 | 문장을 조각(토큰)으로 나눔. 도구 = 토크나이저 | 나 / 는 / 사과 / 를 / 먹 / 었다 (설명용) |
| 임베딩 | 토큰 → 숫자 벡터. 뜻이 비슷하면 가까운 좌표 | 사과·바나나 가깝고, 자동차는 멂 |
| 어텐션 | 다른 토큰을 얼마나 참고할지 비중 계산 | "그는" → '철수'에 높은 가중치 |
| 다음 토큰 예측 | 다음 토큰의 확률을 계산해 하나씩 선택 | "대한민국의 수도는" → 서울 |

- 단어보다 잘게 자르는 이유: 모든 단어·변형을 다 등록할 수 없어서 자주 나오는 조각을 조합
- 실제 분할은 토크나이저마다 다름
- GPT = **G**enerative **P**re-trained **T**ransformer, 어텐션이 트랜스포머의 핵심
- **자연스러운 답 ≠ 사실** → 환각(Hallucination)

## 9) 대화 기억의 원리

    system = {"role": "system", "content": "너는 친절한 튜터야."}
    history.append({"role": "user", "content": user_input})
    messages = [system] + history[-10:]   # system은 항상 맨 앞, 최근 10개만

- 모델은 이전 대화를 기억 못 함 → 프로그램이 `history`를 쌓아 **매번 통째로** 보냄
- 길어지면 비용·속도·집중도 문제 → 최근 N개만, 또는 앞부분 요약(압축)
- `system`은 history와 따로 둬야 잘라도 안 지워짐

---

## 10) 프롬프트 엔지니어링

**R-C-I-O 공식**

| 요소 | 뜻 | 예시 (번역) |
|---|---|---|
| Role | 역할 | 10년 차 IT 기술 번역가 |
| Context | 배경 | 한국 대학생 대상 기술 블로그 |
| Instruction | 핵심 지시 | 전문 용어는 음차 또는 괄호 병기 |
| Output | 출력 형식 | 원문 한 줄 + 번역 한 줄, 번호 목록 |

    ❌ FastAPI에 대해 알려줘.
    ⭕ Python 기초를 배운 Java·Spring 개발자에게      ← 대상
       FastAPI가 어떤 도구인지 설명해 주세요.          ← 지시
       Spring과 비교하는 비유를 포함하고,               ← 조건
       다섯 문장 이내로 작성해 주세요.                   ← 형식

**핵심 원칙 3가지**
1. 구체적으로 - 대상, 분량, 난이도, 예시, 제약
2. 구분자로 나누기 - 지시와 데이터를 `<document>`, `"""`, `###`로 구분
3. 조건과 근거 요청 - 결론 + 짧은 근거

**기법 정리**

| 기법 | 한 줄 설명 | 언제 |
|---|---|---|
| Zero-shot | 예시 없이 규칙만 | 간단한 작업 |
| Few-shot | 입력·출력 예시를 함께 | 분류 기준·말투 (실습: ADMIN / LEARNING) |
| Chain-of-Thought | 단계별로 풀게 한 뒤 답 | 계산·추론 (세차장 문제) |
| 구분자 | 지시와 데이터 분리 | 번역·요약할 본문이 있을 때 |
| JSON 출력 | 스키마 주고 JSON만 | API 응답 (받은 뒤 파싱·검사 필수) |
| ReAct | Thought → Action → Observation 반복 | 도구 쓰는 에이전트 |

**프롬프트 vs 파인튜닝**

| | 프롬프트 | 파인튜닝 |
|---|---|---|
| 방법 | 지시문 설계 | 데이터로 추가 학습 → 가중치 변경 |
| 반영 | 즉시 | 수시간 ~ 수일 |
| 비용 | 거의 없음 | 데이터 + GPU |
| 한계 | 길어지면 비용·속도 ↑ | 새 정보마다 재학습 |

- 순서: **프롬프트 → RAG → 그래도 안 되면 파인튜닝**

---

## 자주 헷갈리는 부분
- `dumps` vs `dump` : s = 문자열, 없으면 파일
- 리스트 `+` vs NumPy `+` : 이어붙이기 vs 위치별 계산
- 슬라이싱 `[0:5]` : 5번은 포함 안 됨
- 빈 문자열 `""` : 파이썬은 false, Java는 `isBlank()`로 직접 확인
- "단계별로 생각해" 한 줄이 만능은 아님 → 실제 응답을 비교해서 확인
- Few-shot 예시 개수에 정답 없음 → 넣었을 때 결과가 나아지는지 확인

## 암기
- 토큰화 → 임베딩 → 어텐션 → 다음 토큰 예측
- R-C-I-O (역할 · 배경 · 지시 · 출력)
- 메시지 = `{"role": ..., "content": ...}` 리스트, `[system] + history`
- 코사인 유사도 = 내적 / (길이 × 길이)

## 전체 흐름 정리
파이썬으로 리스트·딕셔너리를 만들고 JSON으로 바꿔 모델에 보낸다. 모델은 글을 토큰으로 자르고, 벡터로 바꾸고, 어텐션으로 문맥을 반영해 다음 토큰을 하나씩 예측해 답을 만든다. 그래서 답이 그럴듯해도 틀릴 수 있고, 이전 대화도 기억 못 한다. 원하는 결과를 얻으려면 R-C-I-O로 조건을 분명히 주고, 받은 JSON은 파싱·검사까지 해야 한다.
