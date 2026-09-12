function compareVar() {
    var i = 100;
    for (var i = 0; i < 3; i++){
        console.log('var 안:',i)
    }
    console.log('var 밖:',i)
}
compareVar();

//let : 블록범위
function comparelet() {
    var i = 100;
    for (let i = 0; i < 3; i++){
        console.log('let 안:',i)
    }
    console.log('let 밖:',i)
}
comparelet();

function compareAssignment() {
    var oldMessage = '처음'
    var oldMessage = '변경'
    console.log(oldMessage)

    let message = '처음';   
    message = '변경'
    console.log(message)
    // let message = '중복' //재선언 금지

    const greeting = '안녕하세여';
    console.log(greeting);
    // greeting = '안녕히 가세여'
}
compareAssignment();

function compareInitialization() {
    console.log('var 선언 전', oldValue);
    var oldValue = '준비됨'
    console.log('var 대입 후', oldValue);
    
    // console.log(value);
    let value;
    console.log('let 선언 후 ',value);
    value = '준비됨'
    console.log('let 대입 후 ',value);
    
}
compareInitialization();

const student = {
    name : '판다',
    age : 5

}
student.name = '코알라'
console.log('학생이름', student.name)
// student = {name : '홍길동', age: 30};