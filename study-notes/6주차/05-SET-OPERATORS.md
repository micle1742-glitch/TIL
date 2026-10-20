# 05-SET-OPERATORS

---

## 1. 집합 연산자란?

두 SELECT 결과를 **합치거나, 겹치는 것만 / 뺀 것만** 구하는 연산.

> 조건: 두 SELECT의 **컬럼 개수와 타입 순서가 같아야** 함

예제 집합
- **A** : 카테고리 코드가 10번인 메뉴
- **B** : 가격이 9000원 미만인 메뉴

---

## 2. UNION — 합집합 (중복 제거)

```sql
SELECT menu_name, menu_price, category_code
  FROM tbl_menu
 WHERE category_code = 10
UNION
SELECT menu_name, menu_price, category_code
  FROM tbl_menu
 WHERE menu_price < 9000;
```

> A, B 둘 다에 속하는 메뉴는 **한 번만** 나옴

## 3. UNION ALL — 합집합 (중복 포함)

```sql
SELECT menu_name, menu_price, category_code
  FROM tbl_menu
 WHERE category_code = 10
UNION ALL
SELECT menu_name, menu_price, category_code
  FROM tbl_menu
 WHERE menu_price < 9000;
```

> 겹치는 메뉴가 **두 번** 나옴
> 행 개수 차이 = A ∩ B 개수
> 중복 제거 과정이 없어서 UNION보다 빠름

---

## 4. 교집합 (INTERSECT)

10번 카테고리 **이면서** 9000원 미만인 메뉴

### IN 활용

```sql
SELECT a.menu_code, a.menu_price
  FROM tbl_menu a
 WHERE a.category_code = 10
   AND a.menu_code IN (SELECT menu_code
                         FROM tbl_menu
                        WHERE menu_price < 9000);
```

> ⚠️ IN 안의 서브쿼리는 **컬럼 1개만** 반환해야 함
> `SELECT menu_code, menu_price`처럼 2개 쓰면 `Operand should contain 1 column(s)` 에러

### INNER JOIN 활용

```sql
SELECT a.menu_code, a.menu_price
  FROM tbl_menu a
  JOIN (SELECT menu_code
          FROM tbl_menu
         WHERE menu_price < 9000) b ON a.menu_code = b.menu_code
 WHERE a.category_code = 10;
```

> INNER JOIN = 양쪽에 짝 있는 것만 → 교집합

---

## 5. 차집합 (MINUS)

10번 카테고리 메뉴 중에서 9000원 미만인 메뉴를 **제외**

```sql
SELECT a.menu_code, a.menu_price, b.menu_code "서브"
  FROM tbl_menu a
  LEFT JOIN (SELECT menu_code, menu_price
               FROM tbl_menu
              WHERE menu_price < 9000) b
    ON a.menu_code = b.menu_code
 WHERE a.category_code = 10
   AND b.menu_code IS NULL;
```

### 원리 확인 (단계별로 실행해보기)

```sql
-- 1) 서브쿼리만: 9000원 미만 메뉴
SELECT menu_code, menu_price
  FROM tbl_menu
 WHERE menu_price < 9000;

-- 2) WHERE 없이 LEFT JOIN만: 짝 없는 행은 "서브" 컬럼이 NULL
SELECT a.menu_code, a.menu_price, b.menu_code "서브"
  FROM tbl_menu a
  LEFT JOIN (SELECT menu_code, menu_price
               FROM tbl_menu
              WHERE menu_price < 9000) b
    ON a.menu_code = b.menu_code;
```

> LEFT JOIN은 A를 전부 남기고, B에 없으면 b 쪽이 NULL
> → `b.menu_code IS NULL` = **B에 없는 A만** = 차집합

---

## 6. MySQL 버전 참고

MySQL **8.0.31부터** INTERSECT, EXCEPT 키워드 직접 지원 (지금 사용 버전 8.0.40)

```sql
-- 교집합
SELECT menu_code, menu_price FROM tbl_menu WHERE category_code = 10
INTERSECT
SELECT menu_code, menu_price FROM tbl_menu WHERE menu_price < 9000;

-- 차집합 (MINUS는 Oracle 문법, MySQL/표준은 EXCEPT)
SELECT menu_code, menu_price FROM tbl_menu WHERE category_code = 10
EXCEPT
SELECT menu_code, menu_price FROM tbl_menu WHERE menu_price < 9000;
```

> 수업처럼 JOIN/IN으로 구현하는 방법은 이전 버전·다른 DB에서도 통하니까 같이 알아두기

---

## 전체 흐름 정리

    합집합
    └─ UNION : 중복 제거
    └─ UNION ALL : 중복 포함 (더 빠름)

    교집합 (A ∩ B)
    └─ IN (서브쿼리) : 서브쿼리 컬럼 1개만
    └─ INNER JOIN
    └─ INTERSECT (8.0.31+)

    차집합 (A − B)
    └─ LEFT JOIN + IS NULL
    └─ EXCEPT (8.0.31+), Oracle은 MINUS

    자주 헷갈리는 것
    └─ 두 SELECT 컬럼 개수·순서 맞추기
    └─ IN 서브쿼리에 컬럼 2개 쓰면 에러
    └─ 차집합 원리는 LEFT JOIN 결과를 WHERE 없이 먼저 보면 이해됨