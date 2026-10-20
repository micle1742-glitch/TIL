# 02-WHERE-DISTINCT-LIMIT

---

## 1. WHERE

**조건 필터링** 역할. 조건이 true가 되는 행만 결과에 포함한다.

```sql
SELECT 컬럼 FROM 테이블 WHERE 조건;
```

> 처리 순서: FROM → **WHERE** → SELECT → ORDER BY

### (1) 비교 연산자

| 연산자 | 뜻 |
|---|---|
| `=` | 같다 |
| `<>`, `!=` | 같지 않다 |
| `>`, `<`, `>=`, `<=` | 크다, 작다, 이상, 이하 |

### (2) 논리 연산자 (AND, OR)

```sql
-- 주문 가능하면서(Y), 카테고리가 10번인 메뉴
SELECT
    menu_name,
    category_code,
    orderable_status
FROM
    tbl_menu
WHERE
    orderable_status = 'Y'
    AND category_code = 10;
```

| 연산자 | 뜻 |
|---|---|
| `AND` | 두 조건 **모두** 참 |
| `OR` | 둘 중 **하나라도** 참 |

### 우선순위: AND > OR

```sql
SELECT 1 OR 0 AND 0;     -- 1  → 1 OR (0 AND 0) = 1 OR 0
SELECT (1 OR 0) AND 0;   -- 0  → 괄호 먼저
```

> AND가 먼저 계산됨 → 섞어 쓸 땐 **괄호로 의도 명확히**
> MySQL에서 1 = true, 0 = false

### (3) BETWEEN — 범위

```sql
-- 가격이 1만원 이상, 2만 5천원 이하인 메뉴
SELECT
    menu_name,
    menu_price
FROM
    tbl_menu
WHERE
    menu_price BETWEEN 10000 AND 25000;
```

> **양 끝 값 포함** (`>= 10000 AND <= 25000`과 같음)
> 부정: `NOT BETWEEN`

### (4) LIKE — 패턴 검색

```sql
-- 메뉴 이름에 '마늘'이 포함된 메뉴
SELECT
    menu_name
FROM
    tbl_menu
WHERE
    menu_name LIKE '%마늘%';
```

| 패턴 | 뜻 |
|---|---|
| `'%마늘%'` | 어느 위치든 마늘 포함 |
| `'%마늘'` | 마늘로 끝남 |
| `'마늘%'` | 마늘로 시작 |
| `'_마늘'` | 마늘 앞에 **딱 한 글자** |

> `%` = 0글자 이상 아무거나, `_` = 정확히 한 글자

### (5) IN — 목록 중 하나

```sql
-- 카테고리 코드가 4, 5, 6번인 메뉴
SELECT
    menu_name,
    category_code
FROM
    tbl_menu
WHERE
    category_code IN (4, 5, 6);
```

> `category_code = 4 OR category_code = 5 OR category_code = 6`을 짧게 쓴 것
> 부정: `NOT IN`

### (6) IS NULL — 값이 없는 행

```sql
-- 상위 카테고리가 없는 카테고리 (최상위 카테고리)
SELECT
    category_code,
    category_name,
    ref_category_code
FROM
    tbl_category
WHERE
    ref_category_code IS NULL;
```

> NULL은 `= NULL`로 비교 불가 → 반드시 **`IS NULL` / `IS NOT NULL`**

---

## 2. DISTINCT — 중복 제거

중복된 값을 제거하고 고유한 값들의 목록만 보고 싶을 때.

```sql
-- 메뉴에 사용된 카테고리 코드 목록 (중복 없이)
SELECT
    DISTINCT category_code
FROM
    tbl_menu
ORDER BY
    category_code;
```

### 여러 열 DISTINCT

```sql
-- 지정된 모든 열의 "조합"이 같을 때만 중복으로 간주
SELECT
    DISTINCT category_code, orderable_status
FROM
    tbl_menu;
```

> (10, 'Y')와 (10, 'N')은 **다른 조합**이라 둘 다 남음
> DISTINCT는 SELECT 바로 뒤에 한 번만, 뒤 컬럼 전체에 적용됨

---

## 3. LIMIT — 개수 제한

결과 중에 원하는 만큼만 잘라서 가져오기.

```sql
-- 가격 비싼 메뉴 TOP 5
SELECT
    *
FROM
    tbl_menu
ORDER BY
    menu_price DESC
LIMIT 5;
```

### 시작 위치 지정

```sql
LIMIT [건너뛸 개수], [가져올 개수]

LIMIT 5;       -- 처음부터 5개
LIMIT 0, 5;    -- 같은 뜻
LIMIT 5, 5;    -- 앞 5개 건너뛰고 6번째부터 5개
```

> 게시판 **페이지네이션**(1페이지, 2페이지...)에 그대로 쓰임
> 보통 ORDER BY와 함께 사용 (정렬 안 하면 어떤 5개가 나올지 보장 X)
> SELECT 문의 가장 마지막에 위치

---

## 전체 흐름 정리

    WHERE (행 필터링)
    └─ 비교: = <> > < >= <=
    └─ 논리: AND > OR (괄호로 명확히)
    └─ BETWEEN a AND b : 범위 (양 끝 포함)
    └─ LIKE : % 아무거나, _ 한 글자
    └─ IN (...) : 목록 중 하나
    └─ IS NULL : NULL 비교는 = 아니고 IS
    └─ 부정은 NOT (NOT BETWEEN, NOT IN, NOT LIKE, IS NOT NULL)

    DISTINCT
    └─ 중복 제거, 여러 열이면 조합 기준

    LIMIT
    └─ LIMIT 개수 / LIMIT 건너뛸, 개수
    └─ ORDER BY랑 같이, 맨 마지막

    작성 순서
    └─ SELECT → FROM → WHERE → ORDER BY → LIMIT

    자주 헷갈리는 것
    └─ = NULL 안 됨, IS NULL
    └─ AND/OR 섞을 때 우선순위
    └─ LIKE 쿼리 끝 ; 빠뜨리지 않기