/** string 표준 빌트인 객체
 * 원본안바뀜 새로운값 반환
*/

//1.trim - 문자열 앞뒤 공백 제거
const rawkeyword = '   javascript   ';
console.log(rawkeyword);
const trimmedKeyword = rawkeyword.trim();
console.log(trimmedKeyword);

//영문 대소문자 정리(toLowerCase(), toUpperCase())
const keyword = trimmedKeyword.toLocaleLowerCase();
console.log(keyword)
console.log(keyword.toUpperCase())

//3.indexof() : 검색어가 시작하는 인덱스 반환, 찾지못하면 -1을 반환
const title = 'javascript 배열수업'
const searchtitle = title.toLocaleLowerCase();
console.log(searchtitle.indexOf(keyword));
console.log(searchtitle.indexOf('python'));

//includes() : 검색어가 들어있는지를 true 또는 false로 변환
console.log(searchtitle.includes('script'))
console.log(searchtitle.includes('python'))

//4. slice() - 필요한부분가져오기
const fileName = 'my-profile.jpg'
//slice(시작,끝)
console.log(fileName.slice(0,10));

//lastIndexOf('.') : 문자열에서 마지막 마침표(.)의 인덱스를 찾는다
const dotIndex = fileName.lastIndexOf('.')
console.log(dotIndex);
const extension = fileName.slice(dotIndex); //slice(구멍)부터 끝까지 보여줌
console.log(extension);

//5.split- 문자열을 배열로 나누기
const tags = '#자바#개발자#프론트엔드';
const tagParts = tags.split('#');

console.log(tagParts);

// //6.배열 메서드로 빈값제외
// const taglist = tagParts.filter(tag => tag !== '')
// console.log(taglist)

//메서드 체이닝 방식
const taglist = tags
    .split('#')
    .filter(tag => tag !== '')