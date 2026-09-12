// const 학생1 = {
//     이름:'yd',
//     age:8
// };

// const 학생2 = {
//     이름:'yq',
//     age:5
// };

function 학생(이름,age) {
    this.이름 = 이름;
    this.age = age;
}

const 학생1 = new 학생('yd',8);
const 학생2 = new 학생('다람쥐',6);


학생.prototype.activate/*이건키임*/ = 'true'//이건value
학생.prototype.getInfo = function() {
    return `${this.이름}는 ${this.age}세 입니다`;
}
// new 키워드로 만들면 생성자함수의 prototype 객체에 연결됨.
const 학생3 = new 학생('홍길동',20);
const 학생4 = new 학생('조영동',30);

console.log(Object.getPrototypeOf(학생3)===학생.prototype)
console.log(Object.hasOwn(학생3,'getInfo'));//공통객체에 정의해놨기때문에 false

console.log(학생3.activate)
console.log(학생3.getInfo());
console.log(학생4.getInfo());

console.log(학생3.getInfo === 학생4.getInfo);
학생3.age= 35;


function 책(title,price) {
    this.제목 = title;
    this.가격 = price;
}
책.prototype.getTotal = function (수량) {
    return this.가격*(수량)
}

const 책1 = new 책('책1',15000);
const 책2 = new 책('책2',20000);
console.log(Object.getPrototypeOf(책1)===책.prototype)
console.log(책1.getTotal(2))
console.log(책2.getTotal(2))
책1.가격=18000
console.log((책1.가격+책2.가격));
console.log(책1.getTotal(0))
console.log(Object.hasOwn(책,'getTotal'));
console.log(Object.hasOwn(책.prototype,'getTotal'));


