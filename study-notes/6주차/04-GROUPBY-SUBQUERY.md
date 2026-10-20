# 04-GROUPBY-SUBQUERY

---

## 1. GROUP BY

지정된 값이 같은 데이터들을 **하나의 그룹으로 묶는다**.

```sql
-- 카테고리별 가격 총합, 평균
SELECT
    category_code,
    SUM(menu_price) AS '가격 총합',
    AVG(menu_price) AS '가격 평균'
FROM
    tbl_menu
GROUP BY
    category_code;
```

> GROUP BY를 쓰면 SELECT에는 **GROUP BY에 쓴 컬럼 + 집계 함수**만 올 수 있음
> `menu_code` 같은 개별 컬럼은 그룹 안에 여러 개라 하나로 못 보여줌 → 에러

### 집계 함수

| 함수 | 기능 |
|---|---|
| `COUNT(*)` | 행 개수 |
| `SUM(컬럼)` | 합계 |
| `AVG(컬럼)` | 평균 |
| `MAX(컬럼)` | 최댓값 |
| `MIN(컬럼)` | 최솟값 |

```sql
-- 카테고리별 메뉴 개수
SELECT
    category_code,
    COUNT(*) AS '메뉴 개수'
FROM
    tbl_menu
GROUP BY
    category_code;
```

> 비유: 자바 스트림의 `groupingBy` + 집계 (어제 배운 거)

---

## 2. HAVING — 그룹 조건

```sql
-- 메뉴가 3개 이상인 카테고리만
SELECT
    category_code,
    COUNT(*) AS '메뉴 개수'
FROM
    tbl_menu
GROUP BY
    category_code
HAVING
    COUNT(*) >= 3;
```

| | WHERE | HAVING |
|---|---|---|
| 시점 | 그룹화 **전** | 그룹화 **후** |
| 대상 | 개별 행 | 그룹 |
| 집계 함수 | 사용 불가 | **사용 가능** |

> 처리 순서: FROM → WHERE → **GROUP BY → HAVING** → SELECT → ORDER BY → LIMIT

---

## 3. WITH ROLLUP — 소계·총계

```sql
-- 카테고리별 합계 + 맨 아래 전체 총합
SELECT
    category_code,
    SUM(menu_price)
FROM
    tbl_menu
GROUP BY
    category_code
WITH ROLLUP;
```

> 마지막 줄에 category_code가 **NULL**인 행 = 전체 총계

```sql
-- 가격별, 그 안에서 카테고리별 그룹화 + ROLLUP
SELECT
    menu_price,
    category_code,
    SUM(menu_price)
FROM
    tbl_menu
GROUP BY
    menu_price,
    category_code
WITH ROLLUP;
```

> 기준이 여러 개면 **앞 기준별 소계** + 전체 총계가 같이 나옴
> NULL 표시된 행이 소계/총계 행

---

## 4. 서브쿼리 (Subquery)

**쿼리 안에 들어간 또 다른 쿼리**. 안쪽 결과를 바깥 쿼리에서 사용.

### WHERE 절 서브쿼리

```sql
-- 1단계: 민트미역국의 카테고리 코드
SELECT category_code
FROM tbl_menu
WHERE menu_name = '민트미역국';

-- 2단계: 민트미역국과 같은 카테고리의 메뉴
SELECT
    menu_name,
    category_code
FROM
    tbl_menu
WHERE
    category_code = (SELECT category_code
                       FROM tbl_menu
                      WHERE menu_name = '민트미역국');
```

> 서브쿼리를 **먼저 단독 실행**해서 결과 확인 → 바깥 쿼리에 넣기 (디버깅 팁)
> `=`로 비교하면 서브쿼리 결과는 **딱 1개**여야 함 (여러 개면 IN 사용)

### FROM 절 서브쿼리 (파생 테이블)

즉석에서 만들어 쓰는 **임시 테이블**처럼 동작.

```sql
-- 가장 많은 메뉴가 포함된 카테고리의 메뉴 수
SELECT
    MAX(count) AS '최대 메뉴 수'
FROM
    (SELECT COUNT(*) AS 'count'
       FROM tbl_menu
      GROUP BY category_code) AS count_table;   -- 파생 테이블은 반드시 별칭 필요
```

> 집계 결과(카테고리별 개수)에 **또 집계(MAX)**를 하고 싶을 때 사용

### 상관 서브쿼리

서브쿼리가 **바깥 쿼리의 값을 참조**해서, 바깥 행마다 다시 실행됨.

```sql
-- 자기 카테고리 평균 가격보다 비싼 메뉴
SELECT
    menu_code,
    menu_name,
    menu_price
FROM
    tbl_menu a
WHERE
    menu_price > (SELECT AVG(menu_price)
                    FROM tbl_menu
                   WHERE category_code = a.category_code);
```

> `a.category_code` = 지금 바깥에서 보고 있는 메뉴의 카테고리
> 메뉴 하나 볼 때마다 "그 메뉴 카테고리의 평균"을 다시 계산

| 종류 | 위치 | 특징 |
|---|---|---|
| 일반 서브쿼리 | WHERE | 한 번 실행, 결과를 조건에 사용 |
| 파생 테이블 | FROM | 결과를 임시 테이블로, **별칭 필수** |
| 상관 서브쿼리 | WHERE | 바깥 행마다 실행, 바깥 값 참조 |

---

## 전체 흐름 정리

    GROUP BY
    └─ 같은 값끼리 묶기 + 집계 함수(COUNT, SUM, AVG, MAX, MIN)
    └─ SELECT엔 GROUP BY 컬럼 + 집계 함수만

    HAVING
    └─ 그룹화 후 조건 (집계 함수 사용 가능)
    └─ WHERE는 그룹화 전

    WITH ROLLUP
    └─ 소계 + 총계, NULL 행이 합계

    서브쿼리
    └─ 쿼리 안의 쿼리, 안쪽 먼저 단독 실행해서 확인
    └─ FROM 서브쿼리는 별칭 필수
    └─ 상관 서브쿼리는 바깥 값(a.컬럼) 참조

    전체 처리 순서
    └─ FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT

    자주 헷갈리는 것
    └─ WHERE에 COUNT() 못 씀 → HAVING
    └─ = 서브쿼리는 결과 1개만, 여러 개면 IN