# chap00 - JDBC 직접 사용의 문제점과 JPA 복습

## 0. 오늘의 큰 그림
- 6주차 JDBC: SQL 작성 → PreparedStatement → ResultSet → DTO에 직접 옮겨 담기
- chap00: 이 방식을 계속 쓰면 생기는 **4가지 문제**를 테스트 코드로 확인
- 해결책: 객체와 테이블을 연결해 주는 **ORM**, 그 Java 표준이 **JPA** (구현체는 Hibernate)

| 문제 | 테스트 | 한 줄 요약 |
|---|---|---|
| 1. 반복 코드 | testDirectSelectSQL / testDirectInsertSQL | SQL·변환 코드를 매번 직접 씀 |
| 2. SQL 의존 | testChangeSelectColumns | 컬럼이 바뀌면 SQL과 변환 코드를 다 고쳐야 함 |
| 3. 패러다임 불일치 | testAssociatedObject | 객체는 참조, 테이블은 FK |
| 4. 동일성 보장 X | testEquals | 같은 행을 두 번 조회하면 다른 객체 |

---

## 1) 반복 코드 - SQL 작성 + ResultSet → 객체 변환

    String query = "SELECT MENU_CODE, MENU_NAME, MENU_PRICE, CATEGORY_CODE, ORDERABLE_STATUS FROM TBL_MENU";
    ResultSet rset = stmt.executeQuery(query);
    while (rset.next()) {
        Menu menu = new Menu();
        menu.setMenuCode(rset.getInt("MENU_CODE"));
        menu.setMenuName(rset.getString("MENU_NAME"));
        ...                                          // 컬럼 수만큼 반복
        menuList.add(menu);
    }

- 조회, 등록(INSERT + `pstmt.setXxx`)마다 SQL과 변환 코드를 계속 새로 씀
- 테이블이 늘어날수록 같은 모양의 코드가 늘어남 → 개발 시간 증가, 유지보수 어려움

---

## 2) SQL 의존적인 개발

    String query = "SELECT MENU_CODE, MENU_NAME, MENU_PRICE FROM TBL_MENU";   // 컬럼 3개만
    menu.setMenuCode(...); menu.setMenuName(...); menu.setMenuPrice(...);
    // categoryCode = 0, orderableStatus = null 인 Menu 객체가 만들어짐

- 객체에 무엇이 채워질지를 **SQL이 결정** → 객체만 보고는 믿고 쓸 수 없음
- 컬럼 추가/변경 시 SQL과 변환 코드를 찾아다니며 수정

---

## 3) 패러다임 불일치 (상속, 연관관계, 객체 그래프 탐색)

    // 테이블에 맞춘 객체                    // 객체지향에 맞춘 객체
    class Menu {                             class MenuAndCategory {
        private int categoryCode;  // FK         private Category category;   // 참조
    }                                        }

    // 객체지향 모델로 쓰려면 JOIN SQL + 직접 조립
    "SELECT A.MENU_CODE, ..., B.CATEGORY_NAME FROM TBL_MENU A JOIN TBL_CATEGORY B ON (...)"
    menuAndCategory.setCategory(new Category(rset.getInt("CATEGORY_CODE"), rset.getString("CATEGORY_NAME")));

- **연관관계**: 객체는 다른 객체를 참조로 가짐 / 테이블은 FK 값으로 연결
- **객체 그래프 탐색**: `menu.getCategory().getCategoryName()`처럼 따라가고 싶어도 SQL에서 JOIN한 만큼만 가능
- **상속**: 객체는 상속, DB는 슈퍼타입/서브타입 테이블로 분리 → INSERT를 테이블마다 따로. JPA는 `persist(법인회원)` 한 번으로 처리

---

## 4) 동일성 보장 문제

    // 같은 쿼리(MENU_CODE = 1)를 두 번 실행해서 각각 new Menu()에 담음
    assertNotSame(menu1, menu2);                                  // 다른 객체
    assertEquals(menu1.getMenuName(), menu2.getMenuName());       // 값은 같음
    System.out.println(menu1 == menu2);                           // false

- 같은 DB 행인데 조회할 때마다 다른 객체 → `==` 비교가 false
- JPA는 같은 영속성 컨텍스트 안에서 같은 PK를 조회하면 **같은 객체**를 돌려줌 (chap01 1차 캐시)

---

## 5) 테스트 준비 - 자동 커밋 끄고 롤백

    @BeforeEach
    void setConnection() throws SQLException {
        con = DriverManager.getConnection(url, user, password);
        con.setAutoCommit(false);
    }
    @AfterEach
    void closeConnection() throws SQLException {
        con.rollback();   // 테스트 중 INSERT한 데이터 되돌림
        con.close();
    }

---

## 헷갈리는 부분
- **JPA vs Hibernate**: JPA는 인터페이스 모음(표준, `jakarta.persistence`), Hibernate는 그 구현체 → 코드는 JPA 것을 import
- **ORM**: Object-Relational Mapping. 객체와 테이블을 매핑해서 SQL을 대신 만들어 주는 기술. JPA는 Java의 ORM 표준
- JPA를 써도 SQL이 사라지는 게 아니라 JPA(Hibernate)가 **대신 만들어서** 실행 (show_sql로 확인)
- `assertNotSame` = 객체 주소 비교(==), `assertEquals` = 값 비교(equals)
- 동일성(identity) = 같은 객체(==), 동등성(equality) = 값이 같음(equals)

---

## 암기할 것
- JDBC 직접 사용 문제 4가지: 반복 코드 / SQL 의존 / 패러다임 불일치(상속·연관관계·객체 그래프 탐색) / 동일성 보장 X
- ORM = 객체 ↔ 테이블 매핑, JPA = Java ORM 표준, Hibernate = 구현체
- JPA는 같은 영속성 컨텍스트에서 같은 엔티티의 동일성을 보장

---

## 전체 흐름 정리
- JDBC로 직접 SQL을 쓰면 SQL과 변환 코드가 반복되고, 객체 구조가 SQL에 묶임
- 객체(참조, 상속)와 테이블(FK, 분리된 테이블)의 구조 차이를 개발자가 직접 메워야 함
- 같은 행도 조회할 때마다 다른 객체가 됨
- 이런 문제를 줄이려고 객체와 테이블을 매핑하는 ORM, Java 표준 JPA를 사용 → chap01부터 EntityManager로 시작
