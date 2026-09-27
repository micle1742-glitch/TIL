'use client'
import MenuItem from "@/item/MenuItem";
import { searchMenu } from "@/lib/MenuAPI";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense} from "react"

    function MenuSearchResultContent() {
    
    const [menuList, setMenuList] = useState([]);

    //쿼리 스트링 객체 가져오기
    const searchParams = useSearchParams();

    // ?menuName = 열무에서 '열무'라는 키값추출
    const menuName = searchParams.get('menuName')
    console.log(menuName);

    useEffect(() => {
        setMenuList(searchMenu(menuName))
    },[menuName])

    return (
        <>
        <main className="searchPage">
            <h1>검색 결과!</h1>
            <div>
                {menuList.map(menu => 
                    (<MenuItem
                     key={menu.menuCode}
                      menu= {menu}
                />
                ))}
            </div>
            </main>
        </>
    )
}

export default function MenuSearchResult() {
    return (
        <Suspense> fallback = {<h1>검색 조건을확인하는 중입니다.</h1>}
        <MenuSearchResultContent/>
        </Suspense>
    )
}