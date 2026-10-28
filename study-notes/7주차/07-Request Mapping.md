# chap01 - Request Mapping 복습

## 0. 오늘의 큰 그림
- chap00: /hello 하나만 연결
- chap01: 어떤 URL + 어떤 HTTP 메소드 요청을 어떤 Java 메소드가 처리할지 연결하는 법
- 핸들러 메소드: HTTP 요청과 연결되어 실제로 실행되는 Controller 메소드

---

## 1) @RestController

- @Controller + @ResponseBody
- 화면(View)을 반환하지 않고, 반환값을 HTTP 응답 본문(JSON)으로 만들어 보냄
- Map, DTO를 반환하면 Jackson이 자동으로 JSON 변환

---

## 2) 클래스 레벨 @RequestMapping - 공통 주소

    @RestController
    @RequestMapping("/api/v1/menus")   // 이 클래스 메소드들의 공통 앞 주소
    public class MethodMappingTestController { ... }

- 메소드 주소 = 클래스 주소 + 메소드 주소
- 같은 자원(menus, orders)끼리 Controller 하나로 묶음

---

## 3) 메소드 레벨 매핑 - HTTP 메소드별

    @GetMapping                 // GET    /api/v1/menus        목록 조회
    @GetMapping("/{menuCode}")  // GET    /api/v1/menus/3      단건 조회
    @PostMapping                // POST   /api/v1/menus        등록
    @PutMapping("/{menuCode}")  // PUT    /api/v1/menus/1      수정
    @DeleteMapping("/{menuCode}") // DELETE /api/v1/menus/1    삭제

- 같은 URL이라도 HTTP 메소드가 다르면 다른 핸들러가 실행됨
- URL은 "무엇을"(자원), HTTP 메소드는 "어떻게"(행위) → REST 방식

---

## 4) @PathVariable - URL 경로 값 받기

    @GetMapping("/{menuCode}")
    public ResponseEntity<Map<String, Object>> findMenu(@PathVariable int menuCode) {
        Map<String, Object> response = Map.of("message", menuCode + "번 메뉴 조회용 핸들러 메소드 호출");
        return ResponseEntity.ok(response);
    }

- {menuCode} 자리 값이 매개변수 menuCode에 들어감 ("3" → int 3 자동 변환)

---

## 5) ResponseEntity - 상태 코드 + 본문

    return ResponseEntity.ok(response);                                  // 200 OK
    return ResponseEntity.status(HttpStatus.CREATED).body(response);     // 201 Created

- 응답 본문뿐 아니라 HTTP 상태 코드까지 직접 정할 수 있음
- 등록(POST) 성공은 201 Created가 관례

---

## 6) 응답 데이터 만들기 - Map.of

    Map<String, Object> response = Map.of(
            "message", "주문 목록 조회용 핸들러 메소드 호출",
            "orders", Map.of("sampleOrderNumber", 1, "sampleProductName", "샘플 상품")
    );

- Map 안에 Map → JSON 안에 중첩 객체
- ClassMappingTestController(/api/v1/orders)도 같은 구조로 목록·상세 조회

---

## 7) api-test.http로 요청 보내기

    ### 메뉴 등록
    POST http://localhost:8080/api/v1/menus

    ### 메뉴 삭제
    DELETE http://localhost:8080/api/v1/menus/1

- 브라우저 주소창은 GET만 가능 → POST/PUT/DELETE는 .http 파일(IntelliJ HTTP Client)로 테스트
- 요청마다 ### 로 구분

---

## 헷갈리는 부분
- 클래스에 @RequestMapping, 메소드에 @GetMapping 등 → 주소가 이어 붙음
- 같은 URL + 같은 HTTP 메소드 핸들러가 두 개면 서버 실행 시 에러 (Ambiguous mapping)
- Map.of는 null 값 불가, 수정 불가 (불변) → null 들어갈 수 있으면 LinkedHashMap (chap02)
- Map.of는 순서 보장 X → JSON 키 순서가 바뀌어 보일 수 있음
- @PathVariable 이름과 {} 이름이 같아야 생략 가능

---

## 암기할 것
- 조회 GET / 등록 POST / 수정 PUT / 삭제 DELETE
- @RestController = @Controller + @ResponseBody
- @RequestMapping(클래스 공통 주소) + @XxxMapping(메소드 주소)
- ResponseEntity.ok() = 200, status(HttpStatus.CREATED) = 201

---

## 전체 흐름 정리
- 클래스에 공통 주소(/api/v1/menus)를 걸고
- 메소드마다 HTTP 메소드 + 세부 경로를 지정해 CRUD 핸들러를 나눔
- 경로 값은 @PathVariable로 받고
- 결과는 ResponseEntity로 상태 코드와 JSON 본문을 함께 응답
