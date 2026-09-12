/**
 * 조건문 : if -else
 * if (조건식) {
 * // 조건식이 true 인 경우 실행구문}
 * else {
 * //조건식이 false인 경우 실행구문}
 */

let temperature = 5;

if (temperature < 10) {
    console.log ('오늘은 추운 날씨입니다'); //조건이 참일 때 실행
} else {
    console.log ('오늘은 날씨가 괜찮습니다') //조건이 거짓일 때 실행
}

/**
 * if-elseif-else
 * if (조건식1) {
 * //조건식1 true인 경우 실행
 * } else if (조건식2) {
 * //조건식2 true인 경우 실행
 * }else {
 * //위의 조건이 다 false 인 경우 실행}
 * }
 */


let score = 75;

if (score >= 90) {
    console.log ('우수한 성적'); //조건이 참일 때 실행
} else if (score >= 70) {
    console.log ('보통') //조건이 거짓일 때 실행
}  else if (score >= 50){
    console.log ('낙제') //조건이 거짓일 때 실행
} else {
        console.log ('공부해라') //조건이 거짓일 때 실행
}
