# JDBC 03. 쿼리를 XML 파일로 분리

> SQL을 Java 코드 안에 쓰지 않고 **XML 파일에 모아서** 키로 꺼내 쓰기

## 한눈에 보기

| 항목 | 내용 |
|---|---|
| 파일 | `employee-query.xml`, `menu-query.xml` |
| 읽는 방법 | `Properties.loadFromXML(InputStream)` |
| 꺼내는 방법 | `prop.getProperty("키")` |

---

## 1. 왜 분리할까?

| SQL을 코드에 직접 | XML로 분리 |
|---|---|
| 자바 코드와 SQL이 섞여 읽기 어려움 | 역할 분리 (Java = 로직, XML = 쿼리) |
| 쿼리 수정하려면 자바 파일 뒤져야 함 | 쿼리만 한 곳에서 관리 |
| 문자열 `+` 이어 붙이기 지저분함 | 여러 줄 SQL 그대로 작성 |

> 💡 나중에 배우는 **MyBatis**가 이 방식을 발전시킨 것

---

## 2. XML 파일 형식

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
    <entry key="selectEmpByFamilyName">
        SELECT E.*
        FROM employeedb.EMPLOYEE E
        WHERE E.EMP_NAME LIKE CONCAT(?, '%')
    </entry>
</properties>
```

- `<entry key="이름">` 안에 SQL 작성
- `key`가 Java에서 꺼낼 때 쓰는 이름
- `?`는 PreparedStatement 바인딩 자리

### LIKE와 `%` 위치

| XML 쿼리 | Java |
|---|---|
| `LIKE CONCAT(?, '%')` | `setString(1, "김")` |
| `LIKE ?` | `setString(1, "김" + "%")` |

> ⚠️ `LIKE ?`인데 `%` 없이 "김"만 넣으면, 이름이 정확히 "김"인 사람만 찾아서 결과가 안 나온다.

---

## 3. Java에서 읽기

```java
Properties prop = new Properties();

try (FileInputStream queryStream =
         new FileInputStream("src/main/java/com/ohgiraffers/section02/proparedstatement/employee-query.xml")) {

    prop.loadFromXML(queryStream);                       // XML 읽기
    String query = prop.getProperty("selectEmpByFamilyName");

    pstmt = con.prepareStatement(query);
    pstmt.setString(1, empName);
    rset = pstmt.executeQuery();
    ...
}
```

| | `.properties` (DB 설정) | `.xml` (쿼리) |
|---|---|---|
| 읽는 메서드 | `load(Reader)` | `loadFromXML(InputStream)` |
| 스트림 | `FileReader` | `FileInputStream` |

---

## 4. 자주 하는 실수

| 실수 | 결과 |
|---|---|
| 경로 `main/src/java/...` | `FileNotFoundException` → `src/main/java/...` 순서 확인 |
| `key` 이름 오타 | `getProperty()`가 `null` → `prepareStatement(null)`에서 에러 |
| `<!DOCTYPE>` 줄 빠짐 | `InvalidPropertiesFormatException` |
| 쿼리에 `employeedb.` 처럼 DB명 지정 | 해당 DB 권한 없으면 `SELECT command denied` |
