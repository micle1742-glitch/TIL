/**
 * 동적 타입 언어(JS, Python 등)
 * 변수에 현재 들어 있는 값에 따라 타입이 결정된다.
 * 
 */

/**
 * 1.숫자(number)
 * 하나의 숫자 타입만 존재하고 모든 수를 실수로 처리한다
 * 
 */

const age = 30;
console.log(age);
console.log(typeof age);

/**
 * 문자열타입 (string)
 * 문자열은 작은 따움표(''), 큰 따움표(""), 또는 백틱('')으로 텍스트를 감싼다.
 * 
 */

const string = "문자열"
console.log(string)
console.log(typeof string)

/**
 * 3.불린(boolean): 논리적 참, 거짓을 나타내는 true 와 false 뿐이다.
 */
const isStudent = true;
console.log(isStudent);
console.log(typeof isStudent);

/**
 * 4. null : 명시적으로 값이 없음을 의도적으로 명시할 때 사용
 */
const address = null;
console.log(address);
console.log(typeof address); // object -> js의 오래된 버그
/**
 * 5.undefined: 변수에 값이 할당되지 않았을 때 자동으로 할당되는 값
 */
let salary;
console.log(salary);
console.log(typeof salary);

/**탬플릿 리터럴
 * ES6부터 도입된 문자열 표기법
 * 작은 따움표, 큰 따움표 대신 백틱(``)을 사용해 표현한다
 */
const lastName = '권'
const firstName = '은지';

console.log('제 이름은 ' + lastName + firstName + '입니다')

console.log(`제 이름은 ${lastName}${firstName}입니다.`)

//백틱은 줄바꿈 허용
const str = `안녕하세여
반갑습니다`;
console.log(str);

const code = "2 + 3";
const result = eval(code);
console.log(result);