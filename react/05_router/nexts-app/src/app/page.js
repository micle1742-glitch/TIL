import Link from "next/link";

export default function Home() {

  return (

    <main>
      <h1>홈페이지입니다</h1>
      <nav>
        <Link href="/about">소개 보기</Link>
      </nav>
      <h2>메뉴입니다.</h2>
      <nav>
        <Link href="/menu">소개 보기</Link>
      </nav>

    </main>)
}
