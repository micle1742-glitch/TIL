# JDBC 05. JDBCTemplate과 close() 오버로딩

> 연결·해제처럼 **매번 반복되는 코드**를 공용 클래스로 빼서 static 메서드로 재사용

## 한눈에 보기

| 메서드 | 역할 |
|---|---|
| `getConnection()` | Connection 생성 후 반환 |
| `close(Connection)` | 연결 닫기 |
| `close(Statement)` | Statement / PreparedStatement 닫기 |
| `close(ResultSet)` | 결과 닫기 |

---

## 1. 왜 static?

```java
// static 아님 → 객체 만들어야 함
JDBCTemplate t = new JDBCTemplate();
t.getConnection();

// static → 바로 호출
JDBCTemplate.getConnection();
```

어디서 부르든 **하는 일이 똑같고**, 객체마다 다른 값(필드)을 쓸 일이 없으니 공용 도구처럼 static으로 만든다.

> 🧰 공구함의 드라이버 같은 것. 쓸 때마다 새로 만들 필요 없이 꺼내 쓴다.

---

## 2. close() 오버로딩

같은 이름, **매개변수 타입만 다르게** 3개를 만든다.

```java
public static void close(Connection con) {
    try {
        if (con != null && !con.isClosed()) {
            con.close();
        }
    } catch (SQLException e) {
        throw new RuntimeException(e);
    }
}

public static void close(Statement stmt) {
    try {
        if (stmt != null && !stmt.isClosed()) {
            stmt.close();
        }
    } catch (SQLException e) {
        throw new RuntimeException(e);
    }
}

public static void close(ResultSet rset) {
    try {
        if (rset != null && !rset.isClosed()) {
            rset.close();
        }
    } catch (SQLException e) {
        throw new RuntimeException(e);
    }
}
```

| 조건 | 이유 |
|---|---|
| `!= null` | 객체가 만들어지기 전에 에러 나면 null 상태 → NPE 방지 |
| `!isClosed()` | 이미 닫혔으면 다시 닫지 않음 |

> 💡 `close(pstmt)`도 동작한다. PreparedStatement가 Statement를 **상속**받기 때문 (다형성).

---

## 3. static import로 짧게 쓰기

```java
import static com.ohgiraffers.common.JDBCTemplate.*;

Connection con = getConnection();   // JDBCTemplate. 생략
...
close(rset);
close(pstmt);
close(con);
```

### ⚠️ 엉뚱한 import 주의

```java
import static jdk.internal.net.http.common.Utils.close;   // ❌ 자바 내부 다른 close
```

자동 import(Alt + Enter)할 때 목록이 여러 개 뜨면 **패키지 이름**을 꼭 확인한다.
잘못 가져오면 "인수를 Closeable로 형 변환" 같은 이상한 제안이 뜬다.

### close(rset)만 빨간 줄일 때

`close(con)`은 괜찮은데 `close(rset)`, `close(stmt)`만 빨간 줄
→ JDBCTemplate에 **Connection용 close만 있고** 나머지가 없는 것.
→ IntelliJ 제안(형 변환 등)은 누르지 말고, 오버로딩 메서드를 추가한다.

---

## 4. 예외 처리 방식 비교

| | `e.printStackTrace()` | `throw new RuntimeException(e)` |
|---|---|---|
| 에러 출력 | ⭕ | ⭕ |
| 그 다음 | 프로그램 **계속 진행** | 프로그램 **멈춤** |
| 쓰는 곳 | 학습용, close 실패처럼 무시해도 되는 곳 | 실패하면 더 진행하면 안 될 때 |

> 💡 수업 따라갈 땐 강사님 코드와 맞춰두는 게 덜 헷갈린다.
