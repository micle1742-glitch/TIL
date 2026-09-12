/**
 * null 병합 연산자
 * 좌항의 피연산자가 null 또는 undefined인 경우
 * 우항의 피연산자를 반환하고, 그렇지 않으면 좌항의 피연산자를 반환한다.
 */

const 이름 = null ?? '이름없음';
console.log(이름);

//빈 문자열과 같은 flasy한 값을 false로 취급해서 생기는 문제가 있다.
const 빈칸으로두고싶엉 = '' || '기본값';
console.log(빈칸으로두고싶엉)


const 빈칸으로두어지네 = '' ?? '이름없음';
console.log(빈칸으로두어지네);

