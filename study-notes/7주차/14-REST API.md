# chap08 - REST API (ResponseEntity · Validation · Swagger) 복습

## 0. 오늘의 큰 그림
- chap01~07: 요청 받기, JSON 변환, 예외 처리, 파일·인터셉터·CORS
- chap08: REST API를 "제대로" 설계하는 마무리
  - section01: 상황에 맞는 **상태 코드 + 헤더 + 본문**으로 응답 (ResponseEntity 심화)
  - section02: 요청 값 **검증**(Bean Validation)과 에러 응답 통일
  - section03: API **문서 자동화**(Swagger, springdoc)
- 이 챕터부터 **Lombok**으로 DTO의 생성자·getter·setter를 줄임

---

## Lombok (DTO 공통)

    @AllArgsConstructor   // 모든 필드 생성자
    @NoArgsConstructor    // 기본 생성자 (JSON → 객체 변환에 필요)
    @Getter @Setter
    @ToString(exclude = "pwd")   // 비밀번호는 로그에 안 찍히게
    public class UserDTO { ... }

- build.gradle: compileOnly + annotationProcessor 'org.projectlombok:lombok'

---

## section01 - ResponseEntity 심화

### 공통 응답 형식 ResponseMessage

    public class ResponseMessage {
        private int httpStatus;              // 200
        private String message;              // "조회 성공"
        private Map<String, Object> results; // {"users": [...]}
    }

- 조회 응답을 항상 같은 구조로 감싸서 프론트가 한 가지 방식으로 처리

### 상황별 응답 만들기

    // 조회 200 - 생성자 방식
    return new ResponseEntity<>(responseMessage, HttpStatus.OK);

    // 조회 200 - 빌더 방식
    return ResponseEntity.ok().body(responseMessage);

    // 등록 201 + Location 헤더
    return ResponseEntity.created(URI.create("/api/v1/response/users/" + newUser.getNo())).build();

    // 수정·삭제 204 (본문 없음)
    return ResponseEntity.noContent().build();

- created(URI): 상태 201 + **Location 헤더**(새로 만든 자원의 주소)를 함께 설정
- 본문이 없는 응답은 build()로 마무리, 반환 타입은 ResponseEntity<Void>
- 검색 조건은 @RequestParam(required = false) name, status → stream filter로 거름

| 작업 | 메소드 | 상태 코드 | 본문 |
|---|---|---|---|
| 목록·단건 조회 | GET | 200 OK | ResponseMessage |
| 등록 | POST | 201 Created + Location | 없음 |
| 수정 | PUT | 204 No Content | 없음 |
| 삭제 | DELETE | 204 No Content | 없음 |

---

## section02 - Bean Validation

### DTO에 검증 규칙

    @NotBlank(message = "아이디는 반드시 입력되어야 합니다.")
    private String id;

    @NotBlank(message = "비밀번호는 반드시 입력되어야 합니다.")
    @Size(max = 10, message = "비밀번호는 길이 10을 초과할 수 없습니다.")
    private String pwd;

    @NotNull(message = "가입일은 반드시 입력되어야 합니다.")
    @Past(message = "가입일은 현재보다 과거 날짜가 입력 되어야 합니다.")
    private Date enrollDate;

- @NotBlank: 문자열 null·빈 값·공백 불가 / @NotNull: null만 불가 (날짜·숫자 등)
- @Size(max): 글자 수 / @Past: 과거 날짜만
- 의존성: spring-boot-starter-validation

### Controller에서 @Valid

    @PostMapping("/users")
    public ResponseEntity<Void> registUser(@Valid @RequestBody UserDTO user) {
        return ResponseEntity.created(URI.create("/api/v1/validation/users/1")).build();
    }

- 검증 실패 → 메소드 실행 전에 MethodArgumentNotValidException

### 검증 실패를 에러 코드로 바꾸기

    @RestControllerAdvice
    public class ExceptionController {

        @ExceptionHandler(MethodArgumentNotValidException.class)
        public ResponseEntity<ErrorResponse> methodValidException(MethodArgumentNotValidException e) {
            FieldError fieldError = e.getBindingResult().getFieldError();
            String detail = fieldError != null ? fieldError.getDefaultMessage() : "요청 값을 확인해주세요.";
            String bindResultCode = fieldError != null ? fieldError.getCode() : "";

            switch (bindResultCode) {
                case "NotBlank", "NotNull" -> code = "ERROR_CODE_00001";   // 필수 값 누락
                case "Size"                -> code = "ERROR_CODE_00002";   // 글자 수
                default                    -> code = "ERROR_CODE_99999";
            }
            return new ResponseEntity<>(new ErrorResponse(code, description, detail), HttpStatus.BAD_REQUEST);
        }
    }

- fieldError.getCode(): 실패한 **검증 어노테이션 이름**("NotBlank", "Size")
- fieldError.getDefaultMessage(): 어노테이션에 쓴 message
- ErrorResponse(code, description, detail)로 에러 형식 통일 → 400
- (실습 코드는 `case ...: ... break;` 형식, 위는 핵심만 줄인 것)

### 없는 회원 → 404

    if (userNo != 1) throw new UserNotFoundException(userNo + "번 회원 정보를 찾을 수 없습니다.");

    @ExceptionHandler(UserNotFoundException.class)
    → new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND)

---

## section03 - Swagger (springdoc-openapi)

### 설정

    // build.gradle
    implementation 'org.springdoc:springdoc-openapi-starter-webmvc-ui:3.0.3'

    // application.properties - 문서에 넣을 패키지만 지정
    springdoc.packages-to-scan=com.ohgiraffers.restapi.section03

    @Configuration
    public class SwaggerConfig {
        @Bean
        public OpenAPI openAPI() {
            return new OpenAPI().info(new Info()
                    .title("Ohgiraffers API")
                    .description("SpringBoot Swagger 연동 테스트")
                    .version("1.0.0"));
        }
    }

- 서버 실행 후 http://localhost:8080/swagger-ui/index.html 에서 문서 확인·직접 호출
- OpenAPI Bean: 문서 상단의 제목·설명·버전

### 문서용 어노테이션

    @Tag(name = "user 관련 api", description = "회원 조회 등록 수정 삭제 API")   // Controller 묶음
    public class SwaggerTestController {

        @Operation(summary = "회원 목록 조회/검색", description = "...")          // API 하나 설명
        @ApiResponses({ @ApiResponse(responseCode = "200", description = "회원 목록 조회 성공") })
        @GetMapping
        public ResponseEntity<ResponseMessage> findUserByConditions(...) { ... }

        @ApiResponses({ @ApiResponse(responseCode = "200", description = "회원 단건 조회 성공"),
                        @ApiResponse(responseCode = "404", description = "회원 정보 없음") })
        @GetMapping("/{userNo}")
        ...
    }

    @Schema(description = "회원 등록.수정 요청")
    public class UserRequestDTO {
        @Schema(description = "회원ID", example = "user04")
        private String id;
    }

| 어노테이션 | 붙이는 곳 | 역할 |
|---|---|---|
| @Tag | Controller 클래스 | API 그룹 이름 |
| @Operation | 메소드 | API 요약·설명 |
| @ApiResponses / @ApiResponse | 메소드 | 가능한 응답 코드별 설명 |
| @Schema | DTO 클래스·필드 | 모델 설명, 예시 값(example) |

### 이 Controller 전용 예외 처리

    @RestControllerAdvice(basePackageClasses = SwaggerTestController.class)
    public class SwaggerExceptionHandler { ... SwaggerUserNotFoundException → 404 ... }

    private UserResponseDTO findUser(int userNo) {
        return users.stream().filter(user -> user.getNo() == userNo).findFirst()
                .orElseThrow(() -> new SwaggerUserNotFoundException(userNo + "번 회원 정보를 찾을 수 없습니다."));
    }

- basePackageClasses: 그 클래스가 있는 패키지의 Controller에만 이 Advice 적용

---

## 헷갈리는 부분
- 201은 `ResponseEntity.created(URI)` → Location 헤더까지 같이 설정, 본문 없으면 build()
- section01의 `URI.create("api/v1/response/users/...")`는 앞에 `/`가 없음 → 상대 경로가 됨 (section02·03처럼 `/api/...`로 쓰는 게 맞음)
- section01 단건 조회는 `.findFirst().get()` → 없는 번호면 NoSuchElementException(500). section03은 orElseThrow + 사용자 정의 예외로 404를 보냄
- @NotBlank(문자열 전용) vs @NotNull(모든 타입, null만 검사)
- getCode()는 어노테이션 이름, getDefaultMessage()는 message 값
- Swagger 어노테이션은 **문서만** 바꿈 → 실제 검증·응답 동작은 바뀌지 않음
- springdoc.packages-to-scan 때문에 section03 API만 Swagger 문서에 보임
- @ToString(exclude = "pwd"): 비밀번호를 로그에 남기지 않기 위함

---

## 암기할 것
- 200 ok() / 201 created(URI) / 204 noContent() / 400 / 404
- 본문 없는 응답: ResponseEntity<Void> + build()
- @Valid + @NotBlank / @NotNull / @Size / @Past
- MethodArgumentNotValidException → getBindingResult().getFieldError()
- springdoc-openapi-starter-webmvc-ui → /swagger-ui/index.html
- @Tag / @Operation / @ApiResponse / @Schema

---

## 전체 흐름 정리
- section01: 작업마다 알맞은 상태 코드로 응답 (조회 200 + 공통 형식, 등록 201 + Location, 수정·삭제 204)
- section02: DTO에 검증 규칙 → @Valid로 검사 → 실패 원인을 에러 코드·메시지로 바꿔 400, 없는 회원은 404
- section03: springdoc으로 API 문서 자동 생성, 어노테이션으로 설명·응답 코드·예시를 보강
- 결과: 상태 코드·에러 형식·문서까지 갖춘, 프론트가 믿고 쓸 수 있는 REST API
