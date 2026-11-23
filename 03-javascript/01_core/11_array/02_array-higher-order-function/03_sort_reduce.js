/** sort, reduce */

const numbers = [3, 1, 9, 10, 5];

const sorted = numbers.sort();  // 원본 배열을 정렬한다
console.log(sorted);

console.log(sorted === numbers);

numbers.sort((a, b) => b - a);
/**
 * 반환값 음수 : a를 b보다 앞에 놓는다.
 * 반환값 양수 : a를 b보다 뒤에 놓는다.
 * 0 : 이 비교 기준에서 같은 순위로 취급한다.
 */
console.log(numbers);

// reduce
const amounts = [1000, 2000, 3000];

let sum = 0;
// 누적하기 - for문 사용
for (let i = 0; i < amounts.length; i++) {
    sum = sum + amounts[i];
}

// 누적하기 - reduce 사용(반환값을 받아 다음 호출로 넘겨준다)
const total = amounts.reduce((sum, current) => {
    return sum + current;
}, 0);

console.log('빈 배열 합계:', [].reduce((sum, current) => sum + current, 0));


