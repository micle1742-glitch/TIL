# 01-SELECT-ORDERBY

---

## 1. SELECT

테이블에서 원하는 컬럼의 데이터를 조회하는 구문.

```sql
SELECT 컬럼명 FROM 테이블명;
```

### 단일 열 조회

```sql
SELECT menu_name FROM tbl_menu;
```

### 여러 열 조회

```sql
SELECT
    menu_code,
    menu_name,
    menu_price
FROM
    tbl_menu;
```

> 컬럼은 쉼표(,)로 구분, **마지막 컬럼 뒤에는 쉼표 X**

### 모든 열 조회

```sql
SELECT * FROM tbl_menu;   -- * : 모든 컬럼을 의미하는 와일드카드
```

> 연습할 땐 편하지만, 실무에선 필요한 컬럼만 명시하는 게 좋음 (불필요한 데이터·구조 변경 대비)

### FROM 없이 SELECT 단독 사용

테이블 없이 연산이나 함수 결과만 확인할 때.

```sql
SELECT 6 + 3;                          -- 9
SELECT NOW();                          -- 현재 날짜·시간
SELECT CONCAT('홍', '길동');           -- 홍길동 (문자열 이어 붙이기)
SELECT CONCAT('홍', '길동') AS name;   -- 결과 컬럼 이름을 name으로
```

> `AS 별칭` : 결과 컬럼에 이름 붙이기 (alias)

---

## 2. ORDER BY

SELECT 문의 **가장 마지막**에 위치하며, 결과 집합을 하나 이상의 열로 정렬한다.

> SQL 처리 순서: FROM → WHERE → SELECT → **ORDER BY**
> 결과가 다 나온 뒤 마지막에 줄 세우는 것

### 오름차순 / 내림차순

```sql
-- 오름차순 (ASC, 기본값이라 생략 가능)
SELECT menu_code, menu_name, menu_price
FROM tbl_menu
ORDER BY menu_price;

-- 내림차순 + 2차 정렬 기준
SELECT menu_code, menu_name, menu_price
FROM tbl_menu
ORDER BY
    menu_price DESC,   -- 1순위: 가격 높은 순
    menu_name ASC;     -- 2순위: 가격 같으면 이름순
```

| 키워드 | 정렬 |
|---|---|
| `ASC` | 오름차순 (작은 → 큰), 기본값 |
| `DESC` | 내림차순 (큰 → 작은) |

### 연산 결과로 정렬 (별칭 사용)

```sql
SELECT
    menu_code,
    menu_price,
    menu_code * menu_price AS calculated_value
FROM
    tbl_menu
ORDER BY
    calculated_value DESC;
```

> ORDER BY는 SELECT 다음에 처리되므로 **SELECT에서 만든 별칭을 ORDER BY에서 사용 가능**

### FIELD 함수로 원하는 순서 지정

```sql
-- FIELD(값, 목록...) : 값이 목록의 몇 번째에 있는지 반환
SELECT FIELD('B', 'A', 'B', 'C');   -- 2

-- 'N'을 1순위, 'Y'를 2순위로 정렬
SELECT
    menu_name,
    orderable_status
FROM
    tbl_menu
ORDER BY
    FIELD(orderable_status, 'N', 'Y');
```

> N → 1, Y → 2 로 바뀌어서 그 숫자 순으로 정렬됨
> 알파벳/숫자 순이 아닌 **내가 정한 순서**로 정렬할 때 사용

### NULL 값 정렬

```sql
-- 내림차순 정렬 시 NULL을 맨 처음으로
SELECT
    *
FROM
    tbl_category
ORDER BY
    ref_category_code IS NULL DESC,   -- NULL이면 1(true), 아니면 0(false) → 1이 먼저
    ref_category_code DESC;
```

> MySQL은 오름차순에서 NULL이 맨 앞, 내림차순에서 맨 뒤
> `IS NULL`로 true/false를 만들어 정렬 기준에 넣으면 NULL 위치를 직접 조절 가능

---

## 전체 흐름 정리

    SELECT
    └─ SELECT 컬럼 FROM 테이블
    └─ * : 전체 컬럼 / AS : 별칭
    └─ FROM 없이 연산·함수 결과 확인 가능 (NOW, CONCAT)

    ORDER BY
    └─ SELECT 문 가장 마지막
    └─ ASC(기본) / DESC
    └─ 여러 기준: 앞이 같으면 뒤 기준으로
    └─ 별칭으로 정렬 가능 (SELECT 다음에 처리되니까)
    └─ FIELD() : 내가 정한 순서로 정렬
    └─ IS NULL DESC : NULL 위치 조절

    자주 헷갈리는 것
    └─ ORDER (r 빠뜨리기 주의), orderable_status 철자
    └─ 마지막 컬럼 뒤 쉼표 X
    └─ 쿼리 끝 ; 빠지면 다음 쿼리랑 붙어서 에러