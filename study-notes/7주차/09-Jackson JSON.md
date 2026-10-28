# chap03 - Jackson JSON 복습

## 0. 오늘의 큰 그림
- chap02: @RequestBody로 JSON을 DTO로 받아봄
- chap03: 그 변환을 해주는 Jackson이 Java ↔ JSON을 어떻게 바꾸는지
- 직렬화(Serialization): Java 객체 → JSON (응답 보낼 때)
- 역직렬화(Deserialization): JSON → Java 객체 (@RequestBody 받을 때)

---

## 1) Java 타입별 JSON 모양

| Java | JSON |
|---|---|
| DTO 객체 | { } 객체 |
| List<DTO> | [ { }, { } ] 배열 |
| Map | { } 객체 (key가 JSON 키) |
| LocalDate | 문자열 "2026-04-21" (@JsonFormat) |

    @GetMapping
    public ResponseEntity<List<MemberDTO>> findMembers() {
        return ResponseEntity.ok(memberList);   // → JSON 배열
    }

---

## 2) MemberDTO - Jackson 어노테이션

    public class MemberDTO {

        @JsonProperty("memberNo")          // Java no ↔ JSON memberNo
        private int no;
        private String name;
        private int age;

        @JsonFormat(pattern = "yyyy-MM-dd") // LocalDate ↔ "2026-04-21"
        private LocalDate enrollDate;

        public MemberDTO() {}               // 역직렬화용 기본 생성자
        // getter / setter
    }

- @JsonProperty: Java 필드명과 JSON 키 이름을 다르게 쓸 때 (직렬화·역직렬화 둘 다 적용)
- @JsonFormat: 날짜를 정해진 문자열 형식으로 주고받음 → 형식 다르면 역직렬화 실패(400)
- 기본 생성자: Jackson이 빈 객체를 먼저 만들고 값을 채움

---

## 3) 단건 조회 - stream으로 찾기

    MemberDTO foundMember = memberList.stream()
            .filter(member -> member.getNo() == memberNo)
            .findFirst()
            .orElseThrow(() -> new IllegalArgumentException("해당 번호의 회원이 없습니다."));

- 응답 JSON에는 no가 아니라 "memberNo"로 나옴 (@JsonProperty)
- 없는 번호면 예외 → 지금은 500 (chap04에서 404로 바꿈)

---

## 4) 등록 - 역직렬화 후 다시 직렬화

    @PostMapping
    public ResponseEntity<Map<String, Object>> createMember(@RequestBody MemberDTO member) {
        memberList.add(member);
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("message", "회원 등록 요청 성공");
        response.put("member", member);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    { "memberNo": 5, "name": "하재경", "age": 18, "enrollDate": "2026-05-27" }

- 요청 JSON도 "memberNo" 키로 보내야 no에 들어감

---

## 5) 응답 감싸기 (wrapper)

    response.put("message", "회원 목록 조회 성공");
    response.put("count", memberList.size());
    response.put("data", memberList);

    { "message": "...", "count": 4, "data": [ {...}, {...} ] }

- 바깥 Map = JSON 객체, data의 List = 중첩 JSON 배열
- 프론트에서 메시지, 개수, 데이터를 한 번에 받기 편함

---

## 6) ObjectMapper 직접 사용

    private final ObjectMapper objectMapper;   // tools.jackson.databind.ObjectMapper

    public JacksonController(ObjectMapper objectMapper) { ... }   // 생성자 주입

    String jsonString = objectMapper.writeValueAsString(memberList);

- 평소엔 Spring이 자동으로 쓰는 변환기를 직접 꺼내 쓴 것
- Boot가 날짜 모듈 등 공통 설정을 적용해 Bean으로 등록해 둠 → new 말고 주입받기
- writeValueAsString: 객체 → JSON 문자열 (응답에서는 문자열 안의 따옴표가 \" 로 보임)
- 반대(JSON → 객체)는 readValue(json, 타입.class)

---

## 헷갈리는 부분
- @JsonProperty를 붙이면 요청도 응답도 바뀐 이름("memberNo") 사용
- 날짜 형식이 "2026/05/27"처럼 다르면 400
- getter가 없으면 직렬화 시 그 필드가 JSON에 안 나옴
- Jackson 3 (Boot 4): ObjectMapper 패키지는 tools.jackson, 어노테이션은 여전히 com.fasterxml.jackson.annotation
- ObjectMapper를 new로 만들면 Boot 공통 설정(날짜 등)이 빠질 수 있음

---

## 암기할 것
- 직렬화 = Java → JSON, 역직렬화 = JSON → Java
- List → 배열, DTO·Map → 객체
- @JsonProperty("이름"), @JsonFormat(pattern = "yyyy-MM-dd")
- 기본 생성자 + getter/setter
- objectMapper.writeValueAsString(객체)

---

## 전체 흐름 정리
- 요청 JSON → (Jackson 역직렬화) → @RequestBody DTO
- 핸들러에서 DTO/List/Map 반환 → (Jackson 직렬화) → 응답 JSON
- 필드명·날짜 형식은 DTO 어노테이션으로 조정
- 필요하면 Spring이 등록한 ObjectMapper를 주입받아 직접 변환
