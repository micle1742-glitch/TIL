/**
 * 암묵적 타입 변환
 * 개발자가 직접 변환을 명령하지 않아도
 * 자바스크립트 엔진이 문맥에 맞게 타입을 자동변환
 */

//문자열 타입으로 변환
console.log("문자열 타입으로 변환");
console.log(10+'20'); //+는 문자열이 끼어 있으면 연결 연산자로 동작
console.log(typeof (10+'20'));
console.log(true + '');
console.log(1+ ''); //'1' 문자열로 변경됨

// 산술 연산자의 피연산자는 모두 숫자여야 하므로
// 숫자가 아닌 피연산자를 숫자 타입으로 암묵적 타입 변환한다.
console.log('숫자 타입으로 변환');
console.log(10 - '5'); //-*&
console.log(10 * '5');
console.log(10 / '5');
console.log(10 % 's1');

//비교연산자도 바꿈
console.log(10 < '5');
console.log(10 > '5');

// + 단항 연산자는 피연산자가 숫자 타입의 값이아니면 숫자타입으로 암묵적 변환
console.log(+'');
console.log(+true);
console.log(+false);

//불린 타입으로 변환
// 자바스크립트 엔진은 불리언 타입이 아닌값을 truthy한(참으로 평가되는 값)
//또는 falsy한(거짓으로 평가되는값)으로 구분

/**
 * -falsy 값
 * false
 * 0
 * ''
 * null
 * undefined
 * NaN (not a number)
 */

if(10>5) console.log('참');
if('') console.log('falsy');