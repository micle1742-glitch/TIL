# chap05 - AOP 복습

## 0. 오늘의 큰 그림
- chap01~04: Bean을 등록하고, 연결하고, 관리하는 법
- chap05: 여러 Bean에 똑같이 들어가는 "공통 기능"을 한 곳으로 빼는 법
- 예: 로그 출력, 실행 시간 측정, 예외 기록 → Service 메소드마다 쓰면 중복
- AOP(Aspect Oriented Programming): 핵심 로직은 Service에, 공통 기능은 Aspect에 분리

---

## 실습 구조 (section01/aop)
- MemberDTO: 회원 정보 (id, name)
- MemberDAO (@Repository): Map으로 회원 2명 보관, 없는 id면 IllegalArgumentException
- MemberService (@Service): DAO 호출만 담당 → AOP 적용 대상
- LoggingAspect (@Aspect @Component): 공통 기능(로그) 모음
- ContextConfiguration: @ComponentScan으로 위 클래스들 Bean 등록
- Application: selectMembers(), selectMember(1L), selectMember(3L)(예외) 호출

---

## 1) AOP 용어

| 용어 | 뜻 | 실습에서 |
|---|---|---|
| Aspect | 공통 기능을 모아둔 클래스 | LoggingAspect |
| Advice | 실제 실행할 공통 기능 (메소드) | logBefore, logAfter ... |
| JoinPoint | Advice가 끼어들 수 있는 지점 (메소드 실행) | selectMember() 실행 |
| Pointcut | 어떤 JoinPoint에 적용할지 고르는 조건 | *Service.*(..) |
| Target | Advice가 적용되는 대상 객체 | MemberService |

---

## 2) Aspect 클래스 만들기

    @Aspect        // 이 클래스는 공통 기능 모음
    @Component     // Bean으로 등록해야 Spring이 인식
    public class LoggingAspect { ... }

- @Aspect만 붙이면 Bean이 아님 → @Component 같이 필요

---

## 3) Pointcut - 적용 대상 고르기

    @Pointcut("execution(* com.ohgiraffers.section01.aop.*Service.*(..))")
    public void serviceMethods() {}

- 조건에 이름을 붙여 보관 → Advice에서 "serviceMethods()"로 재사용
- 메소드 몸통은 비워둠 (이름표 역할만)

### execution 표현식 읽는 법

    execution( *      패키지.*Service   .*      (..) )
              반환형   클래스            메소드   매개변수

- `*` : 아무거나 (반환형, 이름)
- `*Service` : 이름이 Service로 끝나는 클래스
- `(..)` : 매개변수 개수·타입 상관없음

---

## 4) Advice 5종류

### @Before - 메소드 실행 전

    @Before("serviceMethods()")
    public void logBefore(JoinPoint joinPoint) {
        joinPoint.getSignature().getName();       // 메소드 이름
        Arrays.toString(joinPoint.getArgs());     // 전달된 인자
    }

### @AfterReturning - 정상 반환 후

    @AfterReturning(pointcut = "serviceMethods()", returning = "result")
    public void logAfterReturning(JoinPoint joinPoint, Object result) { ... }

- returning 값 "result" = 매개변수 이름 result (똑같아야 함)

### @AfterThrowing - 예외 발생 후

    @AfterThrowing(pointcut = "serviceMethods()", throwing = "exception")
    public void logAfterThrowing(JoinPoint joinPoint, Throwable exception) { ... }

- selectMember(3L) 호출 시 실행됨

### @After - 성공/실패 상관없이 마지막에 (finally 같은 느낌)

    @After("serviceMethods()")
    public void logAfter(JoinPoint joinPoint) { ... }

### @Around - 실행 전후 전체를 감쌈

    @Around("serviceMethods()")
    public Object logExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.nanoTime();
        try {
            return joinPoint.proceed();   // 원래 Service 메소드 실행
        } finally {
            System.out.println("[Around] " + (System.nanoTime() - start) + "ns");
        }
    }

- 가장 강력: 실행 여부, 반환값, 예외까지 다 제어 가능
- 매개변수가 JoinPoint가 아니라 ProceedingJoinPoint
- 반환형 Object + proceed() 결과를 return 해야 호출한 쪽이 값을 받음

---

## 5) 실행 흐름 (정상 / 예외)

    정상: Around(시작) → Before → [Service 실행] → AfterReturning → After → Around(끝)
    예외: Around(시작) → Before → [Service 실행 중 예외] → AfterThrowing → After → Around(끝, finally)

- 예외는 Aspect가 삼키지 않고 Application의 catch까지 그대로 전달됨

---

## 헷갈리는 부분
- 순수 Spring(Boot 아님)에서는 설정 클래스에 **@EnableAspectJAutoProxy**가 있어야 Aspect가 동작
  - 현재 실습 ContextConfiguration에는 없음 → 실행했는데 [Before] 로그가 안 나오면 이것부터 확인

        @Configuration
        @EnableAspectJAutoProxy
        @ComponentScan("com.ohgiraffers.section01.aop")
        public class ContextConfiguration {}

  - Spring Boot는 자동 설정으로 켜져 있어서 생략 가능
- @Around에서 proceed() 안 부르면 원래 메소드가 아예 실행 안 됨
- @Around 반환형을 void로 하면 Service 반환값이 사라짐
- returning / throwing 속성 값과 매개변수 이름 불일치 → 에러
- Advice 안에서 joinPoint.getSignature().getName() = 실행된 메소드 이름
- build.gradle에 spring-aop, aspectjweaver 의존성 필요

---

## 암기할 것
- Aspect = 공통 기능 클래스 (@Aspect + @Component)
- Pointcut = 어디에, Advice = 무엇을·언제
- execution(* 패키지.*Service.*(..))
- Before / AfterReturning / AfterThrowing / After / Around
- Around만 ProceedingJoinPoint + proceed() + return

---

## 전체 흐름 정리
- Service에는 핵심 로직(회원 조회)만 남김
- 로그·시간 측정 같은 공통 기능은 LoggingAspect 한 곳에 모음
- Pointcut으로 "Service로 끝나는 클래스의 모든 메소드"를 지정
- Spring이 MemberService를 프록시로 감싸서 호출 전후에 Advice를 끼워 실행
- chap05 전체: 코드 수정 없이 여러 Bean에 공통 기능을 한 번에 적용하는 법
