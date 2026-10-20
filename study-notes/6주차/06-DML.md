# 06-DML

---

## 1. DML이란?

**Data Manipulation Language** — 테이블의 **데이터를 추가·수정·삭제**하는 명령어.

| 명령어 | 기능 |
|---|---|
| `INSERT` | 행 추가 |
| `UPDATE` | 행 수정 |
| `DELETE` | 행 삭제 |
| `REPLACE` | 있으면 덮어쓰고, 없으면 추가 |

> SELECT는 조회(DQL), CREATE/DROP은 구조 변경(DDL)

---

## 2. INSERT — 행 추가

### 모든 컬럼에 순서대로

```sql
INSERT INTO tbl_menu
VALUES (NULL, '순대국밥', 9000, 4, 'Y');
```

> 테이블 컬럼 **순서 그대로** 값을 넣어야 함 (menu_code, menu_name, menu_price, category_code, orderable_status)
> menu_code는 AUTO_INCREMENT라 `NULL` 넣으면 **자동으로 다음 번호** 부여 (22번)

### 컬럼 지정해서

```sql
INSERT INTO tbl_menu (menu_name, menu_price, orderable_status, category_code)
VALUES ('초콜릿', 5000, 'Y', 7);
```

> 지정한 컬럼 **순서대로** 값을 맞추면 됨 (테이블 순서와 달라도 OK)
> 생략한 컬럼은 기본값/AUTO_INCREMENT/NULL로 채워짐
> 실무에선 이 방식 추천 (테이블에 컬럼 추가돼도 안 깨짐)

### 여러 행 한 번에

```sql
INSERT INTO tbl_menu
VALUES
    (NULL, '바닐라아이스크림', 2000, 12, 'Y'),
    (NULL, '딸기아이스크림', 1000, 11, 'Y'),
    (NULL, '녹차아이스크림', 1700, 8, 'Y');
```

---

## 3. UPDATE — 행 수정

```sql
UPDATE tbl_menu
SET category_code = 7        -- 바꿀 내용
WHERE menu_code = 22;        -- 바꿀 대상
```

> 여러 컬럼 수정: `SET 컬럼1 = 값1, 컬럼2 = 값2`

⚠️ **WHERE 빼먹으면 테이블 전체 행이 수정됨**
→ Workbench는 Safe Updates 모드로 WHERE에 키 없는 UPDATE/DELETE를 기본으로 막아줌

---

## 4. DELETE — 행 삭제

```sql
-- 삭제 전에 대상 먼저 확인
SELECT * FROM tbl_menu WHERE menu_code = 22;

-- 확인 후 삭제
DELETE FROM tbl_menu
WHERE menu_code = 22;
```

> **SELECT로 먼저 확인 → 같은 WHERE로 DELETE** 습관
> WHERE 없으면 전체 삭제

---

## 5. REPLACE — 덮어쓰기

INSERT 시 PRIMARY KEY 또는 UNIQUE KEY가 **충돌**할 수 있다면, REPLACE로 덮어쓸 수 있다.

```sql
-- 17번이 이미 있으면 PRIMARY KEY 중복 에러
INSERT INTO tbl_menu VALUES (17, '참기름', 5000, 10, 'Y');

-- 17번이 있으면 기존 행 DELETE 후 새로 INSERT, 없으면 그냥 INSERT
REPLACE INTO tbl_menu VALUES (17, '참기름', 5000, 10, 'Y');
```

> 수정(UPDATE)이 아니라 **삭제 후 다시 추가**라는 점 주의
> 지정 안 한 컬럼은 기본값으로 초기화됨

---

## 6. 확인용 조회

```sql
-- 전체
SELECT * FROM tbl_menu;

-- 조건으로
SELECT menu_code, menu_name, category_code
FROM tbl_menu
WHERE menu_name = '순대국밥';
```

> DML 실행 후엔 항상 SELECT로 결과 확인

---

## 전체 흐름 정리

    INSERT
    └─ VALUES (...) : 테이블 컬럼 순서대로
    └─ (컬럼들) VALUES (...) : 지정 순서대로, 실무 추천
    └─ 여러 행: VALUES (...), (...), (...)
    └─ AUTO_INCREMENT 컬럼은 NULL → 자동 번호

    UPDATE
    └─ UPDATE 테이블 SET 컬럼 = 값 WHERE 조건

    DELETE
    └─ DELETE FROM 테이블 WHERE 조건

    REPLACE
    └─ 키 충돌 시 삭제 후 추가 (덮어쓰기)

    사고 방지
    └─ UPDATE/DELETE 전에 같은 WHERE로 SELECT 먼저
    └─ WHERE 없으면 전체 행 대상
    └─ Safe Updates 모드가 기본으로 막아줌