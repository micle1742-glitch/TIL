//for...of와 이터러블
//이터러블은 값을 순서대로 꺼낼수있는값 배열과 문자열이 대표적

const fruits = ['🍎','🍌','🍓']
for (let i = 0; i < fruits.length; i++) {
    console.log('일반for문',i,fruits[i]);
}

//for...of문
for (const 과일 of fruits) {
    console.log ('for...of:',과일);
}

const 문자열 = '안뇽';
for (const 캐릭터 of 문자열) {
    console.log('글자',캐릭터)
}
console.log(문자열)

const student = {
    name: '홍길동',
    score: 80
};

//typeError
// for (const 캐릭터 of student) {
//     console.log('글자',캐릭터)
//}
