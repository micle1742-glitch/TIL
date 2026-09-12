const students = [
    {이름: '홍길동',점수: 90},
    {이름: '권판다',점수: 80},
    {이름: '유관순',점수: 95}
];

console.log(students[0].이름)

//for문으로 이름출력
for (let i = 0; i < students.length; i++) {
    console.log(students[i].이름);
}
//forEach사용
students.forEach(students => {
    console.log(students.이름)
})

students.forEach((student,index) => {
    console.log(index+1,`${'번째이름:'}`, student.이름)
})

//forEach 콜백함수의 반환값을 모아주지않음 forEach 반환값은 undefined
const 이름만뽑기 = students.forEach(student => student.이름)
console.log(이름만뽑기);

//map
const 이름진짜뽑기 = students.map(student => student.이름);
console.log(이름진짜뽑기);

//원본 배열에 영향x
console.log(students[0])

//점수5점더하기
const 점수5점더하기 = students.map(student => {
    return student.점수+5
})
console.log(점수5점더하기)