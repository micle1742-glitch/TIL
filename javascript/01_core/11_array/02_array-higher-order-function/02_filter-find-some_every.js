/**filter,find,some,every */
const students = [
    {이름: '홍길동',점수: 90},
    {이름: '권판다',점수: 80},
    {이름: '유관순',점수: 95}
];

//filter : 콜백함수의 반환결과가 true 인 요소만 모아 새로운 배열로 만듦
const highScores = students.filter(
    student => student.점수 >= 85
);

console.log(highScores);

//find()
const 첫고득점자 = students.find(student => student.점수 >= 91);
console.log(첫고득점자?.이름)

console.log(students.find(student => student.점수 >=100))//undefined반환
//find로 맞는요소 못찾으면 undefined를 반환 안정적인 접근을 위해 ?.사용
console.log(students.filter(student => student.점수 >=100))//[]반환

//some -조건에 맞는 요소가 한개라도 있는지 확인, 불리언 값 반환
const has첫고득점자 = students.some(student => student.점수 >= 85);
console.log(has첫고득점자)

//every - 모든요소가 조건에 만족, 불린언 값
const all첫고득점자 = students.every(student => student.점수 >= 80);
console.log(all첫고득점자);
