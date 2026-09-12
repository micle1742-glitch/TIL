/**
 * 프로퍼티 접근
 * 1.마침표 표기법
 * 2.대괄호 표기법
 * 
 */

const dog= {
    name: '뽀삐',
    eat: function(food) {
        console.log(`$this.name}은 ${food}를 맛있게 먹어요`)
    }
}

console.log(dog.name);
dog.eat('두부');

console.log(dog['name'])//프로퍼티키를문자열로 적는다
dog['eat']('고구마');

const obj = {
    'dash-key': 'dash-value',
    0 : 1
};

console.log(obj['dash-key'])

//key 가 변수에 담겨있을때
const prop = 'name';
console.log(dog.prop);
console.log(dog[prop]); //dog['name'] ->뽀삐
