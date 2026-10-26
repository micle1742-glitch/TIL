# chap04 - Bean 복습

## 0. 오늘의 큰 그림
- chap01~03: Bean을 "어떻게 등록하고 연결하냐"
- chap04: Bean을 "어떻게 관리하냐"
- section01: scope → Bean을 몇 개 만들 거냐 (하나 공유 vs 매번 새로)
- section02: init/destroy → Bean 생성·소멸 시점에 할 일 지정
- section03: properties → 설정값을 외부 파일에서 읽어오기

---

## common - 실습용 클래스
- Product (추상 클래스): 상품 공통 정보 (이름, 가격 등)
- Bread, Beverage: Product 상속 → 빵, 음료
- ShoppingCart: 상품을 담는 장바구니 (내부에 List<Product>)

        public class ShoppingCart {
            private final List<Product> items = new ArrayList<>();

            public void addItem(Product item) { items.add(item); }
            public List<Product> getItem() { return items; }
        }

- 장바구니 실습 이유: "손님마다 장바구니가 따로 있어야 하는데 하나를 공유하면?" 을 보여주려고

---

## section01 - scope

### scope란
- Bean 객체를 몇 개, 언제 만들지 정하는 범위
- 기본값은 singleton

### 1) singleton (기본값)

    @Bean
    public ShoppingCart cart() {
        return new ShoppingCart();
    }

    ShoppingCart cart1 = context.getBean("cart", ShoppingCart.class);
    ShoppingCart cart2 = context.getBean("cart", ShoppingCart.class);
    // cart1 == cart2 → true

- 컨테이너에 객체가 딱 1개 → getBean 할 때마다 같은 객체
- 손님1이 담은 상품이 손님2 장바구니에도 보임 → 장바구니엔 부적합

### 2) prototype

    @Bean
    @Scope("prototype")
    public ShoppingCart cart() {
        return new ShoppingCart();
    }

    // cart1 == cart2 → false

- getBean 할 때마다 새 객체 생성
- 손님마다 장바구니가 따로 생김

### 언제 뭘 쓰나
- singleton: 상태(필드 값)가 없는 객체 → Service, Repository 등 대부분
- prototype: 사용자마다 다른 상태를 가지는 객체 → 장바구니 같은 것

### 헷갈리는 부분
- 아무것도 안 쓰면 singleton
- 객체 비교는 == (같은 객체인지), hashCode 출력으로도 확인 가능
- singleton Bean에 상태값을 두면 모든 사용자가 공유 → 버그 원인

---

## section02 - initdestroy

### 무엇을 했나
- Bean이 만들어질 때 / 컨테이너가 닫힐 때 자동으로 실행할 메서드 지정
- 예시: Owner(가게 주인) → 가게 열기(openShop), 가게 닫기(closeShop)

        public class Owner {
            public void openShop() { System.out.println("가게 오픈"); }
            public void closeShop() { System.out.println("가게 마감"); }
        }

### @Bean 속성으로 지정

    @Bean(initMethod = "openShop", destroyMethod = "closeShop")
    public Owner owner() {
        return new Owner();
    }

### 소멸 메서드 실행시키기

    ((AnnotationConfigApplicationContext) context).close();

- 컨테이너를 close() 해야 destroyMethod 실행됨

### 다른 방법 (참고)
- 클래스 안 메서드에 @PostConstruct(생성 후) / @PreDestroy(소멸 전)

### 헷갈리는 부분
- initMethod, destroyMethod 값은 메서드 이름 "문자열" (괄호 X)
- close() 안 하면 destroy 메서드 실행 안 됨
- ApplicationContext 인터페이스엔 close()가 없어서 형변환 필요
- prototype Bean은 컨테이너가 생성까지만 관리 → destroy 호출 안 됨

---

## section03 - properties

### 무엇을 했나
- 상품 이름, 가격 같은 값을 코드에 직접 쓰지 않고 .properties 파일에서 읽어옴
- 값이 바뀌어도 코드는 그대로, 파일만 수정

### properties 파일 (resources/section03/properties/product-info.properties)

    bread.carpbread.name=붕어빵
    bread.carpbread.price=1000
    beverage.milk.name=딸기우유
    beverage.milk.price=1500

- key=value 형식

### 설정 클래스

    @Configuration
    @PropertySource("section03/properties/product-info.properties")
    public class ContextConfiguration {

        @Value("${bread.carpbread.name:팥붕어빵}")
        private String carpBreadName;

        @Value("${bread.carpbread.price:0}")
        private int carpBreadPrice;

        @Bean
        public Product carpBread() {
            return new Bread(carpBreadName, carpBreadPrice, ...);
        }
    }

### 핵심 문법
- @PropertySource("경로"): 어떤 properties 파일 읽을지 지정 (resources 기준)
- @Value("${key}"): 해당 key의 값 주입
- @Value("${key:기본값}"): key가 없으면 기본값 사용

### 헷갈리는 부분
- ${} 안에 key 오타 나면 기본값 없을 때 에러
- 콜론(:) 뒤가 기본값
- 문자열 "1000"도 int 필드면 자동 변환됨
- 한글 깨지면 IntelliJ 설정에서 properties 파일 인코딩 UTF-8 확인

---

## 암기할 것
- scope 기본값 = singleton (1개 공유)
- @Scope("prototype") = 요청마다 새 객체
- @Bean(initMethod = "...", destroyMethod = "...")
- destroy는 context.close() 해야 실행
- @PropertySource로 파일 지정, @Value("${key:기본값}")로 값 주입

---

## 전체 흐름 정리
- section01: Bean을 하나만 쓸지(singleton) 매번 새로 만들지(prototype) 결정
- section02: Bean의 생성~소멸 사이 원하는 시점에 동작 끼워넣기
- section03: Bean에 들어갈 값을 외부 파일로 분리
- chap04 전체: 등록·연결된 Bean의 개수, 생명주기, 설정값까지 세부적으로 관리하는 법