# chap05 - 조회 방법 ② 페이징과 JOIN FETCH 복습

## 0. 오늘의 큰 그림
- 메뉴 전체를 한 번에 주지 않고 **페이지 단위**로 나눠서 응답
- 메뉴를 가져올 때 카테고리도 **한 번의 SELECT로 같이** 가져와서 N+1 문제 방지
- 흐름: `?page=0&size=5&sort=menuCode,asc` → Pageable → `Page<Menu>` → `Page.map()` → `Page<MenuResponse>` → PageResponse(JSON)

---

## 1) Repository - JOIN FETCH + Pageable + countQuery

    // JOIN FETCH m.category: 메뉴와 연결된 카테고리를 조인 + 연관 객체를 함께 로딩
    @Query(value = "SELECT m FROM Menu m JOIN FETCH m.category",
           countQuery = "SELECT COUNT(m) FROM Menu m")
    Page<Menu> findPageWithCategory(Pageable pageable);

- 매개변수에 `Pageable` → Spring Data JPA가 LIMIT / OFFSET / ORDER BY를 쿼리에 붙여 줌
- 반환 타입 `Page<Menu>` → 내용 + 전체 건수까지 필요 → **SQL이 2번** 나감
  1. 내용 조회: `select ... from tbl_menu join tbl_category ... order by menu_code limit 5 offset 0`
  2. 개수 조회: `countQuery`에 적은 `SELECT COUNT(m) FROM Menu m`

---

## 2) Controller - Pageable 받기, @PageableDefault

    @GetMapping("/page")
    public ResponseEntity<PageResponse<MenuResponse>> findMenuPage(
            @PageableDefault(size = 5, sort = "menuCode") Pageable pageable) {
        return ResponseEntity.ok(menuService.findMenuPage(pageable));
    }

    ### api-test.http
    GET http://localhost:8080/api/v1/menus/page?page=0&size=5&sort=menuCode,asc

| 쿼리 파라미터 | 뜻 | 없을 때 (@PageableDefault) |
|---|---|---|
| `page` | 페이지 번호, **0부터** 시작 | 0 |
| `size` | 한 페이지 개수 | 5 |
| `sort` | `필드명,asc` 또는 `필드명,desc` | menuCode 오름차순 |

- Pageable은 @RequestParam 없이 매개변수에 선언만 하면 Spring이 위 파라미터로 만들어 줌
- `sort`도 컬럼명이 아니라 **엔티티 필드명**(menuCode)
- 테스트에선 직접 만듦: `PageRequest.of(0, 5, Sort.by("menuCode").ascending())`

---

## 3) Service - Page.map()

    @Transactional(readOnly = true)
    public PageResponse<MenuResponse> findMenuPage(Pageable pageable) {
        Page<MenuResponse> responsePage = menuRepository
                .findPageWithCategory(pageable)   // Page<Menu>
                .map(this::toResponse);           // Page<MenuResponse>
        return PageResponse.from(responsePage);
    }

- `Page.map()`: 페이지 번호, 전체 건수 같은 정보는 그대로 두고 **content 안의 Menu만** MenuResponse로 바꿈
- 스트림 `map()`과 목적은 같음(하나씩 변환) / 차이: 스트림은 `.toList()` 등으로 끝내야 하고 결과가 List, `Page.map()`은 결과가 **다시 Page**
- JOIN FETCH로 카테고리를 이미 가져왔으니 `toResponse()`의 `getCategoryName()`에서 추가 SELECT 없음

---

## 4) PageResponse - Page를 감싸서 반환

    public class PageResponse<T> {
        private final List<T> content;       // 이번 페이지 데이터
        private final int page;              // 현재 페이지 번호 (0부터)
        private final int size;              // 페이지 크기
        private final long totalElements;    // 전체 데이터 수
        private final int totalPages;        // 전체 페이지 수

        public static <T> PageResponse<T> from(Page<T> page) {
            return new PageResponse<>(page.getContent(), page.getNumber(), page.getSize(),
                                      page.getTotalElements(), page.getTotalPages());
        }
    }

- Page를 그대로 JSON으로 보내면 Spring 내부 구조(pageable, sort 객체 등)가 다 나가고 모양도 버전마다 달라질 수 있음 → 화면에 필요한 5개만 담아서 응답 모양을 고정
- 제네릭 `<T>` → 메뉴 말고 다른 목록에도 재사용
- 생성자는 private, 정적 메소드 `from()`으로만 생성 (Page → PageResponse 변환이라는 뜻이 이름에 드러남)
- 현재 페이지 번호는 `getNumber()` (getPage 아님)

---

## 5) JOIN FETCH - N+1 문제 해결

**JOIN FETCH 없이 (chap04의 findAll)**

    menuRepository.findAll()             // ① SELECT * FROM tbl_menu           → 메뉴 N개
        .stream().map(this::toResponse)   // ② 메뉴마다 getCategoryName()       → 카테고리 SELECT 추가
    // 1 + N번 (같은 카테고리는 1차 캐시라 재조회 X, 그래도 카테고리 종류만큼 늘어남)

**JOIN FETCH 사용**

    SELECT m FROM Menu m JOIN FETCH m.category
    // SQL 1번: select m.*, c.* from tbl_menu m join tbl_category c on ...

- `m.category`: 조인 대상도 테이블이 아니라 Menu의 **연관 필드**
- 일반 `JOIN`은 조건에 쓰려고 조인만 함 (SELECT 대상은 m뿐, category는 여전히 LAZY)
- `JOIN FETCH`는 조인 + 연관 객체를 **영속성 컨텍스트에 같이 채움** → LAZY여도 이 쿼리에선 한 번에 로딩

---

## 6) countQuery를 따로 지정하는 이유
- Page를 반환하면 Spring Data JPA가 전체 개수 쿼리도 실행해야 함
- countQuery를 안 쓰면 본 쿼리(`SELECT m FROM Menu m JOIN FETCH m.category`)를 바탕으로 count 쿼리를 **자동으로** 만들려고 함
- 그런데 fetch join은 "엔티티를 가져오면서 연관 객체를 채우는" 문법이라 `COUNT(m)`과 같이 쓸 수 없음 → 자동 생성에 맡기면 (버전에 따라) 에러가 나거나, 에러가 안 나도 개수 세는 데 필요 없는 조인이 남음
- 자동 변환 결과를 믿기보다 개수 쿼리를 직접 적어 두는 게 확실
- 개수 세는 데는 카테고리가 필요 없음 (category_code가 NOT NULL이라 조인해도 건수는 같음) → `SELECT COUNT(m) FROM Menu m`로 가볍게 따로 지정

---

## 7) 조회 방법 비교표

| | 쿼리 메소드 | JPQL (@Query) | JOIN FETCH (+ 페이징) |
|---|---|---|---|
| 작성 방법 | 메소드 이름 규칙 | @Query에 JPQL 문자열 | @Query JPQL에 `JOIN FETCH` |
| 예 | findByMenuPriceGreaterThanEqual... | `... LIKE CONCAT('%', :keyword, '%')` | `SELECT m FROM Menu m JOIN FETCH m.category` |
| 파라미터 | 매개변수 순서대로 | `:이름` + `@Param` | Pageable (+ :이름) |
| 장점 | 쿼리를 안 써도 됨, 빠르게 작성 | 복잡한 조건/정렬/함수 자유롭게 | 연관 엔티티 한 번에 로딩 → N+1 방지 |
| 단점 | 조건이 많으면 이름이 너무 김 | 문자열이라 직접 써야 함 | 페이징 시 countQuery 따로 필요 |
| 언제 | 단순 조건 1~2개 | 이름 규칙으로 표현하기 어려울 때 | 조회 후 연관 객체를 바로 쓸 때 (목록 + 카테고리명) |

- 공통점: 셋 다 테이블이 아니라 **엔티티/필드 기준** (쿼리 메소드도 내부적으로 JPQL이 만들어짐)
- DB 고유 SQL이 꼭 필요할 때 쓰는 Native Query는 chap06

---

## 헷갈리는 부분

**1. 쿼리 메소드, JPQL, JOIN FETCH 중 무엇을 언제?**
- 먼저 쿼리 메소드로 되는지 본다 → 이름이 너무 길거나 표현이 안 되면 JPQL
- 결과를 DTO로 바꾸면서 연관 엔티티(카테고리명)를 같이 쓸 거면 JOIN FETCH
- JOIN FETCH는 따로 있는 기능이 아니라 **JPQL 안에서 쓰는 문법**

**2. fetch join 페이징에서 countQuery가 필요한 이유**
- Page 반환 = 내용 쿼리 + count 쿼리 2번
- count 쿼리는 fetch join과 같이 쓸 수 없고 조인도 필요 없음 → 조인 없는 count를 직접 지정

**3. Page.map() vs stream().map()**
- 둘 다 요소를 하나씩 바꾸지만, Page.map()은 페이지 정보를 유지한 채 Page로 돌려줌
- Page를 stream으로 바꿔서 map하면 List만 남고 totalElements 같은 정보가 사라짐

**4. page는 0부터**
- `page=0`이 첫 페이지. 응답의 `page`도 0부터 (`getNumber()`)

**5. JOIN vs JOIN FETCH**
- `JOIN`: 조인 조건으로만 사용, 연관 객체는 LAZY 그대로 → 꺼낼 때 추가 SELECT
- `JOIN FETCH`: 연관 객체까지 한 번에 채움

**6. (참고) 컬렉션 fetch join + 페이징 주의**
- 여기선 Menu → Category(N:1)라 행 수가 늘지 않아서 문제 없음
- Category → menuList(1:N) 같은 컬렉션을 fetch join하면 행이 늘어나 DB에서 LIMIT를 못 하고 메모리에서 페이징 → 사용 주의

---

## 암기할 것
- `Page<엔티티> 메소드(Pageable pageable)` → 내용 + count 2번 조회
- `@PageableDefault(size = 5, sort = "menuCode")`, 요청 `?page=0&size=5&sort=menuCode,asc`
- `PageRequest.of(page, size, Sort.by("필드").ascending())`
- `Page.map(this::toResponse)` → 결과도 Page
- Page 정보: getContent / getNumber / getSize / getTotalElements / getTotalPages
- `JOIN FETCH m.category` = N+1 방지, `countQuery = "SELECT COUNT(m) FROM Menu m"`

---

## 전체 흐름 정리
- Controller가 page/size/sort 파라미터를 Pageable로 받음 (없으면 @PageableDefault)
- Repository의 JPQL `JOIN FETCH`로 메뉴 + 카테고리를 한 번에 조회, Pageable로 LIMIT/OFFSET/ORDER BY 적용
- 전체 건수는 따로 지정한 countQuery로 조회
- Service에서 Page.map()으로 content만 MenuResponse로 변환 (페이지 정보 유지)
- PageResponse.from()으로 필요한 페이지 정보만 담아 JSON 응답
