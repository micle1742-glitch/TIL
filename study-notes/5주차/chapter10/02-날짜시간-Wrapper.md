# 02-날짜시간-Wrapper

---

## section01-1. java.time (날짜/시간)

### 1. 주요 클래스

| 클래스 | 역할 |
|--------|------|
| LocalDate | 날짜만 |
| LocalTime | 시간만 |
| LocalDateTime | 날짜 + 시간 |
| ZonedDateTime | 날짜 + 시간 + 시간대 (국가별 서비스) |

### 2. 객체 생성

```java
LocalDate date = LocalDate.of(2026, 12, 25);
LocalTime time = LocalTime.of(14, 30);
LocalDateTime dt = LocalDateTime.of(date, time);

LocalDateTime now = LocalDateTime.now(); // 현재 날짜+시간
```

### 3. 정보 꺼내기

```java
dt.getYear()        // 2026
dt.getMonth()       // DECEMBER
dt.getMonthValue()  // 12
dt.getDayOfWeek()   // FRIDAY
```

### 4. 날짜 계산

```java
// java.time 객체는 불변 → 계산 결과를 새 변수에 저장해야 함
LocalDateTime deadline = dt.minusMinutes(20);
LocalDateTime nextWeek = dt.plusDays(7);
System.out.println(dt); // 원본 그대로
```

> String처럼 불변 객체 — 원본 안 바뀜, 결과를 반드시 변수에 저장

### 5. 날짜 비교

```java
dt.isBefore(now)  // dt가 now보다 이전이면 true
dt.isAfter(now)   // dt가 now보다 이후면 true
dt.isEqual(now)   // 같으면 true
```

### 6. 포매팅 (LocalDateTime ↔ String)

```java
// LocalDateTime → String (format)
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy년 MM월 dd일 HH시 mm분");
String ticket = dt.format(formatter);

// String → LocalDate (parse)
DateTimeFormatter parser = DateTimeFormatter.ofPattern("yyyyMMdd");
LocalDate parsed = LocalDate.parse("20261225", parser);
```

---

## section01-2. Wrapper 클래스

### 1. Wrapper란?

기본 자료형을 객체 형태로 감싸는 클래스.

| 기본 자료형 | Wrapper |
|------------|---------|
| int | Integer |
| double | Double |
| boolean | Boolean |
| char | Character |

### 2. 파싱 — String → 기본 자료형

```java
double height = Double.parseDouble("175.5");
int age = Integer.parseInt("20");

// 주의: 타입 안 맞으면 예외 발생
Integer.parseInt("3.14");    // 에러 (정수 아님)
Double.parseDouble("abc");   // 에러 (숫자 아님)
```

### 3. 오토 박싱 / 언박싱

```java
Integer age = 20;      // Auto-Boxing: int → Integer (자동)
int unboxed = age;     // Auto-Unboxing: Integer → int (자동)
```

### 4. null 주의

```java
Integer nullAge = null;
int current = nullAge; // NullPointerException — null을 언박싱하면 에러
```

### 5. Wrapper 값 비교

```java
Integer num1 = 128;
Integer num2 = 128;

num1 == num2        // 신뢰 불가 (주소 비교)
num1.equals(num2)   // true (값 비교) — 항상 이걸 써야 함
```

### 6. 숫자 → 문자열

```java
String s = String.valueOf(3.14);  // "3.14"
String s2 = 3.14 + "";           // "3.14" (간단하지만 덜 명시적)
```

---

## 전체 흐름 정리

    java.time
    └─ LocalDate / LocalTime / LocalDateTime 상황에 맞게 선택
    └─ 불변 객체 — 계산 결과는 반드시 새 변수에 저장
    └─ format(): 날짜 → 문자열 / parse(): 문자열 → 날짜
    └─ 날짜 비교: isBefore(), isAfter(), isEqual()

    Wrapper
    └─ 기본 자료형을 객체로 감싸는 클래스
    └─ 파싱: Integer.parseInt(), Double.parseDouble()
    └─ 오토 박싱/언박싱 자동으로 됨
    └─ null 언박싱 → NullPointerException
    └─ 값 비교는 equals() (== 사용 금지)

    자주 헷갈리는 것
    └─ java.time 객체는 불변 → plus/minus 결과를 새 변수에 받아야 함
    └─ parseInt("3.14") 에러 — double은 parseDouble() 써야 함
    └─ Wrapper == 비교는 127 이하에서만 true, 128부터 false → equals() 써야 안전
