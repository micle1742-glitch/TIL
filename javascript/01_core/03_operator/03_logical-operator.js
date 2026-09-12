/**
 * 논리 연산자는 여러 조건을 결합하여 하나의 논리적 결과를 도출한다
 * 논리 연산자는 and or not 연산자가 있다
 */

const a = true;
const b = false;

// 1. 논리 AND (&&)
console.log (a && b); //a와b 모두 true 일 때만true

// 2. 논리 OR (||) - a 또는 b 중 하나만 true 이면 true
console.log (a && b);

// 3. 논리 NOT (!) 
console.log (!a);

/**단축 평가
 * 표현식을 평가하는 도중 평가 결과가 확정 된 경우 나머지 평가 과정을 생략하는 것
 */

// OR의 경우 'apple' 이 이미 truthy 한 값이여서 true 로 평가되고
// 논리 연산의 결과를 결정한 피연산자인 apple 을 그대로 반환
console.log ('apple' || 'banana');
console.log (false || 'banana');


/**
 * 삼항 연산자 : 조건식에 따라 두 값중 하나를 선택하는 연산자
 * 조건 ? 값1 : 값2
 * 조건이 true 일 경우 값1, false 일 경우 값2 선택
 */

const age = 20;

const result = (age >= 20) ? "성인" : "미성년자";
console.log (result); 
