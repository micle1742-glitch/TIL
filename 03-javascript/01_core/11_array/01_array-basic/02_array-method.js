/**배열 메소드 */

const food = ['짜장면', '짬뽕', '볶음밥'];

// push: 배열 끝에 요소를 추가하고 새 길이를 반환.
const count = food.push('탕수육');
console.log(food);
console.log(count);

// pop : 배열 끝의 요소를 제거하고, 제거한 요소를 반환
const removed = food.pop();
console.log(food);
console.log(removed);

// unshift: 배열의 맨 앞에 요소 추가, 변경 후 길이 반환
food.unshift('유산슬');
console.log(food);
// shift(): 배열의 맨 앞 요소 제거, 제거한 요소 반환
food.shift();
console.log(food);

const foodList = ['물회', '삼계탕', '냉면', '수박', '물회']

// indexOf('값'): 값이 처음으로 나오는 인덱스 반환
console.log(foodList.indexOf('물회'));
console.log(foodList.indexOf('삼겹살'));    // 없으면 -1 반환

// includes('값'): 값이 있으면 true, 없으면 false 
console.log(foodList.includes('냉면'));
console.log(foodList.includes('삼겹살'));