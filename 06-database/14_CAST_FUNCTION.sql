# CAST FUNCTIONS

# 명시적 형변환
-- CAST
-- CONVERT

SELECT
    AVG(menu_price) AS '변환 전 평균'
FROM
    tbl_menu;
    
-- CAST(값 AS 바꿀타입)
SELECT
	
    CAST(AVG(menu_price) AS SIGNED INTEGER) AS '메뉴 평균 가격'
FROM
    tbl_menu;
    
    # 암시적 형변환
SELECT '1' + '2';
