# chap07 - React 연동 (CORS) 복습

## 0. 오늘의 큰 그림
- chap01~06: .http 파일로 API 테스트
- chap07: 실제 프론트(Next.js, localhost:3000)에서 Spring API(localhost:8080)를 호출
- 문제: 포트가 다르면 **다른 출처(origin)** → 브라우저가 응답을 막음 (CORS 에러)
- 해결: Spring에서 "3000번 출처는 허용"한다고 CORS 설정

---

## 1) CORS란
- 출처(origin) = 프로토콜 + 도메인 + 포트
  - http://localhost:3000 과 http://localhost:8080 은 포트가 달라서 다른 출처
- 브라우저는 다른 출처로 보낸 요청의 응답을, 서버가 허용하지 않으면 JS에 넘겨주지 않음
- .http 파일·Postman은 브라우저가 아니라서 CORS 제한이 없음 → 거기선 되는데 브라우저에선 안 되는 이유

---

## 2) Spring - CORS 설정

    @Configuration
    public class WebConfiguration implements WebMvcConfigurer {

        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:3000")
                    .allowedMethods("GET", "POST", "OPTIONS")
                    .allowedHeaders("Content-Type");
        }
    }

- addMapping: CORS를 허용할 API 경로
- allowedOrigins: 허용할 프론트 주소 (포트까지 정확히)
- allowedMethods: 허용할 HTTP 메소드
  - OPTIONS: JSON POST 전에 브라우저가 먼저 보내는 **사전 요청(preflight)**
- allowedHeaders: 요청에 실어도 되는 헤더 (JSON을 보내려면 Content-Type)
- chap06 인터셉터와 같은 WebMvcConfigurer, 메소드만 addCorsMappings

---

## 3) Spring - MenuController

    @GetMapping
    public ResponseEntity<List<MenuResponse>> findAllMenus() {
        return ResponseEntity.ok(menus);
    }

    @PostMapping
    public ResponseEntity<MenuResponse> registMenu(@RequestBody MenuRequest request) {
        MenuResponse createMenu = new MenuResponse(nextCode++, request.getName(), request.getPrice());
        menus.add(createMenu);
        return ResponseEntity.status(HttpStatus.CREATED).body(createMenu);
    }

- 요청 DTO(MenuRequest: name, price)와 응답 DTO(MenuResponse: code, name, price)를 분리
- 등록 후 만들어진 메뉴를 응답 본문으로 돌려줌 → 프론트가 그 값으로 화면 갱신

---

## 4) Next.js - API 주소를 환경 변수로

    // react-client/.env.local
    NEXT_PUBLIC_API_BASE_URL=http://localhost:8080

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

- 브라우저 코드에서 쓰는 환경 변수는 **NEXT_PUBLIC_** 접두사가 있어야 함
- 서버 주소가 바뀌어도 코드 대신 .env.local만 수정

---

## 5) Next.js - 목록 조회 (GET)

    useEffect(() => {
        async function loadMenus() {
            try {
                const response = await fetch(`${API_BASE_URL}/api/v1/menus`);
                if (!response.ok) throw new Error("메뉴를 불러오지 못했습니다.");
                setMenus(await response.json());
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }
        loadMenus();
    }, []);

- 빈 의존성 배열 → 처음 화면에 나타날 때 한 번 조회
- fetch는 404/500이어도 reject되지 않음 → response.ok로 직접 확인
- finally에서 로딩 종료

---

## 6) Next.js - 등록 (POST)

    async function handleSubmit(event) {
        event.preventDefault();                       // form 새로고침 막기
        const response = await fetch(`${API_BASE_URL}/api/v1/menus`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name, price: Number(price) }),
        });
        const createdMenu = await response.json();
        setMenus((currentMenus) => [...currentMenus, createdMenu]);
    }

- body는 JSON.stringify로 문자열, Content-Type은 application/json → Spring의 @RequestBody가 받음
- input 값은 문자열이라 Number(price)로 숫자 변환
- 서버가 돌려준 새 메뉴를 기존 배열 뒤에 붙인 **새 배열**로 상태 갱신
- 목록은 `<li key={menu.code}>`로 렌더링 (응답 DTO의 code)

---

## 헷갈리는 부분
- CORS는 서버가 막는 게 아니라 **브라우저**가 막는 것 → 설정은 서버(Spring)에서 허용 응답을 주는 것
- localhost라도 포트가 다르면 다른 출처
- JSON POST는 preflight(OPTIONS)가 먼저 감 → allowedMethods에 OPTIONS, allowedHeaders에 Content-Type
- allowedOrigins는 끝에 `/` 없이 정확한 주소 (`http://localhost:3000`)
- NEXT_PUBLIC_ 없는 환경 변수는 브라우저 코드에서 undefined
- 응답 필드명(code, name, price)과 프론트에서 꺼내는 이름이 같아야 함

---

## 암기할 것
- 출처 = 프로토콜 + 도메인 + 포트
- WebMvcConfigurer.addCorsMappings(registry)
- addMapping("/api/**").allowedOrigins("http://localhost:3000").allowedMethods(...).allowedHeaders(...)
- NEXT_PUBLIC_API_BASE_URL
- fetch POST = method + headers(Content-Type) + body(JSON.stringify)

---

## 전체 흐름 정리
- Next.js(3000)가 처음 렌더링 후 useEffect에서 Spring(8080)으로 GET 요청
- 다른 출처라 브라우저가 CORS 확인 → Spring의 addCorsMappings가 3000번 출처를 허용
- 응답 JSON을 State에 넣어 목록 렌더링
- 폼 제출 시 JSON POST → 201로 돌아온 새 메뉴를 State 배열에 추가해 화면 갱신
