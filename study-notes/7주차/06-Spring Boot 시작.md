# chap00 - Spring Boot 시작 복습

## 0. 오늘의 큰 그림
- 지금까지(08_spring-main): 순수 Spring, 직접 Context 만들고 설정 클래스 등록
- 오늘부터(09_spring-web): Spring Boot로 웹 서버(API) 만들기
- Boot = Spring을 쓰기 쉽게 "자동 설정 + 내장 서버"를 미리 챙겨준 것

---

## 1) 순수 Spring vs Spring Boot

| | 순수 Spring (chap01~05) | Spring Boot |
|---|---|---|
| 시작 | new AnnotationConfigApplicationContext(설정.class) | SpringApplication.run(...) |
| 설정 | @Configuration, @ComponentScan 직접 | @SpringBootApplication 하나로 |
| 의존성 | spring-core, context, aop... 버전 하나하나 | starter 하나로 묶음 |
| 서버 | 없음 (main 실행 후 종료) | 내장 Tomcat이 8080 포트로 계속 실행 |

---

## 2) build.gradle 핵심

    plugins {
        id 'org.springframework.boot' version '4.1.2'
        id 'io.spring.dependency-management' version '1.1.7'
    }

    dependencies {
        implementation 'org.springframework.boot:spring-boot-starter-webmvc'
    }

- starter-webmvc: Spring MVC + 내장 Tomcat + Jackson(JSON) 한 번에
- dependency-management: starter 안 라이브러리 버전을 Boot가 맞춰줌 → 버전 안 적어도 됨
- Java 21 toolchain 사용

---

## 3) 시작 클래스

    @SpringBootApplication
    public class Chap00SpringBootApplication {
        public static void main(String[] args) {
            SpringApplication.run(Chap00SpringBootApplication.class, args);
        }
    }

### @SpringBootApplication = 3개 합친 것
- @SpringBootConfiguration: 설정 클래스 (@Configuration)
- @EnableAutoConfiguration: 의존성 보고 필요한 Bean 자동 등록
- @ComponentScan: **이 클래스가 있는 패키지와 하위 패키지**를 스캔

---

## 4) 첫 Controller

    @RestController
    public class HelloController {

        @GetMapping("/hello")
        public String hello() {
            return "Spring Boot Hello";
        }
    }

- @RestController: 웹 요청을 받는 Controller + 반환값을 응답 본문으로 보냄
- @GetMapping("/hello"): GET /hello 요청 → hello() 실행
- 확인: 실행 후 브라우저에서 http://localhost:8080/hello

---

## 5) application.properties

    spring.application.name=chap00-spring-boot

- Boot 설정 파일 (resources 아래)
- 포트 변경 등도 여기서: server.port=8081

---

## 헷갈리는 부분
- Controller가 시작 클래스보다 **상위·다른 패키지**에 있으면 스캔 안 됨 → 404
- main 실행하면 바로 끝나지 않고 서버가 계속 떠 있음 (정상)
- 8080 포트 이미 사용 중 에러 → 이전에 실행한 서버 종료하기
- @RestController의 String 반환 = 화면(View) 이름이 아니라 글자 그대로 응답

---

## 암기할 것
- 시작: SpringApplication.run(메인클래스.class, args)
- @SpringBootApplication = Configuration + AutoConfiguration + ComponentScan
- starter-webmvc = MVC + 내장 Tomcat + JSON
- 기본 포트 8080, 설정 파일 application.properties

---

## 전체 흐름 정리
- build.gradle에 starter 추가 → 필요한 라이브러리와 버전 자동 구성
- main에서 SpringApplication.run → 자동 설정 + 컴포넌트 스캔 + 내장 Tomcat 실행
- @RestController + @GetMapping으로 URL과 메소드 연결
- 브라우저 요청 → Controller 메소드 실행 → 반환값이 응답으로 전달
