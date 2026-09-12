const 점수배열 = [80,95,70]

//Math.max(80,95,70)
console.log(Math.max(점수배열));

//Spread(...) : 배열을 인수로 펼친다.
console.log(Math.max(...점수배열))


const frontEnd = ['HTML','CSS']

//... 으로 요소 편하게 집어넣기
const languages = [...frontEnd,'javaScript']
console.log(languages);


//[...배열] → 얕은 복사(Shallow Copy) → 새로운 배열 생성 → === 하면 false
const languagescopy = [...languages];
console.log(languagescopy===languages)

//이건걍복사
const samelanguagescopy=languages
console.log(samelanguagescopy===languages)


const original = [
    {name: '홍길동'}
]

//모든 요소를 새 대괄호 안에 펼치므로 모양은 같음 but 서로다른배열
const copid = [...original]
console.log(copid)

//but 객체안은또 같은거임 그객체를새로안만들어서 얕은복사임
console.log(original === copid)
console.log(original[0] === copid[0])

//객체를 펼쳐 새객체만들기 (점수바꾸기)
const student = {
    name : '홍길동',
    score : 80
}

const 업데이트학생 = {
    ...student,
    score : 90
}
console.log(업데이트학생)

//Rest 파리미터 : 나머지 인수를 배열로 모으기
function sum(...numbers) {
    let total = 0

    console.log( '받은 인수의 배열', numbers)
    for (const number of numbers) {
        total += number; //total = total + number
    }
    return total; 

}

console.log(sum(10,20));
console.log(sum(10,20,30,40));

const 가격 = [1000,2000,3000]

//함수의 매개변수 자리에는 rest 파라미터
function pritTotal(label,...values) {
    let total = 0;

    for(const value of values ) {
        total += value;
    }
    console.log(label,total)
}
//호출 쪽 은 spread 문법
pritTotal('합계',...가격)
