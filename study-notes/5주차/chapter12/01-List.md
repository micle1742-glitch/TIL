# 01-List

---

## 1. 컬렉션 프레임워크

여러 데이터(객체)를 효과적으로 관리하기 위해 자바가 제공하는 클래스 묶음.
크게 **List, Set, Map** 인터페이스로 나뉨.

---

## 2. ArrayList

List 인터페이스의 대표 구현 클래스. **순서(인덱스) 있음 + 중복 허용**.

```java
List<String> stringList = new ArrayList<>(); // 인터페이스 타입으로 선언 (다형성)
stringList.add("apple");
stringList.add("apple");   // 중복 OK
```

> 제네릭 없이 `List alist = new ArrayList();` 하면 전부 Object 취급
> → 꺼낼 때마다 `(String) alist.get(0)` 형변환 필요

### 주요 메소드

| 메소드 | 기능 |
|---|---|
| `add(값)` | 추가 |
| `get(인덱스)` | 조회 |
| `set(인덱스, 값)` | 수정 |
| `remove(인덱스 or 값)` | 삭제 (없는 값이면 아무 일 없음) |
| `size()` | 요소 개수 |

---

## 3. 정렬

### Collections 클래스
컬렉션을 다루는 static 메소드 모음 (유틸리티 클래스).

```java
Collections.sort(stringList);                 // 오름차순
stringList.sort(Comparator.reverseOrder());   // 내림차순
```

### Comparable — 기본 정렬 기준 (클래스 안에 직접 구현)

```java
public class BookDTO implements Comparable<BookDTO> {
    @Override
    public int compareTo(BookDTO o) {
        return Integer.compare(this.number, o.getNumber()); // 책 번호 오름차순
    }
}

Collections.sort(bookList); // compareTo 기준으로 정렬
```

> 반환값: this가 작으면 음수 / 같으면 0 / 크면 양수
> 음수·0이면 자리 유지, 양수면 자리 바꿈

### Comparator — 다른 기준이 필요할 때 (클래스 밖에 따로 구현)

```java
public class AscendingPrice implements Comparator<BookDTO> {
    @Override
    public int compare(BookDTO o1, BookDTO o2) {
        return Integer.compare(o1.getPrice(), o2.getPrice()); // 가격 오름차순
    }
}

bookList.sort(new AscendingPrice());
```

| | Comparable | Comparator |
|---|---|---|
| 위치 | 정렬할 클래스 안 | 별도 클래스 |
| 메소드 | `compareTo(o)` | `compare(o1, o2)` |
| 용도 | 기본 정렬 기준 | 추가·다른 정렬 기준 |

---

## 4. LinkedList

이중 연결 리스트 방식. 각 요소가 **앞/뒤 요소만 기억**.

```java
List<String> linkedList = new LinkedList<>();
```

| | ArrayList | LinkedList |
|---|---|---|
| 내부 구조 | 배열 | 이중 연결 리스트 |
| 조회 | 빠름 (인덱스로 바로) | 느림 (처음부터 따라감) |
| 중간 추가·삭제 | 느림 (뒤 요소 밀기) | 빠름 (연결만 변경) |

> 추가·삭제 많다고 항상 LinkedList가 빠른 건 아님 (위치 찾는 데 시간 걸림)

---

## 5. Stack — 후입선출(LIFO)

나중에 넣은 게 먼저 나옴. 예: 브라우저 뒤로가기, 실행 취소.
현재는 `Stack` 클래스 대신 **ArrayDeque**를 스택처럼 사용.

```java
Deque<Integer> stack = new ArrayDeque<>();
stack.push(1);      // 넣기
stack.peek();       // 맨 위 확인 (안 꺼냄)
stack.pop();        // 맨 위 꺼내기
stack.isEmpty();    // 비었는지
```

---

## 6. Queue — 선입선출(FIFO)

먼저 넣은 게 먼저 나옴. 예: 줄 서기, 대기열.
Queue는 인터페이스 → 실제 객체는 **ArrayDeque**로 생성.

```java
Queue<String> queue = new ArrayDeque<>();
queue.offer("first");  // 맨 뒤에 추가
queue.peek();          // 맨 앞 확인
queue.poll();          // 맨 앞 꺼내고 제거, 비었으면 null
```

| | Stack | Queue |
|---|---|---|
| 방식 | LIFO | FIFO |
| 넣기 | `push()` | `offer()` |
| 확인 | `peek()` | `peek()` |
| 꺼내기 | `pop()` | `poll()` |

---

## 7. 제네릭 와일드카드

정확한 요소 타입은 달라도 **메소드가 허용할 타입 범위**를 정하는 문법.

```java
// List<Number> numberList = integerList; // 에러 — 제네릭은 업캐스팅 안 됨
```

> Integer는 Number 자식이지만, `List<Integer>`는 `List<Number>`의 자식이 아님

| 문법 | 의미 | 용도 |
|---|---|---|
| `<?>` | 아무 타입 | 읽기만 (Object로 받음) |
| `<? extends Number>` | Number와 그 **자식** | 꺼내서 쓰기 (sum 계산) |
| `<? super Integer>` | Integer와 그 **부모** | 넣기 (add) |

```java
private static double sum(List<? extends Number> list) {
    double total = 0;
    for (Number n : list) total += n.doubleValue();
    return total;
}

private static void addInteger(List<? super Integer> list) {
    list.add(100); // List<Integer>, List<Number>, List<Object> 다 가능
}
```

---

## 전체 흐름 정리

    List — 순서 O, 중복 O
    └─ ArrayList: 조회 빠름 (배열)
    └─ LinkedList: 중간 추가·삭제 유리 (연결 리스트)

    정렬
    └─ Collections.sort() / list.sort()
    └─ Comparable: 클래스 안, 기본 기준 (compareTo)
    └─ Comparator: 클래스 밖, 다른 기준 (compare)

    Stack / Queue (ArrayDeque로 구현)
    └─ Stack: LIFO — push / peek / pop
    └─ Queue: FIFO — offer / peek / poll

    와일드카드
    └─ <?> 아무거나 / <? extends> 꺼낼 때 / <? super> 넣을 때

    자주 헷갈리는 것
    └─ Comparable(able = 내가 비교 가능) vs Comparator(별도 비교기)
    └─ peek은 확인만, pop/poll은 꺼내면서 제거
    └─ 빈 Queue에 poll() → 에러 아니고 null
    └─ List<Integer>는 List<Number>에 못 담음 → 와일드카드 사용