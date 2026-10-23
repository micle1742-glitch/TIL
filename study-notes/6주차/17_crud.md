# JDBC 06. CRUD (INSERT / UPDATE / DELETE)

> PreparedStatement + XML 쿼리로 데이터를 **추가·수정·삭제**하고, 결과를 영향받은 행 수로 확인

## 한눈에 보기

| 작업 | SQL | 실행 메서드 | 반환 |
|---|---|---|---|
| **C**reate | INSERT | `executeUpdate()` | `int` (추가된 행 수) |
| **R**ead | SELECT | `executeQuery()` | `ResultSet` |
| **U**pdate | UPDATE | `executeUpdate()` | `int` (수정된 행 수) |
| **D**elete | DELETE | `executeUpdate()` | `int` (삭제된 행 수) |

---

## 1. 쿼리 파일 (menu-query.xml 예시)

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
    <entry key="insertMenu">
        INSERT INTO TBL_MENU (MENU_NAME, MENU_PRICE, CATEGORY_CODE, ORDERABLE_STATUS)
        VALUES (?, ?, ?, ?)
    </entry>

    <entry key="updateMenu">
        UPDATE TBL_MENU
        SET MENU_NAME = ?, MENU_PRICE = ?, CATEGORY_CODE = ?
        WHERE MENU_CODE = ?
    </entry>

    <entry key="deleteMenu">
        DELETE FROM TBL_MENU
        WHERE MENU_CODE = ?
    </entry>
</properties>
```

> 💡 INSERT에서 `MENU_CODE`는 AUTO_INCREMENT라 컬럼 목록에서 뺀다.

---

## 2. 공통 구조

```java
Connection con = getConnection();
PreparedStatement pstmt = null;
int result = 0;                      // SELECT가 아니라 ResultSet 대신 int
Properties prop = new Properties();

try (FileInputStream queryStream =
         new FileInputStream("src/main/java/com/ohgiraffers/mapper/menu-query.xml")) {

    prop.loadFromXML(queryStream);
    String query = prop.getProperty("키");

    pstmt = con.prepareStatement(query);
    pstmt.setXxx(1, ...);            // ? 채우기

    result = pstmt.executeUpdate();  // 영향받은 행 수

} catch (IOException | SQLException e) {
    e.printStackTrace();
} finally {
    close(pstmt);
    close(con);                      // ResultSet 없음
}

if (result > 0) {
    System.out.println("성공");
} else {
    System.out.println("실패");
}
```

---

## 3. INSERT

### 값 직접 넣기

```java
String query = prop.getProperty("insertMenu");
pstmt = con.prepareStatement(query);

pstmt.setString(1, "봉골레파스타");
pstmt.setInt(2, 14000);
pstmt.setInt(3, 6);
pstmt.setString(4, "Y");

result = pstmt.executeUpdate();
```

### DTO로 받아서 넣기

```java
pstmt.setString(1, newMenu.getName());
pstmt.setInt(2, newMenu.getPrice());
pstmt.setInt(3, newMenu.getCategoryCode());
pstmt.setString(4, newMenu.getOrderableStatus());

result = pstmt.executeUpdate();   // DML은 영향받은 행의 개수를 int로 반환
```

> 💡 Scanner로 입력받은 값을 DTO에 담아서 넘기면, 메서드 매개변수가 짧아지고 값 묶음 관리가 쉬워진다.

> ⚠️ `ORDERABLE_STATUS`는 대문자 `'Y'`/`'N'`으로 통일. 소문자 `'y'`를 넣으면 나중에 `WHERE ORDERABLE_STATUS = 'Y'` 조회에서 빠질 수 있다.

---

## 4. UPDATE

```java
String query = prop.getProperty("updateMenu");
pstmt = con.prepareStatement(query);

pstmt.setString(1, changedMenu.getName());
pstmt.setInt(2, changedMenu.getPrice());
pstmt.setInt(3, changedMenu.getCategoryCode());
pstmt.setInt(4, changedMenu.getCode());          // WHERE MENU_CODE = ?

result = pstmt.executeUpdate();
```

> ⚠️ `?` 개수만큼 **전부** 채워야 한다. WHERE 쪽 `?`를 빠뜨리면 `No value specified for parameter 4` 에러.

---

## 5. DELETE

```java
Scanner sc = new Scanner(System.in);
System.out.println("삭제할 메뉴 코드를 입력하세요");
int menuCode = sc.nextInt();

String query = prop.getProperty("deleteMenu");
pstmt = con.prepareStatement(query);

pstmt.setInt(1, menuCode);

result = pstmt.executeUpdate();
```

| result | 의미 |
|---|---|
| 1 | 해당 코드 메뉴 삭제됨 |
| 0 | 그 코드의 메뉴가 **없음** (에러는 아님) |

---

## 6. SELECT와 차이 정리

| | SELECT | INSERT / UPDATE / DELETE |
|---|---|---|
| 메서드 | `executeQuery()` | `executeUpdate()` |
| 결과 변수 | `ResultSet rset` | `int result` |
| 결과 처리 | `while (rset.next())` | `if (result > 0)` |
| 닫을 것 | rset, pstmt, con | pstmt, con |

---

## 7. 주의할 점

> ⚠️ **FileInputStream도 닫아야 한다.**
> `FileInputStream queryStream = new FileInputStream(...)`을 try 안에서 그냥 만들면 닫히지 않는다.
> `try (FileInputStream queryStream = ...)` 처럼 **try-with-resources**로 쓰면 자동으로 닫힌다.

> ⚠️ **JDBC는 기본 autocommit = true**
> `executeUpdate()`가 끝나는 순간 DB에 바로 반영된다. 여러 작업을 묶으려면
> `con.setAutoCommit(false)` → 작업 → `con.commit()` / `con.rollback()` (DB 트랜잭션 TIL 참고)

> ⚠️ **DELETE 시 FK 주의**
> 다른 테이블이 참조 중인 메뉴를 지우면 FK 제약 때문에 막힐 수 있다 (`ON DELETE` 옵션 확인).
