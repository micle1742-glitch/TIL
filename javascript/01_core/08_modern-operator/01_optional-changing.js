/**
 * 옵셔널 체이닝 연산자(?.)
 * 좌항의 피연산자가 null 또는 undefined인 경우 undefined를 반환하고
 * 그렇지 않으면 우항의 프로퍼티 참조를 이어간다.
 * 객체 속성을 안전하게 읽고 싶을 때 사용한다.
 */

const obj = null;
// let val = obj.value; //typeError

const val = obj?.value;
console.log(val)

//옵셔널 체이닝 이전엔 논리연산자 &&를 사용한 단축평가로 확인을함
//단점 빈문자열과 같은 falsy한값을 false로 취급하는문제
const 문자열 = '';
console.log(문자열.length);
// len에 str 즉, 빈 문자열이 담긴다

//null 또는 undefined 일 때만 멈춘다
//빈 문자열은 null, undefined가 아니므로 문자열의 길이 값이 담긴다.
const len = 문자열?.length

//?.가 무조건 undefined를 만들려고 쓰는 건 아님. 값이 있으면 정상적으로 그 값을 가져옴.

function Book(title, price) {
    this.title = {value:title};
    this.price = price;
}

const 책1 = new Book('자바스크립트', 15000);

console.log(책1.title?.value);