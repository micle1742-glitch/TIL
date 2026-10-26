# chap01 - IoC Container 복습

## 0. 오늘의 큰 그림
- IoC(Inversion of Control, 제어의 역전): 객체 생성·관리를 내가(개발자) 직접 하지 않고 스프링 컨테이너에게 맡기는 것
- 컨테이너(ApplicationContext): 객체(Bean)를 만들고 보관하고 꺼내주는 스프링의 객체 관리 창고
- Bean: 스프링 컨테이너가 관리하는 객체
- 오늘은 "Bean을 컨테이너에 등록하는 3가지 방법"을 순서대로 배움
  - XML 설정 → Java 설정 → 어노테이션 설정

---

## section00 - plainjava (스프링 없이)

### 무엇을 했나
- 객체가 필요하면 내가 직접 new로 생성

        MemberDTO member = new MemberDTO(1, "user01", "pass01", "홍길동");

### 왜 문제인가
- 객체를 어디서 만들고 언제 바꿀지 전부 코드에 박혀 있음
- 구현체를 바꾸려면 사용하는 코드를 직접 수정해야 함 → 결합도가 높음
- 이 불편함을 해결하려고 스프링 컨테이너를 사용함

---

## section01 - xmlconfig (XML로 Bean 등록)

### 핵심 개념
- XML 파일에 "어떤 객체를 Bean으로 등록할지" 적어두고, 컨테이너가 그걸 읽어서 객체를 생성
- 설정 파일 위치: resources/section01/xmlconfig/spring-context.xml

### 핵심 문법 (XML)

    <bean id="member" class="com.ohgiraffers.common.MemberDTO">
        <constructor-arg index="0" value="1"/>
        <constructor-arg name="id" value="user01"/>
        ...
    </bean>

- id: Bean 이름 (꺼낼 때 사용)
- class: 패키지 포함 전체 클래스 경로
- constructor-arg: 생성자로 값 주입 (index 또는 name으로 지정)
- 다른 Bean을 넣을 때는 value 대신 ref 사용

### 컨테이너 생성 & Bean 꺼내기

    ApplicationContext context =
        new GenericXmlApplicationContext("section01/xmlconfig/spring-context.xml");

    MemberDTO member = context.getBean("member", MemberDTO.class);

### 헷갈리는 부분
- XML 경로는 resources 폴더 기준 → "resources/"는 쓰지 않음
- class 속성에 클래스 이름만 쓰면 안 되고 패키지까지 전부 써야 함
- value = 기본값(문자열, 숫자) / ref = 다른 Bean 참조

---

## section02 - javaconfig (Java 클래스로 Bean 등록)

### 핵심 개념
- XML 대신 Java 클래스로 설정
- 설정 클래스에 @Configuration, Bean을 만드는 메서드에 @Bean

### 핵심 문법

    @Configuration
    public class ContextConfiguration {

        @Bean(name = "member")
        public MemberDTO getMember() {
            return new MemberDTO(1, "user01", "pass01", "홍길동");
        }
    }

### 컨테이너 생성

    ApplicationContext context =
        new AnnotationConfigApplicationContext(ContextConfiguration.class);

### 헷갈리는 부분
- @Bean에 name을 안 주면 메서드 이름(getMember)이 Bean 이름이 됨
- XML 방식은 GenericXmlApplicationContext, Java 방식은 AnnotationConfigApplicationContext
- @Configuration 클래스 자체도 Bean으로 등록됨

---

## section03 - annotationconfig (어노테이션 + 컴포넌트 스캔)

### 핵심 개념
- Bean을 하나씩 등록하지 않고, 클래스에 @Component를 붙여두면
- @ComponentScan이 지정한 패키지를 뒤져서 자동으로 Bean 등록

### 핵심 문법

    @Configuration
    @ComponentScan(basePackages = "com.ohgiraffers")
    public class ContextConfiguration { }

    @Component
    public class MemberDAO { ... }

### 등록된 Bean 확인

    String[] beanNames = context.getBeanDefinitionNames();
    for (String name : beanNames) {
        System.out.println(name);
    }

### 헷갈리는 부분
- @Component에 이름 안 주면 클래스명 첫 글자 소문자가 Bean 이름 (MemberDAO → memberDAO)
- basePackages 범위 밖에 있는 클래스는 @Component 붙여도 등록 안 됨
- @Repository, @Service, @Controller도 내부적으로 @Component 포함 → 스캔 대상

---

## 암기할 것
- IoC = 객체 생성·관리를 컨테이너에 맡김
- XML → GenericXmlApplicationContext
- Java 설정 → @Configuration + @Bean → AnnotationConfigApplicationContext
- 어노테이션 → @ComponentScan + @Component
- getBean("이름", 타입.class)로 꺼냄
- Bean 기본 이름: @Bean은 메서드명, @Component는 클래스명 첫 글자 소문자

---

## 전체 흐름 정리
- section00: 직접 new → 객체 관리가 코드에 묶여 불편함
- section01: 객체 생성을 XML에 적어 컨테이너에 맡김 → 코드와 설정 분리
- section02: XML 대신 Java 코드로 설정 → 타입 체크 가능, 읽기 쉬움
- section03: 클래스에 @Component만 붙이면 자동 등록 → 설정 코드 최소화
- 결국 방향은 "내가 직접 관리 → 스프링이 알아서 관리"로 점점 자동화되는 흐름