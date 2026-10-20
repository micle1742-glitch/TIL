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
