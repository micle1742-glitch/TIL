# TIL 08. DDL (Data Definition Language)

> 데이터가 아니라 **테이블 같은 구조(틀)** 자체를 만들고, 바꾸고, 지우는 명령어

## 한눈에 보기

| 명령어 | 하는 일 |
|---|---|
| `CREATE` | 테이블 생성 |
| `ALTER` | 테이블 구조 변경 (컬럼 추가·삭제·수정) |
| `DROP` | 테이블 통째로 삭제 |
| `TRUNCATE` | 구조는 두고 데이터만 싹 비우기 |

> 💡 DML은 **데이터(행)**, DDL은 **구조(테이블·컬럼)** 를 다룬다.
> DDL은 실행 즉시 자동 COMMIT되어 ROLLBACK이 안 된다.

---

## 1. CREATE

```sql
CREATE TABLE IF NOT EXISTS 테이블명 (
    컬럼명 데이터타입(길이) [제약조건],
    ...
) ENGINE = INNODB;
```

```sql
CREATE TABLE IF NOT EXISTS tb1 (
    pk   INT,
    fk   INT,
    col1 VARCHAR(255)
) ENGINE = INNODB;

DESCRIBE tb1;   -- 테이블 구조 확인 (DESC tb1 도 같음)
```

- `IF NOT EXISTS` : 이미 있으면 에러 없이 넘어감 (없을 때만 생성)

### AUTO_INCREMENT

**INSERT할 때 번호를 자동으로 1씩 올려서 넣어준다.** 보통 PK에 사용.

```sql
CREATE TABLE IF NOT EXISTS tb2 (
    pk   INT AUTO_INCREMENT PRIMARY KEY,
    fk   INT,
    col1 VARCHAR(255)
) ENGINE = INNODB;

INSERT INTO tb2 VALUES (NULL, 10, 'Y');   -- pk = 1
INSERT INTO tb2 VALUES (NULL, 20, 'N');   -- pk = 2
```

- 값 자리에 `NULL`을 주거나 컬럼을 생략하면 자동 번호가 들어간다.
- 행을 DELETE해도 번호는 **되돌아가지 않는다.** (3번 지워도 다음은 4번)

---

## 2. ALTER

| 문법 | 하는 일 | 이름 변경 |
|---|---|:---:|
| `ADD 컬럼 타입` | 컬럼 추가 | - |
| `DROP COLUMN 컬럼` | 컬럼 삭제 | - |
| `CHANGE COLUMN 기존이름 새이름 타입` | 이름 + 타입 변경 | ⭕ |
| `MODIFY 컬럼 타입` | 타입만 변경 | ❌ |

```sql
-- 컬럼 추가
ALTER TABLE tb2 ADD col2 INT;

-- 컬럼 삭제
ALTER TABLE tb2 DROP COLUMN col2;

-- 이름 + 타입 변경 (fk → change_fk, INT → BIGINT)
ALTER TABLE tb2 CHANGE COLUMN fk change_fk BIGINT;

-- 타입만 변경 (BIGINT → INT)
ALTER TABLE tb2 MODIFY change_fk INT;
```

> 💡 `CHANGE`는 이름을 안 바꿔도 **기존 이름을 두 번** 써야 한다.
> (`CHANGE COLUMN a a BIGINT`) 이름 그대로면 `MODIFY`가 편하다.

> ⚠️ 타입을 작은 쪽으로 바꾸면(예: `VARCHAR(255)` → `VARCHAR(5)`)
> 기존 데이터가 안 맞아서 에러가 날 수 있다.

---

## 3. DROP

```sql
DROP TABLE IF EXISTS tb3;
```

- 테이블 구조 + 데이터 **전부 삭제.**
- `IF EXISTS` : 없어도 에러 없이 넘어감.
- 삭제된 테이블을 조회하면 `Table 'menudb.tb3' doesn't exist` 에러.

---

## 4. TRUNCATE

**구조는 남기고 데이터만 비운다. AUTO_INCREMENT 번호도 1부터 다시 시작.**

```sql
INSERT INTO tb4 VALUES (NULL, 10, 'Y'), (NULL, 20, 'N');   -- pk 1, 2

TRUNCATE TABLE tb4;

INSERT INTO tb4 VALUES (NULL, 10, 'Y'), (NULL, 20, 'N');   -- 다시 pk 1, 2
```

---

## 5. DELETE vs TRUNCATE vs DROP

| | `DELETE` | `TRUNCATE` | `DROP` |
|---|---|---|---|
| 분류 | DML | DDL | DDL |
| 지우는 것 | 행 (WHERE로 골라서 가능) | 모든 행 | 테이블 자체 |
| 테이블 구조 | 남음 | 남음 | **사라짐** |
| AUTO_INCREMENT | 유지 | **초기화** | - |
| ROLLBACK | 가능 (트랜잭션 안에서) | 불가 | 불가 |
| 속도 | 행마다 지워서 느림 | 빠름 | 빠름 |

> 🗂️ 비유: 서랍장에서 **DELETE** = 물건 몇 개 꺼내기,
> **TRUNCATE** = 서랍 싹 비우기, **DROP** = 서랍장 내다 버리기
