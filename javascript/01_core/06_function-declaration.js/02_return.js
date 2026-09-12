function add(a, b) {
    console.log(a+b)
    // return a + b;
}

const result = add(10,20);
console.log(result);
console.log(result * 2);



function printAdd(a,b) {
    console.log (a + b)
}
function returnAdd(a,b) {
    return a + b;
}
const printed = printAdd(10,20);
const returned = returnAdd(10,20);
console.log('printed', printed);
console.log('returned', returned);

//함수종료
function sayHello(name) {
    return `${name}님 안녕하세여~`; //return을 만나는 순간 함수 실행 끝남, return 아래의 코드는 실행되지 않는다.
    console.log('출력이되나요');
}

//반환값의 생략
function noReturn() {
    console.log('함수 호출됨')
    return;
}

function emptyFunction() {
    //return 문 자체 없음
}

console.log(noReturn())
console.log(emptyFunction())

//조기 종료 Early return
function registerUser(nickName) {
    //1, 조건이 안 맞으면 즉시종료
    if (nickName.length < 2) {
        console.log('닉네임이 너무 짧습니다')
        return; //여기서 함수끝냄
    
    }
    //2. 위 조건 통과
    console.log(`${nickName}님 환영합니다`)

}

registerUser('나');
registerUser('권판다');
