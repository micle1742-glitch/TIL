import menus from "@/data/menu-detail.json"


//전체 메뉴 데이터 조회
export function getMenuList () {
    return menus;
}

export function getMenubyMenuCode(menuCode) {

    return menus.find(menu => menu.menuCode === Number(menuCode))
}

//메뉴명 전달받아 메뉴이름을 포함하고 있는 메뉴 목록 조회
export function searchMenu(searchMenuName) {

    //includes() : 문자열에 검색어가 포함되어 있는지 true/false로 반환
    return menus.filter(menu => menu.menuName.includes(searchMenuName))
}