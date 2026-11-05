# chap06 - Interceptor 복습

## 0. 오늘의 큰 그림
- chap04: 예외를 한 곳(@RestControllerAdvice)에서 처리
- chap06: 요청이 **Controller에 도착하기 전·후**에 공통 로직을 한 곳에서 처리
- 실습 2개
  - StopwatchInterceptor: 모든 `/api/v1/**` 요청 처리 시간 측정
  - ApiKeyInterceptor: `/api/v1/admin/**` 요청에 X-API-KEY 헤더 검사, 없으면 401로 차단

---

## 1) 인터셉터 메소드 3개

| 메소드 | 언제 | 특징 |
|---|---|---|
| preHandle() | Controller 실행 **전** | true → 계속 진행, false → 요청 처리 중단 |
| postHandle() | Controller가 **정상 실행된 후** | 예외가 나면 호출되지 않을 수 있음 |
| afterCompletion() | 요청 처리가 **모두 끝난 후** | 예외 여부와 관계없이 호출 → 마무리 작업 |

- HandlerInterceptor 인터페이스를 구현하고 필요한 메소드만 오버라이딩

---

## 2) StopwatchInterceptor - 처리 시간 측정

    @Component
    public class StopwatchInterceptor implements HandlerInterceptor {

        private static final String START_TIME = "startTime";

        @Override
        public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
            request.setAttribute(START_TIME, System.nanoTime());   // 시작 시간 저장
            return true;
        }

        @Override
        public void afterCompletion(HttpServletRequest request, HttpServletResponse response,
                                    Object handler, Exception ex) {
            if (request.getAttribute(START_TIME) instanceof Long startTime) {
                long elapsedTime = (System.nanoTime() - startTime) / 1_000_000;   // ms
                System.out.println("[Stopwatch] afterCompletion " + request.getRequestURI() + " " + elapsedTime + "ms");
            }
        }
    }

- preHandle과 afterCompletion은 서로 다른 메소드 → 값을 **request.setAttribute**로 넘김
- 같은 요청 안에서만 유지되는 저장소라 요청끼리 섞이지 않음
- afterCompletion은 예외가 나도 호출되므로 시간 측정·정리 작업에 적합
- MenuController의 Thread.sleep(300)은 측정 결과를 보려고 넣은 실습용 지연

---

## 3) ApiKeyInterceptor - 차단하는 인터셉터

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        String apiKey = request.getHeader("X-API-KEY");
        if ("secret-key".equals(apiKey)) {
            return true;                                         // 통과
        }

        response.setStatus(HttpStatus.UNAUTHORIZED.value());     // 401
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
        return false;                                            // Controller 실행 안 함
    }

- false를 반환하면 Controller가 실행되지 않음 → 응답을 **인터셉터가 직접** 작성해야 함
- 상태 코드, Content-Type, 인코딩, 본문(JSON 문자열)을 모두 직접 설정
- ObjectMapper(주입받음)로 Map → JSON 문자열, getWriter().write()로 본문에 씀
- `"secret-key".equals(apiKey)`: 헤더가 없어 null이어도 NPE가 나지 않음

---

## 4) WebConfiguration - 등록과 적용 경로

    @Configuration
    public class WebConfiguration implements WebMvcConfigurer {

        @Override
        public void addInterceptors(InterceptorRegistry registry) {
            registry.addInterceptor(stopwatchInterceptor)
                    .addPathPatterns("/api/v1/**")
                    .order(1);

            registry.addInterceptor(apiKeyInterceptor)
                    .addPathPatterns("/api/v1/admin/**")
                    .order(2);
        }
    }

- @Component만으로는 동작 안 함 → **addInterceptors()에서 등록**해야 적용됨
- addPathPatterns: 적용할 URL 패턴 (`/**` = 하위 경로 전부)
- order: 숫자가 작은 인터셉터의 preHandle이 먼저 실행
- 인터셉터 객체는 @Component Bean → 생성자로 주입받아 등록

---

## 5) 요청별 결과 (api-test.http)

| 요청 | Stopwatch | ApiKey | 결과 |
|---|---|---|---|
| GET /api/v1/menus | 적용 | 미적용 | 200 + 처리 시간 로그 |
| POST /api/v1/admin/menus (키 없음) | 적용 | 적용, false | 401 JSON |
| POST /api/v1/admin/menus (X-API-KEY: secret-key) | 적용 | 적용, true | 201 |

---

## 헷갈리는 부분
- preHandle의 false = "요청 중단" → Controller도, 그 뒤 인터셉터의 preHandle도 실행 안 됨
- false로 막을 때 응답 본문을 안 쓰면 빈 응답이 나감 → 상태·본문을 직접 작성
- postHandle은 예외가 나면 호출되지 않을 수 있고, afterCompletion은 예외가 나도 호출됨
- 인터셉터는 @Component + **addInterceptors 등록** 둘 다 필요 (스캔만으로 적용 안 됨)
- Interceptor(Spring MVC, Controller 앞뒤) vs AOP(Bean 메소드 앞뒤) vs @RestControllerAdvice(예외 처리): 끼어드는 지점이 다름
- request.setAttribute 값은 그 요청 하나에서만 유효

---

## 암기할 것
- implements HandlerInterceptor
- preHandle(true/false) → postHandle → afterCompletion
- implements WebMvcConfigurer + addInterceptors(registry)
- registry.addInterceptor(...).addPathPatterns("/api/v1/**").order(1)
- 인증 실패 = 401 UNAUTHORIZED

---

## 전체 흐름 정리
- 요청이 들어오면 order 순서대로 preHandle 실행
- Stopwatch는 시작 시간을 request에 저장하고 true
- admin 경로면 ApiKey가 헤더를 검사 → 없으면 401 JSON을 직접 쓰고 false로 차단
- 통과하면 Controller 실행 → 요청이 끝나면 afterCompletion에서 처리 시간 출력
- 로그·인증처럼 여러 Controller에 공통인 일을 Controller 코드 수정 없이 한 곳에서 처리
