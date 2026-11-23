/**스코프 - 변수를 사용할 수 있는 범위 */

function calculateArea(width, height) {
    const area = width * height;
    console.log('함수 안:', area);
    return area;
}

const result = calculateArea(10, 20);
console.log(result);
// console.log(area);
// console.log(width);

const outerValue = '바깥쪽 값';

if (true) {
    const blockValue = '블록 안의 값';
    console.log(outerValue);    // 안쪽에서 바깥쪽 값은 접근 가능
    console.log(blockValue);
}

// 바깥에서 블록 안쪽 값에 접근 불가
// console.log(blockValue);