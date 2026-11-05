# chap04 - Spring Data JPA로 CRUD REST API 복습

## 0. 오늘의 큰 그림
- chap01~03: EntityManager를 직접 꺼내서 persist / find / remove, 트랜잭션도 직접 begin / commit
- chap04: **Repository 인터페이스만 선언**하면 Spring Data JPA가 구현체를 만들어 줌 + 트랜잭션은 @Transactional이 처리
- 흐름: 요청(JSON) → Controller → Service(@Transactional) → Repository → DB, 응답은 엔티티가 아니라 DTO로

| HTTP | URL | Service 메소드 | Repository | 응답 |
|---|---|---|---|---|
| GET | /api/v1/menus | findMenus | findAll() | 200 + 목록 |
| GET | /api/v1/menus/{menuCode} | findMenu | findById() | 200 / 404 |
| POST | /api/v1/menus | createMenu | save() | 201 + 등록된 메뉴 |
| PUT | /api/v1/menus/{menuCode} | updateMenu | (save 없음, 변경 감지) | 200 + 수정된 메뉴 |
| DELETE | /api/v1/menus/{menuCode} | deleteMenu | delete() | 204 |

---

## 1) JpaRepository - 본문이 비어 있는 Repository

    // JpaRepository<관리할 엔티티, 엔티티 식별자(@Id)의 타입>
    public interface MenuRepository extends JpaRepository<Menu, Integer> {
    }

    public interface CategoryRepository extends JpaRepository<Category, Integer> {
    }

- 본문이 비어 있어도 상속만으로 기본 메소드가 생김
  - `findAll()` → List<Menu>
  - `findById(id)` → **Optional<Menu>** (없을 수도 있으니까)
  - `save(entity)` → 새 엔티티면 persist(INSERT)
  - `delete(entity)` → remove(DELETE)
- 구현 클래스는 내가 안 만듦 → 실행할 때 Spring Data JPA가 구현체를 만들어 Bean으로 등록
- 두 번째 제네릭은 `@Id` 필드 타입 (`int menuCode` → 제네릭엔 기본형 불가라 `Integer`)

---

## 2) 엔티티 - Menu (chap03 연관관계 그대로)

    @Entity
    @Table(name = "tbl_menu")
    public class Menu {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "menu_code")
        private int menuCode;
        ...
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "category_code", nullable = false)
        private Category category;

        protected Menu() {}                       // JPA용 기본 생성자

        public void update(String menuName, int menuPrice, Category category, String orderableStatus) {
            this.menuName = menuName;  ...        // setter 대신 의미 있는 수정 메소드
        }
    }

- setter를 열지 않고 `update()` 하나로 수정 → 어디서 값을 바꾸는지 한눈에 보임
- `category`는 LAZY → 실제로 `getCategoryName()`을 부를 때 SELECT

---

## 3) DTO - MenuRequest / MenuResponse

    public class MenuRequest {                   // 요청 본문(JSON) → 객체
        @NotBlank(message = "메뉴 이름은 필수입니다.")
        private String menuName;
        @Positive(message = "메뉴 가격은 0보다 커야 합니다.")
        private int menuPrice;
        @Positive private int categoryCode;      // 엔티티가 아니라 코드(숫자)만 받음
        @Pattern(regexp = "Y|N") @NotBlank
        private String orderableStatus;
    }

    public class MenuResponse {                  // 엔티티 → 응답용 객체 (final 필드 + getter)
        private final int menuCode;
        private final String menuName;
        private final int menuPrice;
        private final int categoryCode;
        private final String categoryName;       // Category 안의 값을 펼쳐서 담음
        private final String orderableStatus;
    }

**엔티티를 직접 노출하지 않는 이유**
- 엔티티 = DB 테이블 구조. 그대로 JSON으로 내보내면 테이블 구조가 API 모양이 되어 버림
- LAZY 연관 객체(category)를 JSON으로 바꾸다가 프록시 / 트랜잭션 밖 로딩 문제가 생길 수 있음
- 요청에서 menuCode처럼 클라이언트가 정하면 안 되는 값까지 받게 됨
- 검증(@NotBlank, @Positive)은 요청 DTO에, DB 매핑(@Column)은 엔티티에 → 역할 분리

---

## 4) Service - 조회 (@Transactional(readOnly = true))

    @Transactional(readOnly = true)
    public MenuResponse findMenu(int menuCode) {
        return toResponse(findMenuEntity(menuCode));
    }

    @Transactional(readOnly = true)
    public List<MenuResponse> findMenus() {
        return menuRepository.findAll().stream()
                .map(this::toResponse)           // Menu → MenuResponse
                .toList();
    }

    private Menu findMenuEntity(int menuCode) {
        return menuRepository.findById(menuCode)
                .orElseThrow(() -> new ResourceNotFoundException("메뉴를 찾을 수 없습니다."));
    }

- `findById()`가 Optional → `orElseThrow`로 없으면 바로 예외
- `toResponse()`에서 `menu.getCategory().getCategoryName()` 호출 → 이때 카테고리 SELECT (LAZY)
- 엔티티 → DTO 변환을 **Service 안(트랜잭션 안)**에서 끝냄 (이유는 헷갈리는 부분 참고)

---

## 5) Service - 등록 / 수정 / 삭제 (@Transactional)

    @Transactional
    public MenuResponse createMenu(MenuRequest request) {
        Category category = findCategory(request.getCategoryCode());   // 코드 → 엔티티
        Menu menu = new Menu(request.getMenuName(), request.getMenuPrice(),
                             category, request.getOrderableStatus());
        return toResponse(menuRepository.save(menu));                  // INSERT
    }

    @Transactional
    public MenuResponse updateMenu(int menuCode, MenuRequest request) {
        Menu menu = findMenuEntity(menuCode);                // ① 조회 → 영속 상태
        Category category = findCategory(request.getCategoryCode());
        menu.update(request.getMenuName(), request.getMenuPrice(),
                    category, request.getOrderableStatus());  // ② 값만 바꿈
        return toResponse(menu);                              // ③ save() 없음!
    }                                                         // ④ 커밋 시 UPDATE

    @Transactional
    public void deleteMenu(int menuCode) {
        Menu menu = findMenuEntity(menuCode);
        menuRepository.delete(menu);                          // DELETE
    }

- 등록: 요청은 categoryCode(숫자)인데 Menu는 Category 객체가 필요 → `categoryRepository.findById()`로 먼저 찾음 (없으면 404)
- IDENTITY 전략이라 `save()` 순간 INSERT가 나가고 menuCode가 채워짐 → 응답에 바로 번호가 들어감
- 수정: **save()를 부르지 않음** → 변경 감지 (아래 헷갈리는 부분 1번)
- 삭제: 먼저 조회해서 없으면 404, 있으면 delete

---

## 6) @Transactional vs @Transactional(readOnly = true)

| | @Transactional | @Transactional(readOnly = true) |
|---|---|---|
| 쓰는 곳 | 등록 / 수정 / 삭제 | 조회 |
| 커밋 시 flush | O → 변경 감지로 UPDATE 가능 | X (flush 안 함) |
| 스냅샷(변경 비교용 원본) | 만듦 | 만들지 않음 → 메모리/비교 비용 절약 |
| 의미 | 데이터를 바꾸는 작업 | "이 메소드는 읽기만 한다"는 표시 |

- readOnly 안에서 엔티티 값을 바꿔도 **UPDATE가 나가지 않음** (변경 감지를 안 하니까)
- 그래서 수정 메소드에 readOnly를 붙이면 에러 없이 "수정이 안 되는" 버그가 생김
- 클래스에 안 붙이고 **메소드마다** 붙여서 조회 / 변경을 구분

---

## 7) 예외 처리 - ResourceNotFoundException / GlobalExceptionHandler / ErrorResponse

    public class ResourceNotFoundException extends RuntimeException {
        public ResourceNotFoundException(String message) { super(message); }
    }

    public class ErrorResponse {
        private final String message;            // 7주차보다 단순: message 하나만
    }

    @RestControllerAdvice
    public class GlobalExceptionHandler {
        @ExceptionHandler(ResourceNotFoundException.class)
        public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException exception) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse(exception.getMessage()));
        }
    }

    // 응답 예: 404  {"message": "메뉴를 찾을 수 없습니다."}

- 메뉴가 없을 때, 카테고리가 없을 때 둘 다 같은 예외 → 메시지만 다름
- Service는 throw만, Controller는 try-catch 없음 → Handler가 404 + JSON으로 변환
- @RestControllerAdvice / @ExceptionHandler 자세한 내용은 7주차 `10-Exception Handler.md`
- 이 코드엔 @Valid 실패 Handler가 없음 → 검증 실패 시 Spring 기본 400 응답

---

## 8) Controller

    @RestController
    @RequestMapping("api/v1/menus")
    public class MenuController {

        @PostMapping
        public ResponseEntity<MenuResponse> createMenu(@Valid @RequestBody MenuRequest request) {
            return ResponseEntity.status(HttpStatus.CREATED).body(menuService.createMenu(request));
        }

        @DeleteMapping("/{menuCode}")
        public ResponseEntity<Void> deleteMenu(@PathVariable int menuCode) {
            menuService.deleteMenu(menuCode);
            return ResponseEntity.noContent().build();
        }
        // GET 2개, PUT은 ResponseEntity.ok(...)
    }

- 등록 201 `status(HttpStatus.CREATED)`, 조회/수정 200 `ok()`, 삭제 204 `noContent().build()`
- 204는 본문이 없으니 반환 타입이 `ResponseEntity<Void>`

---

## 9) api-test.http로 요청 보내기

    ### 메뉴 등록
    POST http://localhost:8080/api/v1/menus
    Content-Type: application/json

    {
      "menuName": "까르보나라",
      "menuPrice": 14000,
      "categoryCode": 4,
      "orderableStatus": "Y"
    }

    ### 메뉴 삭제
    DELETE http://localhost:8080/api/v1/menus/9002

- IntelliJ HTTP Client 파일. 애플리케이션 실행 후 요청 왼쪽 ▶ 버튼으로 하나씩 실행
- `###` = 요청 구분선 (뒤에 쓴 글은 제목)
- 형식: `메소드 URL` → 헤더 → **빈 줄** → JSON 본문
- POST / PUT은 `Content-Type: application/json` 필수 (없으면 @RequestBody가 못 읽음)
- 9002 같은 번호는 DB에 실제로 있는 menuCode로 바꿔서 실행 (등록 응답의 menuCode 사용)
- 콘솔에서 show-sql로 찍히는 SELECT / INSERT / UPDATE / DELETE를 같이 확인

---

## 10) 테스트 - MenuServiceTests

    @SpringBootTest
    @Transactional                                   // 테스트 끝나면 롤백 → DB 원상복구
    class MenuServiceTests {
        @PersistenceContext
        private EntityManager entityManager;

        void menuCrudTest() {
            MenuResponse created = menuService.createMenu(new MenuRequest("돈까스 스파게티", 15000, 4, "Y"));
            assertTrue(created.getMenuCode() > 0);

            menuService.updateMenu(created.getMenuCode(), new MenuRequest(...));
            entityManager.flush();                   // UPDATE SQL을 지금 보내게 함

            menuService.deleteMenu(created.getMenuCode());
            entityManager.flush();
            entityManager.clear();                   // 1차 캐시 비우기
            assertThrows(ResourceNotFoundException.class, () -> menuService.findMenu(...));
        }
    }

- 테스트 클래스에 @Transactional → Service의 트랜잭션도 이 트랜잭션에 합류, 마지막에 **롤백**
- 롤백이라 커밋이 없음 → 그냥 두면 UPDATE / DELETE가 안 나감 → `flush()`로 SQL을 강제로 보내서 확인
- `clear()` 후 조회 → 1차 캐시가 아니라 DB에서 다시 찾음 → 삭제됐으니 예외

---

## 헷갈리는 부분

**1. save()를 안 불렀는데 UPDATE가 나가는 이유 (chap01 변경 감지)**
- `findById()`로 꺼낸 Menu는 영속성 컨텍스트가 관리하는 **영속 상태**
- 영속성 컨텍스트는 처음 꺼낼 때의 모습을 **스냅샷**으로 저장해 둠
- `menu.update()`로 필드만 바꾸고 메소드가 끝나면 → @Transactional이 커밋 → 커밋 직전 flush
- flush 때 스냅샷과 현재 값을 비교 → 바뀐 게 있으면 UPDATE SQL 생성 = **변경 감지(dirty checking)**
- chap01에서 `em.find()` → setter → `commit()` 하면 UPDATE 나가던 것과 같은 원리. 트랜잭션 시작/커밋을 @Transactional이 대신 해 줄 뿐
- 조건 2개: ① 영속 상태 객체일 것 ② 쓰기 가능한 트랜잭션 안일 것
  - `new Menu()`로 만든 객체(비영속), readOnly 트랜잭션, @Transactional 없는 메소드 → UPDATE 안 나감
- save()를 불러도 에러는 아니지만 영속 객체엔 의미가 없음 (이미 관리 중)

**2. readOnly = true를 수정 메소드에 붙이면?**
- 에러 없이 값은 응답에 바뀌어 보이지만 DB는 그대로 → 찾기 힘든 버그

**3. 왜 엔티티 → DTO 변환을 Service에서?**
- `open-in-view: false` → 트랜잭션(=영속성 컨텍스트)이 Service 메소드가 끝나면 닫힘
- Controller에서 `menu.getCategory().getCategoryName()`을 부르면 LAZY 로딩을 못 해서 `LazyInitializationException`
- 그래서 트랜잭션 안에서 필요한 값을 DTO에 다 꺼내 담고 나옴

**4. findAll() + toResponse()의 숨은 쿼리**
- 메뉴 SELECT 1번 + 각 메뉴의 카테고리를 꺼낼 때마다 카테고리 SELECT 추가 (같은 카테고리는 1차 캐시라 한 번만)
- 이게 N+1 문제 → chap05의 JOIN FETCH로 해결

**5. 기타**
- `JpaRepository<Menu, Integer>`: 두 번째는 테이블 PK 컬럼 타입이 아니라 **엔티티 @Id 필드 타입**
- `findById()`는 엔티티가 아니라 Optional을 돌려줌 → `.orElseThrow()`로 꺼내기
- `@Pattern`은 null이면 통과시킴 → `@NotBlank`를 같이 붙여야 null도 막음 (chap05 코드엔 @NotBlank가 빠져 있음)
- `@RequestMapping("api/v1/menus")`처럼 앞의 `/`를 빼도 Spring이 붙여서 동작 (chap05에선 `/api/v1/menus`)
- api-test.http PUT 본문의 `"menuPrice": "16000"`(문자열)도 Jackson이 int로 바꿔 줘서 동작

---

## 암기할 것
- `interface XxxRepository extends JpaRepository<엔티티, @Id 타입>` → findAll / findById / save / delete
- findById → Optional → `orElseThrow(() -> new ResourceNotFoundException(...))`
- 수정 = 조회(영속) → 엔티티 메소드로 값 변경 → 커밋 시 변경 감지 UPDATE (save 불필요)
- 조회 `@Transactional(readOnly = true)`, 변경 `@Transactional`
- 요청 DTO(검증) / 응답 DTO(필요한 값만) → 엔티티는 밖으로 안 나감
- 201 `status(CREATED)`, 200 `ok()`, 204 `noContent().build()`, 404 Handler

---

## 전체 흐름 정리
- Repository는 JpaRepository를 상속만 → 기본 CRUD 메소드 자동 생성
- Controller는 요청을 MenuRequest로 받고(@Valid 검증) Service에 넘김
- Service는 @Transactional 안에서 Repository로 엔티티를 조회/저장/삭제
- 수정은 save 없이 영속 엔티티의 값만 바꾸면 커밋 시 변경 감지로 UPDATE
- 엔티티는 트랜잭션 안에서 MenuResponse로 바꿔서 반환
- 없는 메뉴/카테고리는 ResourceNotFoundException → GlobalExceptionHandler가 404 + ErrorResponse
- api-test.http로 GET / POST / PUT / DELETE를 보내고 콘솔 SQL로 확인
