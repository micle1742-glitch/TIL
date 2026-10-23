# JDBC 02. Statement vs PreparedStatement

> SQL을 DB로 **실어 보내는 객체**. 값을 문자열로 이어 붙이느냐, `?` 자리에 끼워 넣느냐의 차이

## 한눈에 보기

| | Statement | PreparedStatement |
|---|---|---|
| 생성 | `con.createStatement()` | `con.prepareStatement(query)` |
| 값 넣는 방법 | 문자열 이어 붙이기 (`+`) | `?` 위치에 `setXxx()` |
| SQL Injection | **취약** | **안전** |
| 같은 쿼리 반복 | 매번 새로 해석 | 한 번 해석 후 재사용 (빠름) |
| 실무 | 거의 안 씀 | **기본** |

> 🚚 비유: Connection = DB까지 깔린 **도로**, Statement = SQL을 싣고 가는 **트럭**, ResultSet = 돌아올 때 싣고 오는 **결과**

---

## 1. Statement

```java
Connection con = getConnection();
Statement stmt = null;
ResultSet rset = null;

try {
    stmt = con.createStatement();
    rset = stmt.executeQuery("SELECT MENU_NAME, MENU_PRICE FROM TBL_MENU");

    while (rset.next()) {
        System.out.println(rset.getString("MENU_NAME") + ", " + rset.getInt("MENU_PRICE"));
    }
} catch (SQLException e) {
    e.printStackTrace();
} finally {
    close(rset);
    close(stmt);
    close(con);
}
```

---

## 2. PreparedStatement

```java
String query = "SELECT * FROM EMPLOYEE WHERE EMP_NAME LIKE CONCAT(?, '%')";

pstmt = con.prepareStatement(query);   // 쿼리를 미리 준비
pstmt.setString(1, empName);           // 1번째 ? 에 값 넣기

rset = pstmt.executeQuery();           // 실행 (쿼리는 이미 넣었으니 괄호 비움)
```

### setXxx() 정리

| 메서드 | 넣는 값 |
|---|---|
| `setString(순번, 값)` | 문자열 |
| `setInt(순번, 값)` | 정수 |
| `setDouble(순번, 값)` | 실수 |
| `setDate(순번, 값)` | 날짜 |

> ⚠️ `?` 순번은 **1부터** 시작한다. (배열처럼 0 아님)

> ⚠️ `?`는 **값 자리**에만 쓸 수 있다. 테이블명·컬럼명 자리엔 못 씀.

---

## 3. SQL Injection

사용자 입력을 SQL 문자열에 **그대로 이어 붙일 때** 생기는 공격.

### Statement로 로그인 체크 (위험)

```java
String id = sc.nextLine();
String query = "SELECT * FROM MEMBER WHERE ID = '" + id + "'";
stmt.executeQuery(query);
```

사용자가 `' OR '1'='1` 을 입력하면:

```sql
SELECT * FROM MEMBER WHERE ID = '' OR '1'='1'
```

→ `'1'='1'`은 항상 참이라 **모든 회원이 조회됨**

### PreparedStatement (안전)

```java
String query = "SELECT * FROM MEMBER WHERE ID = ?";
pstmt = con.prepareStatement(query);
pstmt.setString(1, id);
```

→ 입력값 전체를 **하나의 문자열 값**으로만 취급해서, `' OR '1'='1`이라는 아이디를 찾을 뿐 SQL 문법으로 해석하지 않는다.

---

## 4. ResultSet과 while(rset.next())

결과 표를 **커서(가리키는 손가락)**로 한 행씩 읽는다.

```
👉 시작: 첫 행 바로 위
   1행  열무김치라떼  4500
   2행  우럭스무디    5000
```

| 회차 | `next()` | 커서 | 반환 |
|---|---|---|---|
| 1 | 아래로 이동 | 1행 | true → 출력 |
| 2 | 아래로 이동 | 2행 | true → 출력 |
| 3 | 아래로 이동 | 행 없음 | **false → 종료** |

---

## 5. 실행 메서드

| 메서드 | SQL | 반환 |
|---|---|---|
| `executeQuery()` | SELECT | `ResultSet` |
| `executeUpdate()` | INSERT / UPDATE / DELETE | `int` (영향받은 행 수) |

---

## 6. 닫는 순서

만든 순서의 **반대**로 닫는다.

```java
close(rset);   // 3. ResultSet
close(pstmt);  // 2. (Prepared)Statement
close(con);    // 1. Connection
```
