import Link from "next/link"
import itemStyle from "./MenuItem.module.css"

export default function MenuItem({menu}) {
    return (
        <Link href ={`/menu/${menu.menuCode}`} >
        <div className={itemStyle.MenuItem}>
        <h2>메뉴 이름: {menu.menuName}</h2>
        <h2>메뉴 가격: {menu.menuPrice}</h2>
        <h2>메뉴 종류: {menu.categoryName}</h2>
        </div>
        </Link>
        
        
    )
}