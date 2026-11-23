/**함수 표현식 - 값으로 담기 */
const hi = function(name) {
    return `${name}님 안녕하세요`;
}
//함수가 담겨있는 변수로 호출
console.log(hi('판다'));

//함수 선언문은 코드 실행전 준비되기 떄문에 선언 위치보다 위에서 참조
//함수 선언문이 코드의 가장위로 올라간것처럼보이는동작
console.log(hello('홍길동'))

//함수 선언문의 호이스팅
function hello(name) {
    return `${name} 안녕?`
}

console.log(hello('판다'));