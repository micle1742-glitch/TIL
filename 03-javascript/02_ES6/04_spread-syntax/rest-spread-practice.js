// 1. `cart`에 `'키보드'`, `'마우스'`를 넣습니다. ( 배열)
// 2. Spread로 `'모니터'`가 추가된 `updatedCart`를 만듭니다.
// 3. `order` 객체에 `id: 1`, `status: '결제 대기'`를 넣습니다.
// 4. Spread로 기존 값은 유지하고 `status`만 `'결제 완료'`로 바꾼 `completedOrder`를 만듭니다.
// 5. Rest 파라미터를 사용해 전달받은 가격의 합계를 반환하는 `getTotal`을 작성합니다.
// 6. `updatedCart`, 두 주문 객체, `getTotal(50000, 30000, 200000)`의 결과를 출력합니다.

const cart = ['키보드','마우스']
const 업데이트cart = [...cart,'모니터']
const order = {
    id: 1,
    status: '결제 대기'
}
const completeOrder = {
    ...order,
    status: '결제 완료'
}
function getTotal(label,...values) {
    let total = 0;

    for(const value of values ) {
        total += value;
    }
    return(total)
}
console.log(업데이트cart)
console.log(order)
console.log(completeOrder)
console.log(getTotal('completeOrder',50000, 30000, 200000))
