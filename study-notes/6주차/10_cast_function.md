# TIL 10. 형변환 함수 (CAST FUNCTIONS)

> 값의 **데이터 타입을 다른 타입으로 바꾸는 것**

## 한눈에 보기

| 구분 | 방법 | 예시 |
|---|---|---|
| 명시적 형변환 | 내가 직접 바꿈 | `CAST(값 AS 타입)`, `CONVERT(값, 타입)` |
| 암시적 형변환 | MySQL이 알아서 바꿈 | `SELECT '1' + '2';` → `3` |

---

## 1. 명시적 형변환

### CAST / CONVERT

```sql
CAST(값 AS 바꿀타입)
CONVERT(값, 바꿀타입)     -- 순서만 다르고 기능은 같다
```

### 바꿀 수 있는 타입

| 타입 | 의미 |
|---|---|
| `SIGNED` / `SIGNED INTEGER` | 정수 (음수 포함) |
| `UNSIGNED` | 0 이상 정수 |
| `DECIMAL(M, D)` | 소수 (전체 M자리, 소수점 아래 D자리) |
| `CHAR` | 문자열 |
| `DATE` / `DATETIME` / `TIME` | 날짜 / 날짜+시간 / 시간 |

> ⚠️ MySQL에서는 `CAST(값 AS INT)`가 안 된다. **`SIGNED`** 로 써야 한다.

### 예시: 평균 가격을 정수로

```sql
-- 변환 전: AVG는 소수점이 길게 나옴
SELECT AVG(menu_price) AS '변환 전 평균'
FROM tbl_menu;
-- 예) 10221.7391

-- 변환 후
SELECT CAST(AVG(menu_price) AS SIGNED INTEGER) AS '메뉴 평균 가격'
FROM tbl_menu;
-- 예) 10222
```

> 💡 소수를 SIGNED로 바꾸면 버리는 게 아니라 **반올림**된다. (`10221.7391` → `10222`)
> 버림을 원하면 `FLOOR()`나 `TRUNCATE(값, 0)` 사용.

### 다른 예시

```sql
SELECT CAST('2026-10-21' AS DATE);        -- 문자 → 날짜
SELECT CAST(123 AS CHAR);                 -- 숫자 → 문자 '123'
SELECT CONVERT(3.14159, DECIMAL(5, 2));   -- 3.14
```

---

## 2. 암시적 형변환

**연산할 때 MySQL이 타입을 자동으로 맞춰준다.**

```sql
SELECT '1' + '2';     -- 3      (문자 → 숫자로 바꿔서 더함)
SELECT 5 + '10';      -- 15
SELECT '1abc' + 1;    -- 2      (앞의 숫자 부분 '1'만 사용, 경고 발생)
SELECT 'abc' + 1;     -- 1      (숫자로 못 바꾸는 문자는 0 취급)
```

> 💡 MySQL에서 `+`는 문자열 이어붙이기가 아니라 **무조건 숫자 덧셈**이다.
> 문자열을 이어붙이려면 `CONCAT('1', '2')` → `'12'`

> ⚠️ 암시적 형변환은 편하지만 예상과 다른 결과가 나오거나,
> WHERE 조건에서 일어나면 **인덱스를 못 타서 느려질 수 있다.**
> 타입이 다르면 명시적으로 맞춰주는 게 안전하다.
