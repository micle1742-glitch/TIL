# chap03 - Annotation 기반 DI 복습

## 0. 오늘의 큰 그림
- chap02까지는 의존 객체를 XML이나 @Bean 메서드에서 "내가 직접 연결"했음
- 오늘은 @Autowired로 스프링이 "알아서 찾아서 연결"하게 만드는 방법
- section01: @Autowired를 어디에 붙이냐 (필드 / 생성자 / 세터)
- section02: 같은 타입 Bean이 여러 개일 때 어떻게 고르냐 (@Primary / @Qualifier / 컬렉션)

---

## section01 - autowired

### common - 실습용 클래스
- BookDAO (인터페이스): 도서 조회 기능 정의
- BookDAOImpl: BookDAO 구현체, @Repository로 Bean 등록
- BookDTO: 도서 정보 담는 객체
- BookService: BookDAO를 주입받아 사용 (주입 방식만 폴더별로 다름)

### @Autowired란
- 컨테이너에서 "타입이 맞는 Bean"을 찾아서 자동으로 넣어주는 어노테이션
- BookService가 BookDAO 타입을 원함 → 컨테이너에 BookDAO 타입 Bean(BookDAOImpl)이 있음 → 자동 주입

### 1) 필드 주입 (field)

    @Service
    public class BookService {
        @Autowired
        private BookDAO bookDAO;
    }

- 장점: 코드가 제일 짧음
- 단점: final 사용 불가, 스프링 없이 테스트할 때 값을 넣을 방법이 없음

### 2) 세터 주입 (setter)

    @Autowired
    public void setBookDAO(BookDAO bookDAO) {
        this.bookDAO = bookDAO;
    }

- 장점: 나중에 의존 객체 변경 가능 (선택적 의존성에 적합)
- 단점: 객체 생성 후 주입되므로 주입 전 상태가 존재할 수 있음

### 3) 생성자 주입 (constructor) ← 권장

    @Service
    public class BookService {
        private final BookDAO bookDAO;

        @Autowired
        public BookService(BookDAO bookDAO) {
            this.bookDAO = bookDAO;
        }
    }

- 장점: final 가능 → 한 번 주입되면 안 바뀜, 의존 객체 없이는 객체 생성 자체가 안 됨
- 생성자가 1개뿐이면 @Autowired 생략 가능 (스프링 4.3+)

### 헷갈리는 부분
- @Autowired는 "이름"이 아니라 "타입" 기준으로 찾음
- 필드 주입은 편하지만 권장 X → 실무·강의 모두 생성자 주입 권장
- 생성자 생략 규칙은 생성자가 "딱 1개"일 때만

---

## section02 - annotation (같은 타입 Bean이 여러 개일 때)

### common - 실습용 클래스
- Pokemon (인터페이스): attack() 같은 공통 기능
- Pikachu, Charmander, Squirtle: Pokemon 구현체, 전부 @Component

### 문제 상황

    @Autowired
    private Pokemon pokemon;   // Pikachu? Charmander? Squirtle?

- Pokemon 타입 Bean이 3개 → 스프링이 하나를 못 고름
- NoUniqueBeanDefinitionException 발생

### 1) @Primary - 기본값 지정

    @Component
    @Primary
    public class Charmander implements Pokemon { ... }

- 후보가 여러 개면 @Primary 붙은 Bean을 우선 주입
- 구현체 쪽에 붙임

### 2) @Qualifier - 이름으로 콕 집기

    public PokemonService(@Qualifier("pikachu") Pokemon pokemon) {
        this.pokemon = pokemon;
    }

- 주입받는 쪽에서 Bean 이름 지정
- Bean 이름 기본값 = 클래스명 첫 글자 소문자 (Pikachu → pikachu)
- @Primary보다 우선순위 높음

### 3) collection - 전부 다 받기

    private List<Pokemon> pokemonList;

    public PokemonService(List<Pokemon> pokemonList) {
        this.pokemonList = pokemonList;
    }

    // Map으로 받으면 key = Bean 이름, value = Bean 객체
    private Map<String, Pokemon> pokemonMap;

- 같은 타입 Bean을 모두 주입받음
- List: 객체만 / Map: Bean 이름 + 객체

### 헷갈리는 부분
- @Primary는 "구현체"에, @Qualifier는 "주입받는 곳"에 붙임
- 둘 다 있으면 @Qualifier가 이김 (더 구체적인 지정이 우선)
- @Qualifier 이름은 대소문자 정확히 (pikachu O / Pikachu X)
- 컬렉션 주입은 에러 없이 전부 들어옴 → 반복문으로 하나씩 사용

---

## 암기할 것
- @Autowired = 타입 기준 자동 주입
- 주입 위치: 필드 / 세터 / 생성자 (권장: 생성자 + final)
- 생성자 1개면 @Autowired 생략 가능
- 같은 타입 여러 개 → NoUniqueBeanDefinitionException
- 해결: @Primary(기본값) / @Qualifier("이름")(지정) / List·Map(전부)
- 우선순위: @Qualifier > @Primary

---

## 전체 흐름 정리
- chap02: 의존 관계를 내가 직접 연결 (ref, @Bean 메서드 호출)
- section01: @Autowired로 스프링이 타입 보고 자동 연결 → 붙이는 위치에 따라 필드/세터/생성자 주입
- section02: 자동 연결하다 보니 같은 타입이 여러 개면 충돌 → @Primary, @Qualifier, 컬렉션으로 해결
- 흐름: 직접 연결 → 자동 연결 → 자동 연결의 충돌 해결