# section02. super 키워드

---

## 1. super()란?

자식 생성자에서 부모 생성자를 호출하는 것.
부모 필드가 `private`이라 자식이 직접 초기화할 수 없기 때문에 사용.

```java
public Computer(String code, String name, int price, String cpu, int ram) {
    super(code, name, price); // 부모 필드 초기화
    this.cpu = cpu;           // 자식 필드만 여기서
    this.ram = ram;
}
```

> super()는 자식 생성자 첫 줄에 위치
> 생략하면 Java가 자동으로 super() 삽입 (부모에 기본 생성자 있을 때만)
> 부모에 매개변수 있는 생성자만 있으면 반드시 직접 써야 함

---

## 2. 부모 생성자 선택 호출

부모에 생성자가 여러 개면 원하는 것만 골라서 호출 가능.

```java
// Product.java — 생성자 2개
public Product() { }
public Product(String code, String name, int price) { ... }

// 자식에서 선택
super();                     // 기본 생성자 호출
super(code, name, price);    // 매개변수 있는 생성자 호출
```

---

## 3. super.메소드() — 부모 메소드 결과 재활용

오버라이딩하면서 부모 getInformation() 결과를 가져와 자식 정보를 덧붙임.

```java
// Computer.java
@Override
public String getInformation() {
    String parentInfo = super.getInformation(); // 부모 결과: "code: ..., name: ..., price: ..."
    String computerInfo = " " + cpu + " " + ram;
    return parentInfo + computerInfo;           // 합쳐서 반환
}
```

> super.메소드() : 오버라이딩 안에서 부모 버전 실행
> 부모 결과를 버리지 않고 재활용할 때 유용

---

## 4. 클래스 구조

```
Product (부모)
├── code, name, price (private)
├── getInformation()
└── getPrice() / setPrice()

Computer extends Product (자식1)
├── cpu, ram 추가
├── super(code, name, price) → 부모 초기화
└── getInformation() 오버라이딩 → 부모 정보 + cpu + ram

SmartPhone extends Product (자식2)
├── agency 추가
├── super(code, name, price) → 부모 초기화
└── getInformation() 오버라이딩 → 부모 정보 + agency
```

---

## 5. 자주 헷갈리는 것

- `super()` vs `super.메소드()`
  - `super()` → 생성자에서 부모 초기화
  - `super.getInformation()` → 오버라이딩 안에서 부모 메소드 실행
- 부모 필드가 `private`이면 자식도 직접 접근 불가 → getter/setter 이용
- 자식 생성자에서 부모 초기화는 `super()`로, 자식 필드 초기화는 `this.필드`로

---

## 전체 흐름 정리

    Product (부모)
    └─ private 필드: code, name, price
    └─ getInformation() → 기본 정보 반환

    Computer / SmartPhone (자식)
    └─ super(code, name, price) → 부모 private 필드 초기화
    └─ 자식 필드(cpu, ram / agency)는 this.필드로 초기화
    └─ getInformation() 오버라이딩
       └─ super.getInformation() 로 부모 결과 가져오기
       └─ 자식 정보 덧붙여서 반환

    핵심 패턴
    └─ 부모가 한 것 + 자식이 추가한 것 = super.메소드() + 자식 내용
