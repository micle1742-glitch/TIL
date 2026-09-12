/** 스코프 - 변수를 사용할 수 있는 범위 */

function calcualateArea(width, height){
    const area=width*height
    console.log('함수 안',area);
    return area;
}

const result = calcualateArea(10,20)
console.log(result);
// console.log(area);
// console.log(width);

const outerValue = '바깥쪽 값'

if(true) {
    const blockValue = '블록 안의 값'
    console.log(blockValue);
    console.log(outerValue);
    
}

console.log(blockValue);