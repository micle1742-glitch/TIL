/**
 * 콜백 함수는 "지금 바로 실행할 함수"가 아니라,
 * 다른 함수에 맡겨두었다가 필요한 시점에 호출
 */

//고차 함수 : 함수를 인수로 받는 함수
function calcurator(calculatorCallback, a, b) {
    console.log('게산을 시작합니다')
    //계산 시점은 calculator가 결정하지만,
    //계산 방식은 외부 주입 받은 콜백함수가 결정
    const result = calculatorCallback(a,b);
    return result;
}

//콜백 함수
function add(a,b) {
    return a+b
}

function multiply(a,b) {
    return a*b;
}

//고차함수에 콜백함수 재료처럼전달
const addResult = calcurator(add, 9, 8);
console.log (addResult);

const multiplyResult = calcurator(multiply, 9, 8);
console.log (multiplyResult);

//실용 예제 : 배열 정렬
const numbers = [3,10,1,6,9]

//sort() 라는 고차 함수에 '정렬기준'을 담은 콜백함수를 전달
numbers.sort(function(a,b){
    // a-b가음수면 a가앞으로,양수면 b가 앞으로 정렬
    return a-b;
});
console.log(numbers)