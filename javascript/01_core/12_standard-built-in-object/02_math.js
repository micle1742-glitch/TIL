/**math 표준 빌트인 객체
 * 수학 계산 기능을 제공 new로 x 
 * math.메서드()
 */

//1. 반올림.내림.올림
//round() : 소수점 이하를 반올림 : 반올림
console.log(Math.round(3.64343434234234234))
//floor() : 주어진수보다 크지않는정수 : 내림
console.log(Math.floor(3.5))
//ceil()  : 주어진수보다 작지않은가장작은값 : 올림
console.log(Math.ceil(3.1))

//Math.random
//ramdom() : 실행할 때마다 0이상 1미만의 임의의 실수를 반환
const 랜덤벨류 = Math.random();
console.log(랜덤벨류)

const 영부터구 = Math.floor(랜덤벨류*10);
console.log(영부터구);
const 십만들기 = 영부터구+1;
console.log(십만들기)

//무작위 요소 선택
const menus = ['비빔밥', '우동', '김밥']
const 메뉴 = Math.floor(Math.random()*menus.length);
console.log('선택',메뉴)
console.log('추천메뉴',menus[메뉴])

