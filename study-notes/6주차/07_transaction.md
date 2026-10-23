# TIL 07. 트랜잭션 (TRANSACTION)

> **모두 성공하거나, 모두 실패해야 하는** 하나의 작업 단위 (All or Nothing)

## 한눈에 보기

| 명령어 | 하는 일 |
|---|---|
| `START TRANSACTION` | 트랜잭션 시작 |
| `COMMIT` | 지금까지 작업을 **확정** (DB에 영구 반영) |
| `ROLLBACK` | 지금까지 작업을 **취소** (시작 전으로 되돌림) |
| `SET autocommit = 0 / 1` | 자동 커밋 끄기 / 켜기 |

### 왜 필요할까? — 계좌 이체 예시

```
1) A 계좌에서 10만원 빼기
2) B 계좌에 10만원 넣기
```

1번만 성공하고 2번에서 에러가 나면 돈이 증발한다.
→ 둘을 **하나로 묶어서** 둘 다 성공하면 `COMMIT`, 하나라도 실패하면 `ROLLBACK`.

---

## 1. autocommit

MySQL은 기본적으로 **autocommit = ON**이다.
→ INSERT / UPDATE / DELETE를 실행하는 순간 바로 COMMIT된다. (되돌릴 수 없음)

```sql
SELECT @@autocommit;   -- 1 = ON, 0 = OFF
SET autocommit = OFF;  -- 이제부터 COMMIT 해야 반영됨
SET autocommit = ON;
```

> 💡 `START TRANSACTION`을 쓰면 autocommit을 안 꺼도
> **그 트랜잭션이 끝날 때까지만** 자동 커밋이 멈춘다. 보통은 이 방법을 쓴다.

---

## 2. COMMIT / ROLLBACK 흐름

```sql
START TRANSACTION;

INSERT INTO tbl_menu VALUES (NULL, '순대국밥', 10000, 4, 'Y');
UPDATE tbl_menu SET menu_name = '수정한 메뉴' WHERE menu_code = 5;
DELETE FROM tbl_menu WHERE menu_code = 5;

SELECT * FROM tbl_menu;  -- 내 세션에서는 바뀐 결과가 보임

ROLLBACK;                -- 위 3개 작업 전부 취소
SELECT * FROM tbl_menu;  -- 시작 전 상태로 돌아옴
```

| 상황 | 결과 |
|---|---|
| `START TRANSACTION` → 작업 → `COMMIT` | 작업 내용 확정 |
| `START TRANSACTION` → 작업 → `ROLLBACK` | 작업 전부 취소 |
| `ROLLBACK` 다음에 `COMMIT` | 이미 다 취소돼서 **확정할 게 없음** |
| `COMMIT` 다음에 `ROLLBACK` | 이미 확정돼서 **되돌릴 수 없음** |

> ⚠️ 실습 파일처럼 `ROLLBACK; COMMIT;`을 연달아 실행하면 ROLLBACK이 먼저 되므로
> 결국 아무것도 반영되지 않는다. 둘 중 **하나만** 실행하는 것.

---

## 3. 주의할 점

### ROLLBACK이 안 되는 것들 — DDL

`CREATE`, `ALTER`, `DROP`, `TRUNCATE` 같은 DDL은 실행하면
**그 전까지의 작업까지 자동으로 COMMIT**(암시적 커밋)된다.

```sql
START TRANSACTION;
DELETE FROM tbl_menu WHERE menu_code = 1;
CREATE TABLE tmp (id INT);   -- ← 여기서 위 DELETE까지 자동 COMMIT
ROLLBACK;                    -- 되돌릴 게 없음
```

### InnoDB에서만 동작

트랜잭션은 `ENGINE=InnoDB` 테이블에서 지원된다. (MyISAM은 지원 안 함)
MySQL 8.0의 기본 엔진은 InnoDB.

---

## 4. 트랜잭션의 4가지 성질 (ACID)

| 성질 | 뜻 | 한 줄 설명 |
|---|---|---|
| **A**tomicity | 원자성 | 전부 되거나 전부 안 되거나 |
| **C**onsistency | 일관성 | 작업 전후로 규칙(제약 조건)이 깨지지 않음 |
| **I**solation | 격리성 | 동시에 실행되는 트랜잭션끼리 서로 간섭하지 않음 |
| **D**urability | 지속성 | COMMIT된 결과는 장애가 나도 남아 있음 |
