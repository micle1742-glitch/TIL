# 01-Object-String-StringBuilder

---

## section01-1. Object 클래스

### 1. Object란?

자바의 최상위 클래스. 모든 클래스는 자동으로 Object를 상속함.
Object의 메소드를 오버라이딩해서 사용 가능.

### 2. toString() 오버라이딩

```java
// 기본: 클래스명@해시값 → 사람이 읽기 어려움
System.out.println(book1); // Book@1b6d3586

// 오버라이딩 후: 필드값을 보여줌
@Override
public String toString() {
    return "Book{number=" + number + ", title='" + title + "'}";
}
System.out.println(book1); // Book{number=1, title='홍길동전'}
```

> println(객체) 하면 자동으로 toString() 호출

### 3. equals() 오버라이딩

```java
// 동일성(==): 같은 객체(주소)인지 비교
System.out.println(book2 == book3); // false (다른 객체)

// 동등성(equals): 필드 값이 같으면 같다고 판단
@Override
public boolean equals(Object o) {
    if (o == null || getClass() != o.getClass()) return false;
    Book book = (Book) o;
    return number == book.number && Objects.equals(title, book.title);
}
System.out.println(book2.equals(book3)); // true (값이 같음)
```

> equals 오버라이딩 시 hashCode도 같이 오버라이딩해야 함
> IntelliJ: Alt + Insert → equals() and hashCode()

---

## section01-2. String

### 1. 주요 메소드

```java
String s = " [PROD-001] Apple iPhone ";

s.trim()                    // 앞뒤 공백 제거
s.toUpperCase()             // 대문자 변환
s.toLowerCase()             // 소문자 변환
s.indexOf('[')              // 특정 문자 위치 반환 (없으면 -1)
s.substring(1, 5)           // 1~4번 인덱스 문자열 추출
s.replace("iPhone", "Galaxy") // 특정 문자열 치환
s.split("/")                // 구분자로 분리 → 배열 반환
s.isEmpty()                 // 길이 0이면 true
```

### 2. 문자열 생성 방식

```java
String str1 = "java";           // 리터럴 — String Pool 재사용
String str2 = "java";
String str3 = new String("java"); // new — 새 객체 생성
String str4 = new String("java");

str1 == str2    // true (같은 Pool 주소)
str3 == str4    // false (다른 객체)
str3.equals(str4) // true (값 비교)
```

> 문자열 비교는 항상 equals() 사용 (== 은 주소 비교)

### 3. 문자열은 불변(immutable)

```java
str2 += " mysql"; // 기존 "java"가 바뀌는 게 아니라 새 객체 생성
// str1 == str2 → false (str2는 새 객체를 가리킴)
```

### 4. split() 주의사항

```java
// .은 정규식에서 특수문자 → 이스케이프 필요
"report.final.pdf".split("\\.");  // ["report", "final", "pdf"]
"100/홍길동//서울".split("/");     // 빈 문자열도 배열에 포함됨 → isEmpty() 체크
```

### 5. null 안전 비교

```java
String input = null;
"java".equals(input);  // false — 안전
input.equals("java");  // NullPointerException — 위험
```

> 리터럴을 앞에 두고 equals() 호출하는 게 안전

### 6. 이스케이프 문자

| 문자 | 의미 |
|------|------|
| `\n` | 줄바꿈 |
| `\t` | 탭 |
| `\"` | 쌍따옴표 |
| `\\` | 역슬래시 |

---

## section01-3. StringBuilder

### 1. String vs StringBuilder

| | String | StringBuilder |
|---|---|---|
| 변경 가능 여부 | 불변 (immutable) | 가변 (mutable) |
| 문자열 연결 시 | 새 객체 생성 | 내부 버퍼에 추가 |
| 반복 연결 성능 | 느림 | 빠름 |

> 반복문에서 문자열 연결할 때는 StringBuilder 사용

### 2. 주요 메소드

```java
StringBuilder sb = new StringBuilder("javamysql");

sb.delete(4, 9)       // 4~8번 인덱스 삭제 → "java"
sb.insert(0, "my")    // 0번 위치에 삽입 → "myjava"
sb.reverse()          // 순서 뒤집기 → "avajym"
sb.append("!")        // 뒤에 추가
sb.toString()         // String으로 변환
```

### 3. 메소드 체이닝

append()는 자기 자신을 반환 → 연속 호출 가능.

```java
StringBuilder query = new StringBuilder();
query.append("SELECT ")
     .append("* ")
     .append("FROM product ")
     .append("WHERE price > ")
     .append(10000);
// SELECT * FROM product WHERE price > 10000
```

---

## 전체 흐름 정리

    Object
    └─ 모든 클래스의 최상위 부모
    └─ toString() 오버라이딩 → println 시 필드값 출력
    └─ equals() 오버라이딩 → 값 기준 동등성 비교
    └─ equals 오버라이딩 시 hashCode도 함께

    String
    └─ 불변 객체 — 수정하면 새 객체 생성
    └─ 비교는 항상 equals() (== 은 주소 비교)
    └─ null 안전 비교: "리터럴".equals(변수)
    └─ split()에서 .은 정규식 특수문자 → \\. 로 이스케이프

    StringBuilder
    └─ 가변 객체 — 반복 문자열 연결 시 성능 유리
    └─ append().append() 체이닝 가능
    └─ 최종 결과는 toString()으로 String 변환

    자주 헷갈리는 것
    └─ == : 주소(동일성) / equals(): 값(동등성)
    └─ String + 반복 → 느림, StringBuilder.append() 반복 → 빠름
    └─ split(".")은 안 됨 → split("\\.")
