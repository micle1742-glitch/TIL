# SELECT
-- SELECT 컬럼명 FROM 테이블명 : 테이블에서 원하는 컬럼의 데이터를 조회한다

-- 단일 열(컬럼) 데이터 검색
SELECT menu_name FROM tbl_menu;

-- 여러 열의 데이터 검색
SELECT
    menu_code,
    menu_name,
    menu_price
FROM
    tbl_menu;

-- 모든 열에서 데이터 검색(* : 모든 컬럼을 의미하는 와일드 카드)
SELECT * FROM tbl_menu;

-- FROM 없이 SELECT 단독 사용 (테이블 없이 연산·함수 결과 확인)
SELECT 6 + 3;
SELECT NOW();
SELECT CONCAT('홍','길동');
SELECT CONCAT('홍','길동') AS name;
