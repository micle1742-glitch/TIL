# 01-열거형(enum)

---

## 1. int 상수 방식의 문제점

enum 이전엔 인터페이스나 클래스에 `static final int` 상수를 모아서 사용했다.

```java
public interface Subjects {
    public static final int JAVA = 0;
    public static final int MYSQL = 1;
    public static final int JDBC = 2;

    public static final int HTML = 0;
    public static final int CSS = 1;
}
```

### 문제 1. 다른 의미인데 값이 같으면 같다고 판단

```java
int subject1 = Subjects.JAVA;   // 0
int subject2 = Subjects.HTML;   // 0
subject1 == subject2            // true → "같은 과목"으로 판단
```

### 문제 2. 범위 밖 값도 그냥 들어감 (타입 안전성 X)

```java
public static void printSubject(int subjectNumber) { ... }

printSubject(Subjects.MYSQL);   // 의도한 사용
printSubject(2);                // 숫자 직접 전달 가능
printSubject(100);              // 없는 과목 번호도 컴파일 통과
```

> int 매개변수는 "과목"이 아니라 "아무 정수"를 받기 때문

### 문제 3. 출력 시 의미를 알 수 없음

상수를 출력하면 `0`, `1`만 나옴 → 이름을 보려면 switch로 직접 변환해야 함

```java
switch (subjectNumber) {
    case Subjects.JAVA:  subject = "JAVA";  break;
    case Subjects.MYSQL: subject = "MYSQL"; break;
}
```

---

## 2. enum 기본

정해진 값들만 가질 수 있는 **전용 타입**을 만드는 문법.

```java
public enum Subjects {
    JAVA,
    MYSQL,
    HTML
}
```

> 상수 이름은 관례상 **전부 대문자** (SNAKE_CASE)

### int 상수 문제 해결

```java
Subjects s1 = Subjects.JAVA;
Subjects s2 = Subjects.HTML;
s1 == s2   // false — 값이 겹칠 일 자체가 없음
```

```java
public static void printSubject(Subjects subjects) { ... }

printSubject(Subjects.HTML);   // OK
// printSubject(2);            // 컴파일 에러 — Subjects 타입만 받음
```

```java
System.out.println(Subjects.HTML);   // HTML — 이름 그대로 출력 (toString)
```

---

## 3. enum 기본 메소드

```java
for (Subjects s : Subjects.values()) {
    System.out.println((s.ordinal() + 1) + "." + s.name());
}
// 1.JAVA
// 2.MYSQL
// 3.HTML
```

| 메소드 | 기능 |
|---|---|
| `values()` | 모든 상수를 배열로 반환 (순회용) |
| `ordinal()` | 선언된 순서 (0부터) |
| `name()` | 상수 이름을 문자열로 |
| `toString()` | 기본적으로 name()과 같음 |

> ordinal()은 선언 순서가 바뀌면 값도 바뀜 → 로직에 의존하지 않는 게 좋음

---

## 4. enum에 필드·생성자·메소드 추가

enum도 **클래스**라서 필드, 생성자, 메소드를 가질 수 있다.

```java
public enum UserRole {
    GUEST("게스트"),
    CONSUMER("구매자"),
    PRODUCER("판매자"),
    ADMIN("관리자");          // 상수 목록 끝엔 세미콜론

    private final String description;

    private UserRole(String description) {   // 생성자는 반드시 private
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public String getNameToLowerCase() {
        return this.name().toLowerCase();
    }
}
```

```java
UserRole admin = UserRole.ADMIN;
admin.name();                // ADMIN
admin.getDescription();      // 관리자
admin.getNameToLowerCase();  // admin
```

### enum 객체 생성 방식

- `new UserRole()` **불가** — 생성자가 private
- enum 클래스가 처음 사용될 때 **상수 개수만큼 생성자가 한 번씩** 호출되어 객체가 미리 만들어짐
- `UserRole.ADMIN`은 새로 만드는 게 아니라 **이미 만들어진 객체를 참조**
- 각 상수는 프로그램 전체에서 **딱 하나** → `==` 비교가 안전 (싱글톤과 비슷)

---

## 전체 흐름 정리

    int 상수의 문제
    └─ 다른 의미인데 값이 같으면 == true
    └─ 범위 밖 숫자도 매개변수로 들어감
    └─ 출력하면 숫자만 나옴

    enum
    └─ 정해진 값만 가지는 전용 타입 → 타입 안전성
    └─ 상수끼리 값 겹칠 일 없음, == 비교 안전
    └─ 출력하면 이름 그대로

    기본 메소드
    └─ values(): 전체 순회 / ordinal(): 순서 / name(): 이름

    확장
    └─ 필드, private 생성자, 메소드 추가 가능
    └─ 상수("값") 형태로 생성자에 값 전달

    자주 헷갈리는 것
    └─ enum은 new 불가, 미리 만들어진 상수를 참조하는 것
    └─ 생성자는 private (안 써도 자동 private)
    └─ 필드·메소드 있으면 마지막 상수 뒤에 ; 필수
    └─ 상수 이름은 대문자 관례