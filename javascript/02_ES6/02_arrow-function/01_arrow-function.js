/**화살표 함수 */
'use strict';

const 제곱 = function(x) {
    return x*x;
}

console.log(제곱(3));

const arrowPower = (x) => {
    return x*x;
}
console.log('화살표함수', arrowPower(3))

//매개변수 딱하나인경우 소괄호 생략가능
const square = x => x*x;
console.log('화살표함수', square(3))

//매개변수 없는경우 소괄호 생략불가
const greet = () => '안녕';
const add = (a,b) => a + b;
console.log(greet())
console.log(add(1,2))


//중괄호 : return 꼭!
const calculateSqauare = x => {
    return x*x
}
const wrongSquare = x => {
    x*x
}
console.log(calculateSqauare(3))
console.log(wrongSquare(3))

//객체반환하기 중괄호밖에 괄호해야 함수아닌줄암
const 객체유저 = (id, name) => ({
    아이디: id,
    이름: name
})
console.log(객체유저(1,'판다'))

//화살표 함수 다른 함수에 콜백으로 전달
function calculate(value,option) {
    return option(value);
}
console.log(calculate(3, 제곱));
console.log(calculate(3,Number => Number*Number))
