# 02-추상화-DTO

---

## section03-1. 추상화 (Abstraction)

### 1. 추상화란?

복잡한 내부 구현은 숨기고, 외부에는 필요한 기능만 의미있는 이름으로 보여주는 것.

```java
// 사용자는 racer에게 요청만 함 — 내부 동작 몰라도 됨
racer.startUp();
racer.stepAccelerator();
racer.stepBrake();
racer.turnOff();
```

> Car의 isOn, speed, 내부 로직은 숨겨져 있음
> 사용자는 CarRacer의 메소드 이름만 보고 사용

### 2. has-a 관계 (소유 관계)

CarRacer가 Car를 소유하고 있는 구조.

```java
public class CarRacer {
    private final Car myCar = new Car(); // CarRacer는 Car를 가지고 있다

    public void stepAccelerator() {
        myCar.go(); // 내부적으로 Car의 메소드 호출
    }
}
```

> 상속(is-a)과 다름: CarRacer는 Car가 아니라 Car를 소유함
> final: myCar에 다른 Car 객체를 재할당할 수 없음

---

## section03-2. DTO (Data Transfer Object)

### 1. DTO란?

여러 데이터를 하나로 묶어 전달하기 위한 객체.
로직 없이 데이터 저장·전달만 담당.

```java
MemberDTO member = new MemberDTO();
member.setName("판다");
member.setAge(5);
System.out.println(member.getName());
```

### 2. boolean 필드 getter 이름

boolean 타입은 getter 이름이 `get` 대신 `is`로 시작.

```java
private boolean isActivated;

public boolean isActivated() { return isActivated; }   // getIsActivated() 아님
public void setActivated(boolean activated) { isActivated = activated; }
```

---

## section04. 생성자 (Constructor)

### 1. 생성자란?

`new`로 객체를 만들 때 호출되어 객체의 초기 상태를 설정하는 것.

```java
// 생성자 작성 규칙
// 1. 이름이 클래스명과 동일
// 2. 반환 타입 없음 (void도 쓰지 않음)

public User() { }                              // 기본 생성자
public User(String id, String pwd, String name) { // 매개변수 있는 생성자
    this.id = id;
    this.pwd = pwd;
    this.name = name;
}
```

### 2. 기본 생성자 주의사항

```java
// 생성자가 하나도 없으면 컴파일러가 자동으로 기본 생성자 추가
User user = new User(); // 가능

// 매개변수 있는 생성자가 하나라도 있으면 기본 생성자 자동 추가 안 됨
// → 기본 생성자도 필요하면 직접 써야 함
```

### 3. this() — 같은 클래스 내 다른 생성자 호출

```java
public User(String id, String pwd, String name, Date enrollDate) {
    this(id, pwd, name);       // 반드시 첫 번째 줄에 작성
    this.enrollDate = enrollDate;
}
```

> this(): 같은 클래스의 다른 생성자 호출 (코드 중복 줄이기)
> super(): 부모 클래스 생성자 호출 (상속에서 사용)
> 둘 다 반드시 생성자 첫 번째 줄에 작성

### 4. setter vs 생성자

```java
// setter 방식 — 나중에 값 설정
User user = new User();
user.setId("user01");
user.setName("판다");

// 생성자 방식 — 생성 시점에 바로 설정
User user = new User("user01", "pass01", "판다");
```

> 필수값이 있다면 생성자로 받는 게 더 안전
> setter는 나중에 변경이 필요할 때 유용

---

## 전체 흐름 정리

    추상화
    └─ 내부 복잡한 로직은 숨기고 의미있는 메소드 이름으로만 노출
    └─ has-a 관계: CarRacer가 Car를 소유 (final로 재할당 방지)

    DTO
    └─ 데이터 전달용 객체, 로직 없음
    └─ boolean 필드 getter는 is로 시작

    생성자
    └─ new 할 때 자동 호출, 초기값 설정
    └─ 매개변수 있는 생성자 작성 시 기본 생성자 자동 추가 안 됨
    └─ this(): 같은 클래스 내 다른 생성자 호출, 첫 줄에 작성
    └─ super(): 부모 생성자 호출, 첫 줄에 작성

    자주 헷갈리는 것
    └─ this.필드 = 현재 객체 필드 / this() = 다른 생성자 호출
    └─ boolean getter는 isXxx(), 나머지는 getXxx()
    └─ 생성자는 반환 타입 없음 (void도 쓰지 않음)
