/**array 배열
 * 관련된 값들 목록 정리
 */

const fruits = ['바나나', '복숭아', '키위'];
console.log (fruits);

//배열이름[인덱스]
//위치 번호 index 0부터시작
fruits[1]
console.log(fruits[1])

console.log(fruits[3]) //undefined
console.log(fruits.length)

//요소 변경
fruits[1] = '딸기';
console.log(fruits[1])

//일일이 요소뽑아보기
console.log(fruits[0])
console.log(fruits[1])
console.log(fruits[2])

//과일 한번에 뽑기 for문
for (let i = 0; i<fruits.length;i++){
    console.log(fruits[i])
}
//이거타입뭐냐?
console.log (typeof fruits)
//이거 배열(Array)맞냐?
console.log (Array.isArray(fruits))