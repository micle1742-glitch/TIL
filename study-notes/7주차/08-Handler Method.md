# chap02 - Handler Method (요청 값 받기) 복습

## 0. 오늘의 큰 그림
- chap01: 요청을 어떤 메소드로 보낼지 (매핑)
- chap02: 요청에 담긴 값을 핸들러 메소드 매개변수로 어떻게 받을지
- 요청 값 위치별로 어노테이션이 다름

| 값 위치 | 예 | 어노테이션 |
|---|---|---|
| Query String | ?keyword=coffee | @RequestParam |
| URL 경로 | /menus/5 | @PathVariable |
| 요청 본문 | JSON | @RequestBody |
| 헤더 | Content-Type, User-Agent | @RequestHeader |
| 쿠키 | clientId=client-001 | @CookieValue |

---

## 1) @RequestParam - Query String

    @GetMapping
    public ResponseEntity<Map<String, Object>> findMenus(
            @RequestParam(name = "keyword", required = false) String keyword,
            @RequestParam(name = "categoryCode", defaultValue = "0") int categoryCode,
            @RequestParam(name = "page", defaultValue = "1") int page) { ... }

    GET /api/v1/menus?keyword=coffee&categoryCode=2&page=1
    GET /api/v1/menus            → keyword=null, categoryCode=0, page=1

- name: Query String에서 찾을 이름 (생략하면 매개변수명 사용)
- required = false: 없으면 null
- defaultValue: 없으면 기본값 (지정하면 자동으로 required=false)

### Map으로 전부 받기

    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchMenus(
            @RequestParam Map<String, String> parameters) { ... }

    GET /api/v1/menus/search?name=latte&minPrice=3000&maxPrice=6000

- 검색 조건이 많거나 정해지지 않았을 때 사용

---

## 2) @PathVariable - URL 경로

    @GetMapping("/{menuCode}")
    public ResponseEntity<Map<String, Object>> findMenu(@PathVariable("menuCode") int menuCode)

- Query String = 검색·필터·페이지 같은 "옵션"
- PathVariable = 특정 자원 하나를 가리키는 "식별값"

---

## 3) @RequestBody - JSON 본문 → DTO

    @PostMapping
    public ResponseEntity<Map<String, Object>> createMenu(@RequestBody MenuDTO menu) {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("message", "메뉴 등록 요청 성공");
        response.put("menu", menu);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    POST /api/v1/menus
    Content-Type: application/json

    { "name": "아이스 아메리카노", "price": 3000, "categoryCode": 2, "orderableStatus": "Y" }

- JSON 키 이름 = DTO 프로퍼티 이름이어야 값이 들어감
- MenuDTO에 기본 생성자 + setter(또는 getter) 필요 → Jackson이 객체 만들고 값 채움
- 빈 본문 / 잘못된 JSON → 400, 지원 안 하는 Content-Type → 415

### String으로 그대로 받기

    @PostMapping("/raw")
    public ResponseEntity<Map<String, Object>> readRawBody(
            @RequestBody String body,
            @RequestHeader("content-type") String contentType) { ... }

- String 타입이면 변환 없이 본문 원문 그대로 받음 (text/plain 테스트)

---

## 4) @RequestHeader, @CookieValue

    @GetMapping("request-info")
    public ResponseEntity<Map<String, Object>> requestInfo(
            @RequestHeader(value = "user-agent", required = false) String userAgent,
            @RequestHeader Map<String, String> headers,
            @CookieValue(value = "clientId", required = false) String clientId) { ... }

    GET /api/v1/menus/request-info
    User-Agent: IntelliJ HTTP Client
    Cookie: clientId=client-001

- @RequestHeader는 기본 필수 → 없으면 400, 선택이면 required = false
- 헤더 이름은 대소문자 구분 안 함
- Map으로 받으면 헤더 전체

---

## 5) LinkedHashMap을 쓰는 이유

    Map<String, Object> response = new LinkedHashMap<>();
    response.put("keyword", keyword);   // keyword가 null일 수 있음

- Map.of는 null 넣으면 NullPointerException → required=false 값은 LinkedHashMap 사용
- 넣은 순서대로 JSON 키 순서 유지

---

## 헷갈리는 부분
- @RequestParam vs @PathVariable: ?key=값 이냐 /값 이냐
- int 타입 @RequestParam에 required=false만 주고 값이 없으면 null을 int에 못 넣어서 에러 → defaultValue 쓰기
- @RequestBody는 GET이 아니라 POST/PUT처럼 본문 있는 요청에서
- .http 파일에서 헤더와 본문 사이에 **빈 줄 1개** 필수
- @GetMapping("request-info")처럼 / 없이 써도 동작은 함 (통일해서 "/request-info" 권장)

---

## 암기할 것
- Query String → @RequestParam (required, defaultValue)
- 경로 → @PathVariable
- JSON 본문 → @RequestBody DTO (기본 생성자 + 같은 이름)
- 헤더 → @RequestHeader, 쿠키 → @CookieValue
- 등록 성공 201, JSON 오류 400, Content-Type 오류 415

---

## 전체 흐름 정리
- 클라이언트는 값을 Query String, 경로, 본문, 헤더, 쿠키 중 한 곳에 담아 보냄
- Spring은 매개변수 어노테이션을 보고 위치를 찾아 타입 변환 후 주입
- JSON 본문은 Jackson이 DTO로 변환 (자세한 건 chap03)
- 받은 값을 LinkedHashMap 응답에 담아 ResponseEntity로 상태 코드와 함께 반환
