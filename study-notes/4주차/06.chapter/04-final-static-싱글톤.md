# 04-final-static-싱글톤

---

## section06-1. final 키워드

### 1. 상수 (static final)

```java
public static final double PI = 3.141592; // 공유 + 변경 불가
// 네이밍: 전부 대문자, 단어 구분은 언더스코어 (SNAKE_CASE)
```

> `static`: 모든 객체가 공유
> `final`: 재할당 불가
> 둘 합치면 → 공유하면서 절대 못 바꾸는 상수

### 2. final 인스턴스 필드

```java
public class Person {
    final String ssn;      // 객체 생성 시 딱 한 번 결정, 이후 변경 불가
    private String name;   // 변경 가능

    public Person(String ssn, String name) {
        this.ssn = ssn;    // 반드시 생성자에서 초기화
        this.name = name;
    }
}
```

> final 필드는 반드시 생성자에서 초기화
> 이후 setter로 바꾸려 하면 컴파일 에러

---

## section06-2. static 키워드

### 1. static이란?

특정 객체가 아니라 **클래스에 속하는** 멤버.
객체 생성 없이 클래스 이름으로 접근, 모든 객체가 하나를 공유.

```java
private int personalLockerCount;         // 인스턴스 변수 — 객체마다 별도
private static int sharedLockerCount;    // 클래스 변수 — 모든 객체가 공유

Student.sharedLockerCount++;  // 클래스명으로 접근
this.personalLockerCount++;   // 인스턴스는 this로 접근
```

### 2. static 메소드 주의사항

```java
public static void printCount() {
    System.out.println(sharedLockerCount); // static 변수 접근 가능
    // System.out.println(personalLockerCount); // 에러 — 인스턴스 변수 접근 불가
    // this.name // 에러 — static 메소드에서 this 사용 불가
}
```

> static 메소드에서는 인스턴스 변수·메소드 직접 사용 불가
> static 메소드에서 this 사용 불가

---

## section06-3. 싱글톤 패턴 (Singleton)

### 1. 싱글톤이란?

특정 클래스의 인스턴스가 딱 하나만 생성되도록 보장하는 디자인 패턴.
DB 연결, 로그 시스템 등에서 사용.

### 2. 이른 초기화 (Eager)

클래스 로딩 시점에 즉시 인스턴스 생성.

```java
public class EagerSingleton {
    private static EagerSingleton eager = new EagerSingleton(); // 1. 미리 생성

    private EagerSingleton() {}  // 2. 외부 new 금지

    public static EagerSingleton getInstance() { // 3. 반환 통로
        return eager;
    }
}

EagerSingleton e1 = EagerSingleton.getInstance();
EagerSingleton e2 = EagerSingleton.getInstance();
System.out.println(e1 == e2); // true — 같은 객체
```

### 3. 늦은 초기화 (Lazy)

처음 호출될 때 인스턴스 생성.

```java
public class LazySingleton {
    private static LazySingleton lazy; // 처음엔 null

    private LazySingleton() {}

    public static LazySingleton getInstance() {
        if (lazy == null) {
            lazy = new LazySingleton(); // 최초 호출 시에만 생성
        }
        return lazy;
    }
}
```

> Eager: 클래스 로드 시 바로 생성 (항상 준비됨)
> Lazy: 처음 사용할 때 생성 (메모리 절약)

---

## 전체 흐름 정리

    final
    └─ static final: 공유 + 변경 불가 상수 (SNAKE_CASE)
    └─ final 인스턴스 필드: 생성자에서 딱 한 번 초기화, 이후 변경 불가

    static
    └─ 클래스에 소속, 모든 객체가 공유
    └─ 클래스명으로 접근: Student.sharedLockerCount
    └─ static 메소드에서 인스턴스 변수·this 사용 불가

    싱글톤
    └─ 생성자 private → 외부 new 금지
    └─ private static 필드에 인스턴스 하나 보관
    └─ public static getInstance()로만 접근
    └─ Eager: 클래스 로드 시 생성 / Lazy: 첫 호출 시 생성

    자주 헷갈리는 것
    └─ final 배열: 배열 변수 재할당은 불가, 배열 요소 변경은 가능
    └─ static 메소드 ≠ 인스턴스 메소드 (this, 인스턴스 멤버 사용 불가)
    └─ 싱글톤에서 == 비교가 true인 이유: 같은 객체(주소)를 가리키기 때문
