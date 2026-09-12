/**Date 날짜와 시간 new Date()로생성 */

const now = new Date(); //생성 당시의 시점
console.log(now);

//toLocaleString
console.log('한국어 표시: ', now.toLocaleString('ko-KR', {timeZone: 'Asia/Seoul'}));

const year =now.getFullYear();
const month =now.getMonth() + 1;
const date =now.getDate();

console.log(`${year}${month}${date}`)