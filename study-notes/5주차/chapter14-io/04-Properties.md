# 04-Properties

---

## 1. Properties란?

프로그램 설정 값을 코드에 흩어놓지 않고 **key=value 형태의 설정 파일**로 관리하는 도구.
Map과 비슷한 key-value 구조에 **저장(store)과 로딩(load) 기능**을 더한 것.

> key, value 모두 **String**이어야 함
> 내부적으로 Hashtable(Map 계열) → 순서 보장 X

---

## 2. 값 설정 후 파일로 저장 (store)

```java
String filepath = "chap14-Io/src/com/ohgiraffers/section04/properties/application.properties";

Properties prop = new Properties();
prop.setProperty("app.name", "fullstack-course");
prop.setProperty("app.version", "1.0");
prop.setProperty("app.language", "ko");

try (Writer writer = new OutputStreamWriter(
        new FileOutputStream(filepath), StandardCharsets.UTF_8)) {
    prop.store(writer, "application settings");   // 두 번째 인자 = 파일 맨 위 주석
} catch (IOException e) {
    e.printStackTrace();
}
```

저장된 파일:
```
#application settings
#Fri Oct 16 14:41:39 KST 2026
app.language=ko
app.name=fullstack-course
app.version=1.0
```

> `#`으로 시작하는 줄은 주석 (store 시 주석 + 날짜 자동 기록)

---

## 3. 파일에서 읽어오기 (load)

```java
Properties loadedProp = new Properties();

try (Reader reader = new InputStreamReader(
        new FileInputStream(filepath), StandardCharsets.UTF_8)) {
    loadedProp.load(reader);           // key=value를 읽어서 Properties에 저장
    System.out.println(loadedProp);
} catch (IOException e) {
    e.printStackTrace();
}

loadedProp.getProperty("app.name");      // fullstack-course
loadedProp.getProperty("app.version");   // 1.0
```

| 메소드 | 기능 |
|---|---|
| `setProperty(key, value)` | 값 설정 |
| `getProperty(key)` | 값 조회 (없으면 null) |
| `store(writer, 주석)` | 파일로 저장 |
| `load(reader)` | 파일에서 읽기 |

---

## 전체 흐름 정리

    Properties
    └─ key=value 설정 파일 관리, key·value 모두 String
    └─ setProperty / getProperty
    └─ store(): 파일 저장 / load(): 파일 읽기
    └─ OutputStreamWriter / InputStreamReader로 UTF-8 지정해서 한글 안전하게

    자주 헷갈리는 것
    └─ Map처럼 순서 보장 X
    └─ 변수명 대소문자 구분 (filepath ≠ filePath)
    └─ 실무: DB 접속 정보, 앱 설정 등을 코드 밖 파일로 분리할 때 사용