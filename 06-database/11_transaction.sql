# Transaction (트랜잭션) - ALL or Nothing 모두 성공하거나, 모두 실패해야 하는 하나의 작업 묶음

-- MYSQL 은 기본적으로 autocommit 모드가 켜져있다. 조절하고 싶다면 설정을 바꿔줘야 한다.

SET autocommit = OFF; -- 키는건 ON

-- 지금부터 트랜잭션을 시작하겠다! (수동 커밋 모드로 전환)
START TRANSACTION;

SELECT * FROM tbl_menu;

-- 임시 작업
INSERT INTO tbl_menu VALUES(null, '바나나해장국', 8500, 4, 'Y');
UPDATE tbl_menu SET menu_name = '수정 메뉴' WHERE menu_name = '열무김치라떼';
DELETE FROM tbl_menu WHERE menu_name = '우럭스무디';

-- 세 변경이 현재 연결에서 보이는지 중간 확인
SELECT * FROM tbl_menu;

-- START TRANSACTION 시점 이후에 수행했던 모든 작업을 '전부 취소'하고 트랜잭션 시작 전의 상태로 되돌림
ROLLBACK;	-- COMMIT 이후에는 소용이 없다.

SELECT * FROM tbl_menu;

SET autocommit = ON;
