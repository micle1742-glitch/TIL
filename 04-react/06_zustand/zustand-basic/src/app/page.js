'use client';

import { useStore } from "@/store/useStore";
import Parent from "./components/Parent";

export default function Home() {

  const {count} = useStore();

  return (
    <>
      <h1>Props Drilling</h1>
      <h2>Page에서 보는 count: {count}</h2>
      <Parent/>
    </>
  );
}
