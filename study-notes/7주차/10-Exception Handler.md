# chap04 - Exception Handler 복습

## 0. 오늘의 큰 그림
- chap03: 없는 회원 조회 → 예외 → 그냥 500 에러
- chap04: 예외 종류별로 알맞은 상태 코드 + 같은 모양의 JSON 실패 응답 보내기
- 흐름: 상황별 예외 만들기 → Controller에서 throw → GlobalExceptionHandler가 잡아서 응답 변환

| 상황 | 예외 | 응답 |
|---|---|---|
| 없는 회원 조회 | MemberNotFoundException | 404 |
| 검증 실패 (@Valid) | MethodArgumentNotValidException | 400 |
| 중복 회원 번호 | InvalidMemberRequestException | 400 |
| JSON 타입 불일치 | HttpMessageNotReadableException | 400 |
| 예상 못한 오류 | Exception | 500 |

---

## 1) 사용자 정의 예외

    public class MemberNotFoundException extends RuntimeException {
        public MemberNotFoundException(String message) {
            super(message);
        }
    }

- RuntimeException 상속 → throws 선언 없이 던질 수 있음
- 예외 이름만 보고 상황을 알 수 있게 (InvalidMemberRequestException도 같은 구조)

---

## 2) 공통 실패 응답 - ErrorResponse

    public class ErrorResponse {
        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
        private final LocalDateTime timestamp;   // 생성 시 LocalDateTime.now()
        private final int status;                // 404
        private final String error;              // "Not Found"
        private final String message;            // "999번 회원을 찾을 수 없습니다."
        private final String path;               // "/api/v1/members/999"
        // 생성자 + getter
    }

- 모든 에러를 같은 JSON 구조로 → 프론트가 한 가지 방식으로 처리 가능

---

## 3) Controller - 예외 던지기

    @GetMapping("/{memberNo}")
    public ResponseEntity<MemberDTO> findMember(@PathVariable int memberNo) {
        MemberDTO foundMember = members.stream()
                .filter(member -> member.getNo() == memberNo)
                .findFirst()
                .orElseThrow(() -> new MemberNotFoundException(memberNo + "번 회원을 찾을 수 없습니다."));
        return ResponseEntity.ok(foundMember);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createMember(@Valid @RequestBody MemberDTO member) {
        if (중복 번호) {
            throw new InvalidMemberRequestException("이미 등록된 회원입니다.");
        }
        ...
    }

- Controller는 try-catch 없이 throw만 → 응답 변환은 Handler 담당

---

## 4) @RestControllerAdvice + @ExceptionHandler

    @RestControllerAdvice
    public class GlobalExceptionHandler {

        @ExceptionHandler(MemberNotFoundException.class)
        public ResponseEntity<ErrorResponse> handleMemberNotFound(
                MemberNotFoundException exception, WebRequest request) {

            ErrorResponse response = new ErrorResponse(
                    HttpStatus.NOT_FOUND.value(),
                    HttpStatus.NOT_FOUND.getReasonPhrase(),
                    exception.getMessage(),
                    extractPath(request));
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        private String extractPath(WebRequest request) {
            return request.getDescription(false).replace("uri=", "");
        }
    }

- @RestControllerAdvice: 모든 Controller의 예외를 한 곳에서 처리 + 반환값을 JSON 본문으로
- @ExceptionHandler(예외.class): 그 타입 예외가 나면 이 메소드 실행
- HttpStatus.XXX.value() = 숫자, getReasonPhrase() = "Not Found" 같은 문구
- WebRequest에서 요청 경로를 꺼내 path에 기록

---

## 5) 유효성 검증 - @Valid

    // build.gradle
    implementation 'org.springframework.boot:spring-boot-starter-validation'

    public class MemberDTO {
        @Min(value = 1, message = "회원 번호는 1 이상이어야 합니다")
        private int no;
        @NotBlank(message = "회원 이름은 비어 있을 수 없습니다.")
        private String name;
        @Min(value = 0, message = "회원 나이는 0 이상이어야 합니다.")
        private int age;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    ... String message = exception.getBindingResult()
            .getFieldErrors().stream()
            .findFirst()
            .map(error -> error.getDefaultMessage())
            .orElse("요청 값이 올바르지 않습니다");

- @RequestBody 앞에 @Valid → DTO 검증 어노테이션 검사
- 실패하면 메소드 실행 전에 MethodArgumentNotValidException
- 여러 필드가 틀려도 첫 번째 메시지만 꺼내서 응답

---

## 6) JSON 형식 오류 / 500 오류

    @ExceptionHandler(HttpMessageNotReadableException.class)   // "age": "스무 살"
    → 400 "요청 본문 형식이 올바르지 않습니다."

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception exception, WebRequest request) {
        log.error("처리하지 못한 예외가 발생했습니다", exception);   // 실제 원인은 서버 로그
        return ResponseEntity.internalServerError().body(...);       // 클라이언트엔 일반 메시지
    }

- Exception.class = 위에서 못 잡은 나머지 전부 (최후의 처리)
- 500 상세 원인(스택트레이스)은 클라이언트에 노출하지 않고 log로만 남김

---

## 헷갈리는 부분
- 여러 Handler가 해당되면 **더 구체적인 예외 타입**이 우선 (Exception은 마지막)
- @Valid 검증 실패는 Controller 메소드 안으로 들어오기 전에 발생
- starter-validation 의존성이 없으면 @NotBlank, @Min import가 안 됨 (starter-web에 포함 안 됨)
- @NotBlank는 문자열용 (null, "", " " 모두 실패), 숫자는 @Min/@Max
- 404 = 대상 없음(클라이언트가 없는 걸 요청), 500 = 서버 잘못 → 조회 실패를 500으로 보내지 않기
- ResponseEntity.badRequest() = 400, internalServerError() = 500 단축 메소드

---

## 암기할 것
- @RestControllerAdvice + @ExceptionHandler(예외.class)
- 사용자 정의 예외 extends RuntimeException + super(message)
- ErrorResponse: timestamp, status, error, message, path
- @Valid + starter-validation + @NotBlank / @Min
- 404 NotFound, 400 BadRequest, 500 InternalServerError

---

## 전체 흐름 정리
- Controller는 상황에 맞는 예외를 throw만 함
- 예외가 Controller 밖으로 나오면 GlobalExceptionHandler가 타입별로 잡음
- 각 Handler가 상태 코드를 정하고 ErrorResponse(JSON)로 변환해 응답
- 검증 실패, JSON 형식 오류 같은 Spring 기본 예외도 같은 구조로 통일
- 예상 못한 오류는 로그에 남기고 500 공통 메시지로 응답
