# ORDER BY 기준컬럼
-- SELECT 문의 가장 마지막에 위치하며, 결과 집합을 하나 이상의 열로 정렬한다

-- 오름차순 정렬 (ASC 생략 가능, 기본값)
SELECT
    menu_code,
    menu_name,
    menu_price
FROM
    tbl_menu
ORDER BY
    menu_price;

-- 내림차순 정렬
SELECT
    menu_code,
    menu_name,
    menu_price
FROM
    tbl_menu
ORDER BY
    menu_price DESC,
    menu_name ASC; 
    
-- 연산 결과로 정렬 
SELECT
menu_code,
menu_pride,
menu_code * menu_price AS calculated_value# ORDER BY 기준컬럼
-- SELECT 문의 가장 마지막에 위치하며, 결과 집합을 하나 이상의 열로 정렬한다

-- 오름차순 정렬 (ASC 생략 가능, 기본값)
SELECT
    menu_code,
    menu_name,
    menu_price
FROM
    tbl_menu
ORDER BY
    menu_price;

-- 내림차순 정렬
-- 연산 결과로 정렬 (별칭 사용)
SELECT
    menu_code,
    menu_price,
    menu_code * menu_price AS calculated_value
FROM
    tbl_menu
ORDER BY
    calculated_value DESC;
    
-- FIELD :컬럼값이 목록의 몇번쨰에 있는지
SELECT FIELD('B','A','B','C');

-- 'N'을 1순위, 'Y'를 2순위로 정렬
-- 내림차순 시 NULL을 처음으로 (IS NULL DESC)
SELECT
    *
FROM
    tbl_category
ORDER BY
    ref_category_code IS NULL DESC,
    ref_category_code DESC;
    
SELECT
    menu_name,
    orderable_status
FROM
    tbl_menu
ORDER BY
    FIELD(orderable_status, 'N', 'Y');
    
-- null 값이 있는 컬럼에 대한 정렬alter
SELECT
	*
FROM
    tbl_category
ORDER BY
    ref_category_code IS NULL DESC,  -- NULL이면 true, 아니면 false 반환
    ref_category_code DESC;