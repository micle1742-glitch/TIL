# chap05 - 조회 방법 ① 쿼리 메소드와 JPQL 복습

## 0. 오늘의 큰 그림
- chap04: JpaRepository 기본 메소드(findAll, findById)만 사용 → "PK로 하나" 또는 "전부"만 가능
- chap05: 조건이 붙은 조회를 Repository에 추가하는 3가지 방법
  1. **쿼리 메소드**: 메소드 이름만 규칙대로 지으면 쿼리 자동 생성
  2. **JPQL(@Query)**: 엔티티 기준 쿼리를 직접 작성
  3. **JOIN FETCH + 페이징**: 연관 엔티티를 한 번에 가져오면서 페이지 단위 조회 → `02-페이징-fetch-join.md`

| 요청 | 방법 | Repository 메소드 |
|---|---|---|
| GET /api/v1/menus/search/price?minPrice=20000 | 쿼리 메소드 | findByMenuPriceGreaterThanEqualOrderByMenuPriceDesc |
| GET /api/v1/menus/search/name?keyword=마늘 | JPQL | searchByMenuName |
| GET /api/v1/menus/page?page=0&size=5&sort=menuCode,asc | JPQL + JOIN FETCH + Pageable | findPageWithCategory |

---

## 1) 쿼리 메소드 - 이름이 곧 쿼리

    public interface MenuRepository extends JpaRepository<Menu, Integer> {
        /* 20,000원 이상의 메뉴를 비싼 순서로 */
        List<Menu> findByMenuPriceGreaterThanEqualOrderByMenuPriceDesc(int minPrice);
    }

**이름 풀어 읽기**

| 조각 | 뜻 | 만들어지는 부분 |
|---|---|---|
| `find` ... `By` | 조회 시작 / 여기부터 조건 | `SELECT m FROM Menu m WHERE` |
| `MenuPrice` | 엔티티 **필드** `menuPrice` (컬럼 menu_price 아님) | `m.menuPrice` |
| `GreaterThanEqual` | 이상 (>=) | `>= ?1` ← 매개변수 minPrice |
| `OrderBy` `MenuPrice` `Desc` | menuPrice 내림차순 정렬 | `ORDER BY m.menuPrice DESC` |

    // 결과적으로 만들어지는 JPQL
    SELECT m FROM Menu m WHERE m.menuPrice >= ?1 ORDER BY m.menuPrice DESC

- 자주 쓰는 키워드: `GreaterThan`(>), `LessThanEqual`(<=), `Between`, `Containing`(LIKE %x%), `And`, `Or`, `OrderBy...Asc/Desc`
- 조건 개수 = 매개변수 개수 (순서대로 들어감)
- 필드 이름을 틀리면(`findByPrice...`) **애플리케이션 시작할 때** 에러 → 실행 전에 실수를 잡아 줌

**Service / Controller**

    @Transactional(readOnly = true)
    public List<MenuResponse> findMenusByMinimumPrice(int minPrice) {
        return menuRepository.findByMenuPriceGreaterThanEqualOrderByMenuPriceDesc(minPrice)
                .stream().map(this::toResponse).toList();
    }

    @GetMapping("/search/price")
    public ResponseEntity<List<MenuResponse>> findMenusByPrice(@RequestParam int minPrice) { ... }

- `?minPrice=20000` → @RequestParam으로 받아서 그대로 전달

---

## 2) JPQL - @Query로 직접 쓰는 엔티티 쿼리

    // JPQL: 테이블과 컬럼이 아니라, 엔티티와 필드를 대상으로 조회하는 JPA 쿼리 언어
    @Query("SELECT m FROM Menu m WHERE m.menuName LIKE CONCAT('%', :keyword, '%') ORDER BY m.menuCode")
    List<Menu> searchByMenuName(@Param("keyword") String keyword);

| JPQL | 뜻 | SQL로 치면 |
|---|---|---|
| `Menu` | 엔티티 이름 (클래스 Menu) | tbl_menu |
| `m` | 별칭 (JPQL은 필수) | |
| `SELECT m` | 엔티티 통째로 조회 | SELECT menu_code, menu_name, ... |
| `m.menuName` | 엔티티 필드 | menu_name |
| `:keyword` | 이름 기반 파라미터 | `?` |

**파라미터 바인딩**
- `:keyword` 자리에 `@Param("keyword")`가 붙은 매개변수 값이 들어감 → 이름이 같아야 함
- 값은 SQL 문자열에 이어 붙이는 게 아니라 바인딩 → SQL Injection 안전 (6주차 PreparedStatement `?`와 같은 원리)

**LIKE CONCAT('%', :keyword, '%')**
- 검색어 앞뒤에 `%`를 붙여 "포함" 검색 → `마늘` → `%마늘%`
- `'%:keyword%'`처럼 쓰면 따옴표 안이라 그냥 글자로 취급 → 파라미터가 아님
- 같은 걸 쿼리 메소드로 쓰면 `findByMenuNameContaining(String keyword)`

**Service / Controller**

    @Transactional(readOnly = true)
    public List<MenuResponse> searchMenusByName(String keyword) {
        return menuRepository.searchByMenuName(keyword).stream().map(this::toResponse).toList();
    }

    @GetMapping("/search/name")
    public ResponseEntity<List<MenuResponse>> searchMenusByName(@RequestParam String keyword) { ... }

---

## 3) api-test.http / 테스트

    ### 최소 가격 이상 조회 - 쿼리 메소드
    GET http://localhost:8080/api/v1/menus/search/price?minPrice=20000

    ### 메뉴 이름 검색 - JPQL
    GET http://localhost:8080/api/v1/menus/search/name?keyword=마늘

    // MenuQueryServiceTests
    List<MenuResponse> menus = menuService.findMenusByMinimumPrice(20000);
    assertTrue(menus.stream().allMatch(menu -> menu.getMenuPrice() >= 20000));

    List<MenuResponse> menus = menuService.searchMenusByName("마늘");
    assertTrue(menus.stream().allMatch(menu -> menu.getMenuName().contains("마늘")));

- `allMatch`: 결과가 전부 조건을 만족하는지 (5주차 스트림)

---

## 헷갈리는 부분

**1. JPQL의 `FROM Menu`는 테이블이 아니라 엔티티 이름**
- `FROM tbl_menu`라고 쓰면 에러 → JPQL은 DB 테이블을 모름, JPA가 관리하는 **엔티티**만 앎
- 엔티티 이름 = 기본은 클래스 이름. `@Entity(name = "Section02Menu")`처럼 바꿨으면 `FROM Section02Menu` (chap01, chap03)
- 조건도 컬럼 `menu_name`이 아니라 필드 `m.menuName`
- 실행할 때 Hibernate가 @Table / @Column 매핑을 보고 진짜 SQL(`tbl_menu`, `menu_name`)로 바꿔서 보냄 → 콘솔의 SQL과 JPQL이 다른 이유

**2. 쿼리 메소드 이름의 `MenuPrice`도 필드 이름**
- 컬럼 이름(menu_price)이 아니라 엔티티 필드(menuPrice)의 첫 글자를 대문자로 쓴 것

**3. :keyword와 @Param**
- `:keyword` ↔ `@Param("keyword")` 이름이 짝 → 다르면 실행 시 바인딩 에러
- 쿼리 메소드는 이름 규칙으로 순서대로 넣으니 @Param이 필요 없음

**4. 쿼리 메소드 vs JPQL을 언제?**
- 조건 1~2개, 이름이 읽기 쉬우면 → 쿼리 메소드
- 이름이 너무 길어지거나 / JOIN, CONCAT, 직접 정한 정렬처럼 이름 규칙으로 표현하기 어려우면 → JPQL
- 전체 비교표는 `02-페이징-fetch-join.md` 마지막

**5. 둘 다 에러를 시작할 때 잡음**
- 쿼리 메소드의 없는 필드 이름, JPQL의 문법 오류 / 없는 엔티티 이름 → 애플리케이션(테스트) 시작 단계에서 실패

---

## 암기할 것
- 쿼리 메소드: `findBy + 필드명 + 조건키워드 + OrderBy + 필드명 + Asc/Desc`
- GreaterThanEqual `>=`, GreaterThan `>`, Containing `LIKE %x%`
- JPQL = 엔티티와 필드 대상, `SELECT m FROM Menu m` (별칭 필수)
- `@Query("... :keyword ...")` + `@Param("keyword")`
- 포함 검색: `LIKE CONCAT('%', :keyword, '%')`

---

## 전체 흐름 정리
- 조건 조회가 필요하면 MenuRepository에 메소드를 추가
- 간단한 조건은 쿼리 메소드 이름 규칙으로 → Spring Data JPA가 JPQL을 만들어 줌
- 이름으로 표현하기 어려우면 @Query에 JPQL을 직접 작성 (엔티티/필드 기준, :파라미터 + @Param)
- Hibernate가 JPQL을 실제 테이블/컬럼 SQL로 바꿔 실행
- Service는 결과 List<Menu>를 MenuResponse로 변환해 반환, Controller는 @RequestParam으로 조건을 받음
