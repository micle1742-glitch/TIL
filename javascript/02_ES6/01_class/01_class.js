class 학생 {
    //new student(..) 실행시 자동 호출 초기화 메서드
    constructor(이름,점수) {
        this.name = 이름;
        this.score = 점수
    }
    //객체마다 함수안만들고 student.prototype에 한번 만들어공유
    getInfo() {
        return this.name + ':' +this.score + '점';
    }
}

//new 없이 호출 , 타입에러남
const 학생1 = new 학생('홍길동',80);
const 학생2 = new 학생('관순',90);

console.log(학생1)
console.log(학생2)
console.log(학생1.getInfo());
console.log(학생2.getInfo());

학생1.score = 85
console.log(학생1.getInfo());
console.log(학생1)
