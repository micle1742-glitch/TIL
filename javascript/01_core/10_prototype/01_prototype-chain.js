const user = {
    id: 'user',
    activate: true,
    login: function(){
        console.log(`${this.id}님이 로그인 되었습니다.`)
    }
}

/*const student = {
    passion: true
};*/

// create: 새로운 빈 객체 만들고, 객체가 프로퍼티를 찾을 때 user도살펴볼수 있게연결
// student의 프로토타입을 user로 설정
const student = Object.create(user);
student.passion = true;

console.log(student.activate);
    
console.log(student.passion);

// student가 프로토타입으로 연결한 객체 확인
console.log(Object.getPrototypeOf(student));

// student가 activate를 직접 가지고 있는가
console.log('자신의 activate:', Object.hasOwn(student, 'activate'))
console.log('자신의 passion:', Object.hasOwn(student, 'passion'))

console.log('activate' in student);

const 게으른학생 = Object.create(student);
게으른학생.greed = true
게으른학생.id = '학생01'

console.log(게으른학생.activate);
console.log(게으른학생.passion);
console.log(게으른학생.missing);

console.log(게으른학생.id);
console.log(user.id)

//호출 주체인 점(.) 앞의 객체 THIS를참조한다.
게으른학생.login();

delete 게으른학생.id;
console.log(게으른학생.id);
게으른학생.login();