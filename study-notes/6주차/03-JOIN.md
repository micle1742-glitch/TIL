# 03-JOIN

---

## 1. 별칭 (Alias)

### 컬럼 별칭

```sql
SELECT
    menu_name '메뉴 이름',   -- 띄어쓰기가 있으면 따옴표 필수
    menu_price AS price     -- 간단하면 따옴표 생략 가능, AS도 생략 가능
FROM
    tbl_menu;
```

### 테이블 별칭 (JOIN에서 필수)

```sql
SELECT
    a.menu_name,
    a.menu_price
FROM
    tbl_menu AS a;   -- AS 생략 가능: tbl_menu a
```

> 여러 테이블을 합칠 때 **어느 테이블의 컬럼인지** 구분하려고 사용
> `a.menu_name` = a 테이블의 menu_name

---

## 2. JOIN이란?

**두 개 이상의 테이블을 관계(공통 컬럼)를 기준으로 연결**해서 한 번에 조회하는 것.

```
tbl_menu                       tbl_category
menu_name   category_code  →   category_code   category_name
열무김치라떼      8         →         8         커피
```

> tbl_menu엔 카테고리 **번호**만 있고 **이름**은 tbl_category에 있음
> → JOIN으로 연결해야 "메뉴 이름 + 카테고리 이름"을 같이 볼 수 있음

---

## 3. INNER JOIN — 교집합

**양쪽 테이블에 짝이 있는 행만** 보여준다. 가장 기본적인 조인.

```sql
SELECT
    a.menu_name,
    b.category_name
FROM
    tbl_menu a
JOIN tbl_category b ON a.category_code = b.category_code;
```

> `JOIN` = `INNER JOIN` (INNER 생략 가능)
> `ON` 뒤에 **연결 조건** (어떤 컬럼끼리 같으면 짝인지)

---

## 4. OUTER JOIN — LEFT / RIGHT

### LEFT JOIN

**왼쪽 테이블은 전부** 보여주고, 오른쪽에 짝이 없으면 **NULL로 채움**.

```sql
-- 모든 카테고리 + 그 카테고리의 메뉴 (메뉴 없는 카테고리도 표시)
SELECT
    a.category_name,
    b.menu_name
FROM
    tbl_category a
LEFT JOIN tbl_menu b ON a.category_code = b.category_code;
```

> 메뉴가 하나도 없는 카테고리도 결과에 나오고, menu_name은 NULL
> INNER JOIN이었으면 메뉴 없는 카테고리는 아예 빠짐

### RIGHT JOIN

LEFT JOIN의 반대 (오른쪽 테이블 전부). 테이블 순서만 바꾸면 LEFT JOIN으로 똑같이 표현 가능해서 보통 LEFT를 주로 씀.

| JOIN | 결과 |
|---|---|
| INNER | 양쪽 다 짝 있는 행만 |
| LEFT | 왼쪽 전부 + 짝 없으면 NULL |
| RIGHT | 오른쪽 전부 + 짝 없으면 NULL |

> SET OPERATORS의 MINUS(차집합)를 `LEFT JOIN + IS NULL`로 구현한 게 이 원리

---

## 5. SELF JOIN — 같은 테이블끼리

같은 테이블 안에서 **행과 행 사이 관계**가 있을 때, 자기 자신과 조인.

```sql
-- 하위 카테고리와 그 상위 카테고리 이름
SELECT
    a.category_name AS '하위 카테고리',
    b.category_name AS '상위 카테고리'
FROM
    tbl_category a                 -- '하위' 역할
JOIN tbl_category b                -- '상위' 역할
    ON a.ref_category_code = b.category_code;
```

> tbl_category의 `ref_category_code`가 **같은 테이블의 category_code**를 가리킴
> 같은 테이블을 별칭 a, b로 **두 개처럼** 쓰는 게 핵심
> 비유: 직원 테이블에서 "직원 이름 + 그 직원의 상사 이름" 뽑기

---

## 전체 흐름 정리

    별칭
    └─ 컬럼: AS '이름' (띄어쓰기 있으면 따옴표)
    └─ 테이블: tbl_menu a → a.컬럼

    JOIN
    └─ 테이블 연결: FROM A JOIN B ON A.키 = B.키
    └─ INNER : 양쪽 짝 있는 것만
    └─ LEFT  : 왼쪽 전부, 없으면 NULL
    └─ SELF  : 같은 테이블을 a, b로 나눠서 연결

    자주 헷갈리는 것
    └─ JOIN만 쓰면 INNER JOIN
    └─ LEFT JOIN은 FROM 쪽(왼쪽) 기준
    └─ JOIN 쓸 땐 컬럼 앞에 a. b. 붙이기 (같은 이름 컬럼 충돌 방지)