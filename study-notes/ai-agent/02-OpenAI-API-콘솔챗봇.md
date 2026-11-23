# AI Agent 02 - OpenAI API로 콘솔 챗봇 만들기 복습

## 0. 오늘의 큰 그림
- `.env`에서 API 키 읽기 → OpenAI client 만들기 → 질문 입력 → API 호출 → 답 출력 → 이력 쌓기
- 모델은 이전 대화를 기억 못 함 → **프로그램이 history를 쌓아서 매번 통째로 보냄**
- 함수 두 개로 역할 분리
  - `chat_loop` : 입력 받기 · 이력 관리 · 출력 (대화 진행 담당)
  - `request_reply` : API 한 번 호출하고 답 문자열 돌려주기 (통신 담당)

---

## 1) 키 준비 - .env + load_dotenv

    # .env (따옴표·공백 없이)
    OPENAI_API_KEY=sk-...

    load_dotenv()                              # .env 내용을 환경 변수로 올림
    if not os.getenv("OPENAI_API_KEY"):
        raise ValueError("환경 변수 OPENAI_API_KEY를 설정하세요.")

- 키를 코드에 직접 쓰지 않는 이유: 코드는 GitHub에 올라가도 `.env`는 `.gitignore`로 막을 수 있음
- `OpenAI()`는 환경 변수 `OPENAI_API_KEY`를 **알아서** 찾아 씀

## 2) 메시지 구조 - role + content

    system = {"role": "system", "content": "You are a helpful assistant."}
    user   = {"role": "user", "content": question}
    # 답을 받으면
    {"role": "assistant", "content": reply}

| role | 뜻 |
|---|---|
| system | AI의 역할·규칙 (항상 맨 앞) |
| user | 사람이 한 말 |
| assistant | AI가 한 답 |

## 3) chat_loop - 대화 진행 + 이력 쌓기

    def chat_loop(reply_fn, client):
        history = []
        while True:
            try:
                question = input("You: ").strip()
            except (EOFError, KeyboardInterrupt):    # Ctrl+Z / Ctrl+C → 조용히 종료
                break
            if question.lower() in ("exit", "quit"):
                break
            if not question:                         # 빈 문자열은 False → 다시 입력
                continue

            user = {"role": "user", "content": question}
            message = [system] + history + [user]    # 규칙 + 지난 대화 + 새 질문
            try:
                reply = reply_fn(client, message)
            except (APIError, ValueError) as e:      # 실패해도 프로그램은 유지
                print("오류:", e)
                continue
            print("Bot:", reply)
            history = (history + [user, {"role": "assistant", "content": reply}])[-10:]

- `system`은 history에 안 넣고 **매번 앞에 붙임** → 이력을 잘라도 규칙은 안 사라짐
- `[-10:]` = 최근 10개만 (짝수라서 user·assistant 짝 유지)
- 오류 나면 `continue` → 실패한 질문은 history에 안 쌓임
- history는 지역 변수 → 프로그램 끄면 기억도 사라짐

## 4) request_reply - API 호출

    def request_reply(client, message):
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=message,
            temperature=0.7,     # 답의 다양성 (0 = 거의 같은 답, 높을수록 다양)
            max_tokens=500,      # 한 답변 길이 상한
        )
        choice = response.choices[0]
        reply = (choice.message.content or "").strip()
        if choice.finish_reason != "stop" or not reply:
            raise ValueError("답변이 중간에 끊겼습니다.")
        return reply

- `finish_reason == "stop"` = 정상 종료, `"length"` = max_tokens에 걸려 잘림
- `content`가 None일 수 있어서 `or ""`로 빈 문자열 처리 후 strip

## 5) main - client 열고 닫기

    def main():
        load_dotenv()
        ...
        with OpenAI(timeout=20.0) as client:   # with 끝나면 연결 자동 정리
            chat_loop(request_reply, client)

    if __name__ == "__main__":
        main()

## 6) 함수를 값으로 넘기기 - reply_fn

    chat_loop(request_reply, client)                          # 진짜 API
    chat_loop(lambda c, m: sample_reply(m), client)           # 가짜 답변 (비용 0, 테스트용)

- `fn` = function. `reply_fn` = 답을 만드는 **함수를 담은 변수**
- `request_reply` (괄호 X) = 함수 자체를 넘김 / `request_reply()` = 실행 결과
- chat_loop는 어떤 함수가 오든 똑같이 동작 → 진짜·가짜를 바꿔 끼우기 쉬움
- 이름은 `reply_to`(답장 대상)보다 `reply_fn`, `get_reply`처럼 함수임이 드러나게

---

## 자주 나는 오류

| 메시지 | 원인 |
|---|---|
| `OPENAI_API_KEY를 설정하세요` | .env 못 찾음 / 키 이름 오타 |
| 401 invalid_api_key | 키가 틀림 |
| 429 insufficient_quota | API 크레딧 없음 (ChatGPT 구독과 별개) |
| ModuleNotFoundError | conda 환경 활성화 안 됨 |
| `IF`, `Break` 에러 | 파이썬 키워드는 전부 소문자 |
| Import "numpy" could not be resolved | 패키지 미설치 or VS Code 인터프리터가 다른 환경 |

## 자주 헷갈리는 부분
- `return`이 먼저 나오면 아래 코드는 실행 안 됨 (중간에 return 넣었다가 choice 미정의 에러)
- try는 **에러 날 수 있는 줄 바로 위**에: `input()`도 Ctrl+C로 예외가 남
- 매개변수 개수와 호출 개수가 다르면 TypeError (`def chat_loop()`에 인자 2개 넘김)

## 보안 메모
- 키 유출 → 봇이 몇 분 만에 긁어 감 → API 되팔기·스팸 생성에 쓰이고 **요금은 내가 냄**
- OpenAI 대시보드에서 월 사용 한도 걸기, 유출 의심되면 키 삭제 후 재발급
- TIL에서는 `/ai/` 폴더를 통째로 `.gitignore` → 실습 코드와 .env는 안 올라감

## 암기
- 메시지 = `[system] + history + [user]`
- 답 꺼내기 = `response.choices[0].message.content`
- 이력 = `(history + [user, assistant])[-10:]`
- 함수 넘길 땐 괄호 없이

## 전체 흐름 정리
`.env`의 키로 OpenAI client를 만들고, `chat_loop`가 질문을 받아 `[system] + history + [user]`를 `request_reply`에 넘긴다. `request_reply`는 API를 한 번 호출해 답이 정상으로 끝났는지 확인하고 문자열만 돌려준다. 답을 받으면 질문·답 한 쌍을 history에 붙이고 최근 10개만 남긴다. 모델은 기억이 없으니 이 history가 곧 챗봇의 기억이고, 키는 .env로 분리해 절대 올리지 않는다.
