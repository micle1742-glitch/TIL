/**
 * 구조 분해 할당
 * 배열이나 객체의 속성을 해체하여 그 값을 변수에 손쉽게 담을 수있게하는 표현식
 */

const 나눠서담고싶은배열 = ['빨강', '파랑'];

const red = 나눠서담고싶은배열[0];
const blue = 나눠서담고싶은배열[1];

//배열 구조 분해 할당
const [빨강담기, 파랑담기] = 나눠서담고싶은배열;
console.log(빨강담기)
console.log(파랑담기)

//기본값 사용
const [leader,assistant = '미정'] = ['홍길동'];

const [first, ...other] = ['유관순', '장보고', '이순신'];
console.log (first);
console.log(other);

//객체 분해 할당
const student = {
    name : '유관순',
    age : 16, 
    major : '역사'
}

const 학생이름 = student.name;
const 학생나이 = student.age;
console.log(학생이름, 학생나이)

//객체 구조분해는 순서가아니라 프로퍼티 키이름으로찾는다
const {name, age} = student;
console.log(name,age);

// : name키 값을 새변수에담는다는뜻
const {name: 내가사용하고싶은변수이름, job = '학생'} = student;
console.log(내가사용하고싶은변수이름);
console.log(job);

const 상품출력 = {
    name: '키보드',
    price : 70000
}

// function 상품정보(product) {
//     const {name,price} = product
function 상품출력2({name,price}){
    console.log(`상품명: ${name}`)
    console.log(`가격: ${price}`)
}
상품출력2(상품출력)

//콜벡에서도 사용가능
const products = [
    {name:'키보드', price:50000},
    {name:'마우스', price:30000},
]

const 상품정보= products.map(product=> product.name)
console.log(상품정보)

//객체구조분해할당적용

const 상품정보1= products.map(({name}) => 상품출력.name)
console.log(상품정보1);

const product1 = {
    name:'노트북',
    price: 200000,
    spec: {
        cpu: 'i7',
        ram: '16GB'
    }
}

function printproduct1({name, price, spec: {cpu}, producer='삼성'}) {
    console.log(`상품 이름: ${name}`)
    console.log(`상품 이름: ${price}`)
    console.log(`상품 이름: ${cpu}`)
    console.log(`상품 이름: ${producer}`)
    
}

printproduct1(product1)

