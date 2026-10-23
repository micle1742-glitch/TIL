-- 데이터 조회
SELECT * FROM tbl_menu;

# INSERT
-- 새로운 행을 추가하는 구문이다.
INSERT INTO tbl_menu
VALUES (NULL, '순대국밥', 9000, 4, 'Y');

-- INSERT 하고 싶은 데이터 컬럼을 지정
INSERT INTO tbl_menu(menu_name, menu_price, orderable_status, category_code)
VALUES ('초콜릿', 5000, 'Y', 7);

-- 한번에 여러 행 추가
INSERT INTO tbl_menu
VALUES
    (NULL, '바닐라아이스크림', 2000, 12, 'Y'),
    (NULL, '딸기아이스크림', 1000, 11, 'Y'),
    (NULL, '녹차아이스크림', 1700, 8, 'Y');

-- 데이터 전체 조회
SELECT *
FROM tbl_menu;

-- 조건에 맞는 데이터 조회
SELECT
    menu_code,
    menu_name,
    category_code
FROM tbl_menu
WHERE menu_name = '순대국밥';

-- 데이터 수정
UPDATE tbl_menu
SET category_code = 7 -- 바꿀 내용
WHERE menu_code = 22;

# DELETE
-- 테이블에서 특정 행을 삭제하는 구문

SELECT
*
FROM
tbl_menu
WHERE
menu_code = 22;
DELETE FROM tbl_menu 
WHERE
    menu_code = 22;
    
#REPLACE
-- INSERT시 PRIMARY KEY 또는 UNIQUE KEY가 충돌이 발생할 수 있다면
-- REPLACE를 통해 중복 된 데이터를 덮어 쓸 수 있다.


-- PRIMARY KEY 중복 에러 발생!!
INSERT INTO tbl_menu VALUES(17, '참기름', 5000, 10, 'Y');

-- 해당 키의 데이터가 있으면 -> 기존 데이터를 삭제 (DELETE) 하고, 새로운 데이터를 INSERT 한다
REPLACE INTO tbl_menu VALUES(17, '참기름', 5000, 10, 'Y');

# Transaction (트랜잭션) - ALL or Nothing 모두 성공하거나, 모두 실패해야 하는 하나의 작업 단위

-- MYSQL은 기본적으로 autocommit 모드가 켜져 있다. 조절하고 싶다면 설정을 바꿔줘야한다.

SET autocommit = OFF;
SELECT * FROM tbl_menu;

-- 지금부터 트랜잭션을 시작하겠다!!
START TRANSACTION;

SELECT * FROM tbl_menu;

INSERT INTO  tbl_menu VALUES (null, '순대국밥', 10000, 4, 'Y');
UPDATE tbl_menu SET menu_name = '수정한 메뉴' WHERE menu_code = 5;

DELETE FROM tbl_menu
WHERE menu_code = 5;

ROLLBACK;
COMMIT;
