
// 생성자 함수

function 챔피언만들기(챔피언이름, q스킬, damage) {
    this.챔피언이름 = 챔피언이름;
    this.q스킬 = q스킬;
    this.damage = damage;

    this.getInfo = function () {
        return `${this.챔피언이름}의 ${this.q스킬}는 데미지 ${this.damage}입니다`;
    };
}


// 챔피언 생성
const 챔피언1 = new 챔피언만들기('누누', '깨물기', 5);

const 챔피언2 = new 챔피언만들기('가렌', '데마시아', 10);


// 출력
console.log(챔피언1.getInfo());
console.log(챔피언2.getInfo());

// 생성자 함수

function 챔피언만들기2(챔피언이름, q스킬, 데미지) {
    this.챔피언이름 = 챔피언이름;
    this.q스킬 = q스킬;
    this.데미지 = 데미지;

    this.정보보기 = function () {
        return `${this.챔피언이름}의 ${this.q스킬}는 데미지 ${this.데미지}입니다`;
    };
}


// 챔피언 생성

const 챔피언99 = new 챔피언만들기2('누누', '깨물기', 5);

const 챔피언100 = new 챔피언만들기2('가렌', '데마시아', 10);


// 출력

console.log(챔피언99.정보보기());

console.log(챔피언100.정보보기());

const 챔피언만들기3 = new 챔피언만들기('모르가나','속박',5)
const 챔피언만들기4 = new 챔피언만들기('아이스크림','맛있어',10)
console.log(챔피언만들기3)
console.log(챔피언만들기4)
console.log(챔피언만들기3.getInfo())
console.log(챔피언만들기4.getInfo())

console.log('같은 객체인가:',챔피언만들기3 === 챔피언만들기4);
챔피언만들기4.damage = 100;
console.log(챔피언만들기3.getInfo());
console.log(챔피언만들기4.getInfo());



//pracrice
function 강아지 (이름,나이){
    this.이름 = 이름;
    this.나이 = 나이;

    this.정보보기 = function() {
        return `${this.이름}는 ${this.나이}입니다.`};
}
    const 강아지1 = new 강아지('뽀삐',3)
    const 강아지2 = new 강아지('바둑이',5)
    


    console.log(강아지1.정보보기())
    console.log(강아지2.정보보기())
    
