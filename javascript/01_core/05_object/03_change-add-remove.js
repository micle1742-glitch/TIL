const dog = {
    name :'뽀삐'
}

dog.name = '감자'
// dog['name'] = '감자';
console.log(dog);

//존재하지 않는 프로퍼티에 값을 할당하면 프로퍼티가 동적으로 생성된다
dog.age = 5;
console.log(dog);

//삭제 : delete 연산자 사용하여 프로퍼티를 삭제한다
delete dog.age;
console.log(dog);

// const 객체의 프로퍼티 내부 값을 변경 추가 삭제하는 것은 가능하지만
// 객체 자체를 재할당 하는것은 불가능

// dog = {name : '초코'};

// 존재 확인 : in 연산자
// 해당 객체가 특정 프로퍼티를 가지고 있는지 bloolean 값으로 알려줌
console.log('name' in dog);
console.log('weight' in dog);


//객체 순회 (fo...in) : 객체의 프로퍼티 키를 하나씩 꺼내는 반복문
for(const key in dog ){
    console.log(`키: ${key}`);
    console.log(`값: ${dog[key]}`);
    
}
