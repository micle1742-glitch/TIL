# TIL 11. 인덱스 (INDEX)

> 데이터를 **빨리 찾기 위한 목차(색인)**

## 한눈에 보기

| 명령어 | 하는 일 |
|---|---|
| `CREATE INDEX 인덱스명 ON 테이블(컬럼)` | 인덱스 생성 |
| `SHOW INDEX FROM 테이블` | 인덱스 목록 확인 |
| `DROP INDEX 인덱스명 ON 테이블` | 인덱스 삭제 |
| `EXPLAIN SELECT ...` | 쿼리가 인덱스를 쓰는지 실행 계획 확인 |

> 📖 비유: 두꺼운 책에서 "트랜잭션"을 찾을 때
> 인덱스 없음 = 1쪽부터 끝까지 넘겨보기 (**Full Table Scan**)
> 인덱스 있음 = 맨 뒤 찾아보기에서 쪽수 확인 후 바로 이동

---

## 1. 인덱스 만들기

```sql
CREATE TABLE phone (
    phone_code  INT PRIMARY KEY,
    phone_name  VARCHAR(100) NOT NULL,
    phone_price DECIMAL(10, 2) NOT NULL
);

INSERT INTO phone VALUES
(1, 'iphone', 2400000),
(2, 'Galaxy',  200000),
(3, 'Xiaomi', 1700000);

CREATE INDEX idx_phone_name
ON phone (phone_name);

SHOW INDEX FROM phone;
```

| Key_name | Column_name | 설명 |
|---|---|---|
| `PRIMARY` | phone_code | PK는 **자동으로** 인덱스가 생김 |
| `idx_phone_name` | phone_name | 직접 만든 인덱스 |

> 💡 `PRIMARY KEY`, `UNIQUE` 제약 조건을 걸면 인덱스가 자동으로 만들어진다.

---

## 2. EXPLAIN으로 확인

```sql
EXPLAIN SELECT *
FROM phone
WHERE phone_name = 'iphone';
```

| | 인덱스 생성 전 | 인덱스 생성 후 |
|---|---|---|
| `type` | `ALL` (전체 스캔) | `ref` (인덱스로 찾음) |
| `key` | NULL | `idx_phone_name` |
| `rows` | 3 (전부 확인) | 1 |

### type 값 읽는 법 (위로 갈수록 좋음)

| type | 의미 |
|---|---|
| `const` | PK/UNIQUE로 딱 1건 찾음 |
| `ref` | 인덱스로 같은 값 찾음 |
| `range` | 인덱스로 범위 검색 (`BETWEEN`, `>` 등) |
| `index` | 인덱스 전체를 훑음 |
| `ALL` | 테이블 전체를 훑음 (가장 느림) |

> 💡 데이터가 3건처럼 아주 적으면 옵티마이저(실행 계획을 정하는 MySQL 내부 기능)가
> 인덱스보다 전체 스캔이 낫다고 판단할 수도 있다.

---

## 3. 인덱스 삭제

```sql
DROP INDEX idx_phone_name ON phone;
```

---

## 4. 장점과 단점

| 장점 | 단점 |
|---|---|
| WHERE, JOIN, ORDER BY 조회가 빨라짐 | 인덱스 저장 공간이 추가로 필요 |
| | INSERT/UPDATE/DELETE 때 인덱스도 같이 고쳐야 해서 **쓰기가 느려짐** |

### 언제 걸면 좋을까?

- ⭕ WHERE / JOIN 조건에 **자주** 쓰이는 컬럼
- ⭕ 값의 종류가 **다양한** 컬럼 (이름, 이메일, 아이디 등)
- ❌ 값 종류가 몇 개 안 되는 컬럼 (성별 `남/여`, 여부 `Y/N`)
- ❌ 데이터가 적거나, 수정이 아주 잦은 테이블

### 인덱스를 못 타는 경우

```sql
WHERE phone_name LIKE '%phone'        -- 앞에 %가 오면 X  ('iph%' 는 O)
WHERE UPPER(phone_name) = 'IPHONE'    -- 컬럼을 함수로 감싸면 X
WHERE phone_code = '1'                -- 타입이 달라 암시적 형변환이 일어나면 X일 수 있음
```
