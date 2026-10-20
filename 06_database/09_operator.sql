# set operators(집합 연산자)

-- union: 두결과를 합치기(중복은 제거)

-- 카테고리 코드가 10번인 메뉴들
-- 가격이 9000원 미만인 메뉴들

select menu_name, menu_price, category_code
from tbl_menu
where category_code = 10
union -- 두결과를 합쳐줌
select menu_name, menu_price, category_code
from tbl_menu
where menu_price < 9000;


-- union all
select menu_name, menu_price, category_code
from tbl_menu
where category_code = 10
union all -- 두결과를 합쳐줌(중복 포함)
select menu_name, menu_price, category_code
from tbl_menu
where menu_price < 9000;

/* 교집합 */
-- inner join 활용

select a.menu_code, a.menu_price
from tbl_menu a
where category_code = 10
and menu_code in(
				select menu_code, menu_price
				from tbl_menu
				where menu_price < 9000); -- 9000원 아래 가격의 코드와 price를 보여줌
                


/* 차집합 */
-- 10번 카테고리 메뉴 중에서 가격이 9천원 미만인 메뉴를 제외하는 차집합 조회
select a.menu_code, a.menu_price, b.menu_code "서브"
from tbl_menu a
left join(select menu_code, menu_price
		  from tbl_menu
		 where menu_price < 9000) b -- 9000원 아래 가격의 코드와 price를 보여줌
on a.menu_code = b.menu_code
where a.category_code = 10 and b.menu_code is null;


select menu_code, menu_price
		  from tbl_menu
		 where menu_price < 9000;
         
         
select a.menu_code, a.menu_price, b.menu_code "서브"
from tbl_menu a
left join(select menu_code, menu_price
		  from tbl_menu
		 where menu_price < 9000) b -- 9000원 아래 가격의 코드와 price를 보여줌
on a.menu_code = b.menu_code;


