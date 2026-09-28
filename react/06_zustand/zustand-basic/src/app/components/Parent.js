import { useStore } from "@/src/store/useStore";
import Child from "./Child";

export default function Parent() {
    const {count,text} = useStore();

    return (
        <>
            <h1>parent count: {count}</h1>
            <p>parent Text : {text}</p>
            <Child/>
        </>
    )
}