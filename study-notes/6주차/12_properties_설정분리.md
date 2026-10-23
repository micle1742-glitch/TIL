# JDBC 01. Properties로 DB 접속 정보 분리

> DB 주소·계정·비밀번호를 **코드 밖 설정 파일**로 빼서 관리하기

## 한눈에 보기

| 항목 | 내용 |
|---|---|
| 파일 형식 | `.properties` (`키=값`) |
| 읽는 클래스 | `java.util.Properties` |
| 핵심 메서드 | `load()`, `getProperty("키")` |
| 연결 | `DriverManager.getConnection(url, prop)` |

---

## 1. 왜 분리할까?

| 코드에 직접 작성 | properties 파일로 분리 |
|---|---|
| 비밀번호 바꾸면 **코드 수정 + 재컴파일** | 파일만 수정하면 끝 |
| GitHub에 올리면 비밀번호 노출 | `.gitignore`로 파일만 제외 가능 |
| 여러 클래스에 같은 정보 중복 | 한 곳에서 관리 |

---

## 2. 설정 파일 (jtbc-config.properties)

```properties
driver=com.mysql.cj.jdbc.Driver
url=jdbc:mysql://localhost:3306/menudb
user=ohgiraffers
password=ohgiraffers
```

- `=` 왼쪽이 **키**, 오른쪽이 **값**
- 따옴표, 세미콜론 없음
- 주석은 `#`

---

## 3. JDBCTemplate에서 읽기

```java
public static Connection getConnection() {
    Connection con = null;
    Properties prop = new Properties();

    // try-with-resources: 괄호 안에서 연 FileReader는 자동으로 닫힘
    try (FileReader reader = new FileReader("src/main/java/com/ohgiraffers/config/jtbc-config.properties")) {
        prop.load(reader);

        String driver = prop.getProperty("driver");
        String url = prop.getProperty("url");

        Class.forName(driver);                         // 드라이버 등록
        con = DriverManager.getConnection(url, prop);  // prop 통째로 전달

    } catch (IOException | ClassNotFoundException | SQLException e) {
        e.printStackTrace();
    }
    return con;
}
```

> 💡 `getConnection(url, prop)`처럼 Properties를 통째로 넘기면, 드라이버가 안에서 **`user`, `password` 키**를 알아서 꺼내 쓴다.
> 그래서 파일의 키 이름이 정확히 `user`, `password`여야 한다.

---

## 4. 자주 나는 에러

| 에러 | 원인 |
|---|---|
| `FileNotFoundException` | 파일 경로 틀림 (`src/main/java/...` 순서 확인) |
| `getProperty()`가 `null` | 파일의 키 이름과 코드의 키 이름 철자 다름 |
| `Access denied for user` | 계정/비밀번호 틀림 |
| `Unknown database` | url의 DB 이름 틀림 |

---

## 5. Git 주의

```gitignore
**/*-config.properties
```

> ⚠️ `.gitignore`에 추가해서 비밀번호가 GitHub에 올라가지 않게 한다.
> 단, Git에 백업이 안 되므로 **로컬 파일을 지우면 복구 불가**.
