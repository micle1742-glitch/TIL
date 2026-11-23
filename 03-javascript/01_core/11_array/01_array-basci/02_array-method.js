/**배열 메소드 */

const food = ['짜장면','짬뽕','볶음밥']

//push : 배열의 끝에 요소추가
const count = food.push('탕수육');
console.log(food)
console.log(count)

//pop : 배열요소 삭제 및 제거요소반환
const 제거 = food.pop();
console.log(food)
console.log(제거)

//unshift: 배열 맨앞추가
food.unshift('유산슬')
console.log(food)

//shift() : 배열 맨앞요소제거
food.shift();
console.log(food)

const foodList = ['물회', '삼계탕', '냉면', '수박', '물회']

//indexof('값): 값이 처음으로 나오는 인덱스 반환
console.log(foodList.indexOf('물회'));
console.log(foodList.indexOf('삼겹살'));

//includes('값'): 값이 있으면 true, 없으면 false,
console.log(foodList.includes('냉면'));
console.log(foodList.includes('삼겹살'));

