'use strict';

function 챔피언만들기(챔피언이름, q스킬, damage) {
    console.log(`this가 있는가;`, this !== undefined);
    console.log(`name이 있는가`, '챔피언이름' in this);
    this.챔피언이름 = 챔피언이름;
    this.q스킬 = q스킬;
    this.damage = damage;

    this.getInfo = function () {
        return `${this.챔피언이름}의 ${this.q스킬}는 데미지 ${this.damage}입니다`;
    };
    console.log(`초기화한 값:`, this.챔피언이름,this.damage)
}

const 챔피언만들기1 = new 챔피언만들기('호랑이','무서워',6);
console.log(`객체를반환받았는가`, typeof 챔피언만들기1 === 'object')


//pracrice
function 강아지 (이름,나이){
    //new.targert: new dog를 호출하면 dog를 가리키고 일반호출로 하면 undefined이다.
    if (!new.target){
        console.log('new 없이 호출함요')
        return new 강아지(이름,나이);

    }
    this.이름 = 이름;
    this.나이 = 나이;
}

const 강아지1 = 강아지('바둑이',3)
console.log(강아지1)


function Book(title,price){
    this.title = title;
    this.price = price;
    this.getInfo = function (수량) {
        return this.price*수량;}
}

const book1 = new Book('자바스크립트입문',15000);
const book2 = new Book('객체와함수',20000);
console.log((book1.price+book2.price)*2);
book1.price=18000
console.log((book1.price+book2.price)*2);
console.log(book1.getInfo(0))