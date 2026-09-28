'use client'

import { useState } from "react"
import GrandChild from "./components/GrandChild";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Props Drilling</h1>
      <h2>page에서 보는 count: {count}</h2>
      <GrandChild count={count} setCount={setCount} />
    </>
  )
}