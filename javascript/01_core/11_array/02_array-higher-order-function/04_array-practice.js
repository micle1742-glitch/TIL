// ### **1단계 — 판매 가능한 목록 만들기**

// 1. 재고가 0보다 큰 상품만 새 배열로 고릅니다.
// 2. 그 배열을 가격 오름차순으로 정렬합니다.
// 3. 정렬된 상품의 이름만 담긴 새 배열을 만듭니다.

// **중간 확인:** 이름 배열이 `['파일', '노트']`이면 1단계가 완성된 것입니다. 여기까지 확인한 뒤 2단계로 넘어갑니다.

// ### **2단계 — 합계·검색·판단·출력 연결하기**

// 1. 판매 가능한 상품을 한 개씩 살 때 총액을 구합니다. 재고 수량을 곱하지 않습니다.
// 2. 원본 목록에서 이름이 펜인 상품 하나를 찾습니다.
// 3. 품절 상품이 하나라도 있는지, 모든 가격이 양수인지 확인합니다.
// 4. 판매 가능한 각 상품의 이름과 가격을 출력하고, 원본 상품 순서가 유지되는지 확인합니다.

const products = [
    { name: '노트', price: 3000, stock: 5 },
    { name: '펜', price: 1000, stock: 0 },
    { name: '파일', price: 2000, stock: 3 }
];
const 정렬상품 = 
    products.filter(products => products.stock > 0)
    .sort((a,b) => a.price-b.price)
    const 상품이름 = 정렬상품.map(product => product.name)
    console.log(정렬상품)
const 총액 = 정렬상품.reduce((sum,product)=>{
    return sum + product.price;},0)
    const 상품찾기 = products.find(product => product.name === '펜')
    const 재고있음 = products.some(product => product.stock ===0)
    const 가격양수 = products.every(product => product.price > 0)
    
    const 판매가능상품 = 정렬상품.map(product =>{
        return {
            가격 : product.price,
            이름 : product.name
        } 
    })
console.log(판매가능상품) 



    
