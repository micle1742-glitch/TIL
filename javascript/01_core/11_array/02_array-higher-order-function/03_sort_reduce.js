/** sort, reduce */

const numbers = [3,1,9,10,5];

const sorted = numbers.sort();
console.log(sorted);

console.log(sorted === numbers)

numbers.sort((a,b) => a-b);
console.log(numbers)

/**
 * 반환값 음수 : a b앞에 a-b
 * 양수 a b 뒤에 ex)b-a
 * 0은 같다고판단
 */

//reduce
const amounts = [1000,2000,3000];

let sum = 0;
for(let i =0; i< amounts.length; i++) {
    sum= sum + amounts[i]
}

console.log(sum)

//누적하기-reduce사용
const total = amounts.reduce((sum,current)=>{
    return sum + current;
},);

console.log('빈 배열 합계:', [].reduce((sum,current) => sum + current,0));