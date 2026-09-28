'use client'
import { Query, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Providers({children}) {
    // QueryClient -> query 데이터와 캐시를 관리하는 객체
    const [queryClient] = useState(() => new QueryClient());

    return (
        //QueryClientProvider : queryClient를 하위 컴포넌트에 공급하는 컴포넌트
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}