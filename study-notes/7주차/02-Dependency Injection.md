# chap02 - Dependency Injection 복습

## 0. 오늘의 큰 그림
- DI(Dependency Injection, 의존성 주입): 객체가 필요로 하는 다른 객체(의존 객체)를 내가 직접 만들지 않고 외부(스프링 컨테이너)가 넣어주는 것
- 의존 관계: A가 B를 사용하면 "A는 B에 의존한다"
  - 예: MemberDTO가 Account를 가지고 있음 → MemberDTO는 Account에 의존
- chap01이 "Bean을 등록하는 법"이었다면, chap02는 "Bean끼리 연결하는 법"
- 주입 방법 2가지: 생성자 주입, 세터(setter) 주입

---

## common - 실습용 클래스

- Account (인터페이스): 계좌 기능 정의 (잔액 조회, 입금, 출금 등)
- PersonalAccount: Account 구현체
- MemberDTO: 회원 정보 + Account 필드를 가짐

        public class MemberDTO {
            private int sequence;
            private String name;
            ...
            private Account personalAccount;   // 의존 객체
        }

### 왜 Account를 인터페이스로 만들었나
- MemberDTO는 "Account"라는 타입만 알면 됨 → 실제 구현체가 뭔지 몰라도 됨
- 나중에 다른 계좌 구현체로 바꿔도 MemberDTO 코드는 수정 안 해도 됨
- DI는 인터페이스와 같이 쓸 때 효과가 큼

---

## section00 - plainjava (직접 연결)

    Account account = new PersonalAccount(20, "110-234-567890", "1234");
    MemberDTO member = new MemberDTO(1, "홍길동", "010-1234-5678", "hong@gmail.com", account);

### 문제점
- 의존 객체를 내가 직접 만들고 직접 넣어줌
- 구현체를 바꾸려면 이 코드를 수정해야 함 → 결합도 높음

---

## section01 - xmlconfig (XML로 주입)

### 1) 생성자 주입

    <bean id="account" class="com.ohgiraffers.common.PersonalAccount">
        <constructor-arg index="0" value="20"/>
        <constructor-arg index="1" value="110-234-567890"/>
        ...
    </bean>

    <bean id="member" class="com.ohgiraffers.common.MemberDTO">
        <constructor-arg name="sequence" value="1"/>
        ...
        <constructor-arg name="personalAccount" ref="account"/>
    </bean>

### 2) 세터 주입

    <bean id="member" class="com.ohgiraffers.common.MemberDTO">
        <property name="sequence" value="1"/>
        ...
        <property name="personalAccount" ref="account"/>
    </bean>

### 헷갈리는 부분
- constructor-arg = 생성자 호출 / property = setter 호출
- property 방식은 기본 생성자 + setter가 있어야 동작
- property의 name은 필드명이 아니라 setter 이름 기준 (setPersonalAccount → personalAccount)
- value = 일반 값 / ref = 다른 Bean의 id

---

## section02 - javaconfig (Java 설정으로 주입)

### 생성자 주입

    @Bean
    public Account accountGenerator() {
        return new PersonalAccount(20, "110-234-567890", "1234");
    }

    @Bean
    public MemberDTO memberGenerator() {
        return new MemberDTO(1, "홍길동", "010-...", "hong@...", accountGenerator());
    }

### 세터 주입

    @Bean
    public MemberDTO memberGenerator() {
        MemberDTO member = new MemberDTO();
        member.setSequence(1);
        ...
        member.setPersonalAccount(accountGenerator());
        return member;
    }

### 헷갈리는 부분
- accountGenerator()를 여러 번 호출해도 @Configuration 덕분에 같은 객체(싱글톤)가 반환됨
- 그냥 new 한 것처럼 보여도 스프링이 중간에서 관리 중

---

## section03 - layeredarchitecture (계층 구조 + DI)

### 계층 구조란
- 역할별로 클래스를 나누는 구조
- Controller: 요청 받고 응답 (입구)
- Service: 비즈니스 로직 (실제 처리 규칙)
- Repository: 데이터 저장·조회 (DB 담당)
- DTO: 계층 사이에서 데이터 전달용 객체

        Controller → Service → Repository
          (MemoController → MemoService → MemoRepository)

### 이번 실습 구성
- MemoRepository (인터페이스): 저장소 기능 정의
- MemoryMemoRepository: 메모리(Map/List)에 저장하는 구현체 → 나중에 DB 구현체로 교체 가능
- MemoService: MemoRepository를 주입받아 사용
- MemoController: MemoService를 주입받아 사용

### 핵심 코드 (생성자 주입)

    public class MemoService {
        private final MemoRepository memoRepository;

        public MemoService(MemoRepository memoRepository) {
            this.memoRepository = memoRepository;
        }
    }

### 왜 이렇게 하나
- Service는 Repository가 "메모리용인지 DB용인지" 몰라도 됨
- 저장 방식을 바꿀 때 구현체만 교체하면 Service 코드는 그대로
- 각 계층이 자기 역할만 함 → 수정·테스트가 쉬워짐

### 헷갈리는 부분
- 필드에 final + 생성자 주입 → 한 번 주입되면 바뀌지 않음 (권장 방식)
- 인터페이스 타입(MemoRepository)으로 받는 게 핵심, 구현체 타입(MemoryMemoRepository)으로 받으면 DI 의미가 줄어듦
- Controller가 Repository를 직접 부르지 않음 → 반드시 Service를 거침

---

## 암기할 것
- DI = 의존 객체를 외부에서 넣어줌
- 주입 방법: 생성자 주입 / 세터 주입 (실무 권장은 생성자 주입)
- XML: constructor-arg(생성자) / property(세터), 다른 Bean은 ref
- Java 설정: @Bean 메서드 안에서 다른 @Bean 메서드 호출로 연결
- 계층: Controller → Service → Repository
- 인터페이스로 받아야 구현체 교체가 쉬움

---

## 전체 흐름 정리
- section00: 의존 객체를 직접 new해서 넣음 → 구현체 교체 어려움
- section01: XML에서 ref로 Bean끼리 연결 → 생성자/세터 주입 두 방식
- section02: 같은 연결을 Java 코드(@Bean)로 표현
- section03: DI를 실제 구조에 적용 → Controller-Service-Repository를 인터페이스 기반으로 연결
- chap01에서 "객체를 컨테이너에 맡겼다"면, chap02는 "객체 간 연결까지 컨테이너에 맡긴다"