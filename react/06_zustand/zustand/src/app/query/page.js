'use client'

import { fetchUseres } from "@/src/api/userApi";
import { useQuery } from "@tanstack/react-query";

export default function QueryPage() {
    const {data, isLoading, isError, error, refetch, isFetching}= useQuery({
        queryKey: ["users"],
        //queryKey: ["users",1] //1번사용잔
        
        queryFn: fetchUseres,
    });

    if (isLoading) {
        return <h1>데이터를 불러오는중...</h1>
    }
    if (isError) {
        return (
            <>
            <h1>사용자 정보를 가져오지 못함</h1>
            <p>{error.message}</p>
            <button onClick={() => refetch()}>다시 시도</button>
            </>

        )
    }
    return (
    <>
        <h1>사용자 목록</h1>
        {isFetching && (<p>최신 데이터 확인중 ...</p>)}
        {data.map((user) => (
            <div key = {user.id}>
                <strong>{user.name}</strong>
                <p>{user.email}</p>
            </div>
        ))}
        
    </>
)}