'use client'

import { useStore } from "../store/useStore";

export default function Home() {
  const count = useStore((state) => state.count);
  const increase = useStore((state) => state.increase);

  return (
    <>
      <h1>Zustand Test</h1>
      <h2>{count}</h2>
      <Parent/>
    </>
  )
}