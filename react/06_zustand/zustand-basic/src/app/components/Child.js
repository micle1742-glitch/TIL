import GrandChild from "./GrandChild";

export default function Child({ count }) {
    return (
        <>
            <h2>GrandChild count: {count}</h2>
            <GrandChild />
        </>
    )
}