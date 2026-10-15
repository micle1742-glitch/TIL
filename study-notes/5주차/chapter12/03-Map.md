# 03-Map

---

## 1. Map 특징

- **key-value를 한 쌍(Entry)**으로 묶어서 관리
- **key 중복 X** (같은 key로 넣으면 값 덮어씀)
- **value 중복 O**
- HashMap은 저장 순서 유지 X

```java
Map<String, String> hmap = new HashMap<>();
hmap.put("one", "java");
hmap.put("two", "jdbc");
hmap.put("three", "mysql");
hmap.put("two", "html");   // key 중복 → jdbc가 html로 덮어써짐
hmap.put("four", "java");  // value 중복은 OK
```

---

## 2. 주요 메소드

| 메소드 | 기능 |
|---|---|
| `put(key, value)` | 추가 (key 있으면 덮어씀) |
| `get(key)` | 조회 (없는 key면 null) |
| `remove(key)` | 삭제 |
| `keySet()` | 모든 key를 Set으로 |
| `entrySet()` | 모든 key-value 쌍을 Set으로 |

---

## 3. Map 순회

### keySet() — key 꺼내서 value 다시 조회

```java
Set<String> keys = hmap.keySet();
for (String key : keys) {
    System.out.println(key + " = " + hmap.get(key));
}
```

### entrySet() — key, value 한 번에

```java
Set<Map.Entry<String, String>> entrySet = hmap.entrySet();
for (Map.Entry<String, String> entry : entrySet) {
    System.out.println(entry.getKey() + " = " + entry.getValue());
}
```

> key, value 둘 다 필요하면 entrySet()이 더 직접적
> (keySet은 key로 get()을 한 번 더 해야 함)

---

## 전체 흐름 정리

    Map — key-value 쌍
    └─ key: 중복 X (같은 key put → 덮어쓰기)
    └─ value: 중복 O
    └─ HashMap: 순서 유지 X

    순회
    └─ keySet(): key만 꺼내서 get()으로 값 조회
    └─ entrySet(): getKey(), getValue()로 한 번에

    자주 헷갈리는 것
    └─ Map은 Collection 인터페이스 상속 X (List, Set이랑 계열 다름)
    └─ 없는 key로 get() → 에러 아니고 null
    └─ Map.Entry = key-value 한 쌍을 나타내는 타입