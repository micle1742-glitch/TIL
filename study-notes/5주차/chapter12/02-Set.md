# 02-Set

---

## 1. Set 특징

- **순서 보장 X**
- **중복 허용 X**

```java
List<String> alist = new ArrayList<>();
alist.add("java"); alist.add("mysql"); alist.add("java");
// [java, mysql, java] — 중복 저장됨

HashSet<String> hset = new HashSet<>();
hset.add("java"); hset.add("html"); hset.add("css"); hset.add("java");
// [css, java, html] 같은 식 — 중복 제거, 순서 뒤죽박죽
```

---

## 2. Set 순회

인덱스가 없어서 `get(i)` 불가 → 향상된 for문 또는 Iterator.

```java
// 향상된 for문
for (String value : hset) {
    System.out.println(value);
}

// Iterator
Iterator<String> iter = hset.iterator();
while (iter.hasNext()) {          // 다음 요소 있으면 true
    System.out.println(iter.next()); // 꺼내고 다음으로 이동
}
```

---

## 3. LinkedHashSet

중복 불가 유지 + **입력 순서 기억**.

```java
Set<String> lhset = new LinkedHashSet<>();
lhset.add("java"); lhset.add("html"); lhset.add("css"); lhset.add("java");
// [java, html, css] — 넣은 순서 그대로
```

---

## 4. TreeSet

중복 불가 + **저장할 때마다 자동 오름차순 정렬**.

```java
TreeSet<String> test = new TreeSet<>();
test.add("java"); test.add("css"); test.add("mysql"); test.add("html");
// [css, html, java, mysql] — 알파벳순
```

### 객체를 담을 때

정렬 기준이 필요함 → 요소가 **Comparable 구현**하거나, TreeSet 만들 때 **Comparator 전달**.

```java
TreeSet<BookDTO> bookSet = new TreeSet<>(); // BookDTO의 compareTo(번호 기준) 사용
bookSet.add(new BookDTO(2, "목민심서", "정약용", 30000));
bookSet.add(new BookDTO(1, "홍길동전", "허균", 50000));
bookSet.add(new BookDTO(4, "동의보감", "허준", 40000));
bookSet.add(new BookDTO(2, "다른 책", "다른 저자", 10000)); // 저장 안 됨!
```

> TreeSet은 **compareTo 결과가 0이면 같은 요소로 판단**해서 중복 제거
> 번호 2가 이미 있으니까 제목이 달라도 "다른 책"은 안 들어감

### 로또 번호 생성기

```java
Set<Integer> lotto = new TreeSet<>();
while (lotto.size() < 6) {
    lotto.add((int)(Math.random() * 45) + 1); // 중복은 자동 무시, 6개 될 때까지
}
// 중복 없음 + 자동 정렬
```

---

## 전체 흐름 정리

    Set — 순서 X, 중복 X
    └─ HashSet: 중복 제거만, 순서 보장 X
    └─ LinkedHashSet: 중복 제거 + 입력 순서 유지
    └─ TreeSet: 중복 제거 + 자동 정렬

    순회
    └─ 인덱스 없음 → get() 불가
    └─ 향상된 for문 / Iterator(hasNext, next)

    자주 헷갈리는 것
    └─ TreeSet에 객체 넣으려면 Comparable 또는 Comparator 필수
    └─ TreeSet 중복 판단 = compareTo 결과 0 (equals 아님)
    └─ 로또처럼 "중복 없이 + 정렬"이면 TreeSet이 딱