# chap01 - EntityManager와 CRUD 복습 (section01~02)

## 0. 오늘의 큰 그림
- Spring 없이 순수 JPA(Hibernate)만으로 DB 다루기
- 흐름: persistence.xml 설정 → **EntityManagerFactory**(앱에 1개) → **EntityManager**(작업마다 새로) → 트랜잭션 안에서 find / persist / remove
- EntityManager 안에는 엔티티를 보관하고 관리하는 **영속성 컨텍스트**가 있음

| 작업 | EntityManager 메소드 | SQL |
|---|---|---|
| 조회 | `find(Menu.class, pk)` | SELECT (1차 캐시에 없을 때만) |
| 등록 | `persist(menu)` | INSERT |
| 수정 | 조회 후 `setMenuName()` (메소드 없음) | UPDATE (변경 감지) |
| 삭제 | `remove(menu)` | DELETE |

---

## 1) persistence.xml - 설정

    <!-- src/main/resources/META-INF/persistence.xml -->
    <persistence-unit name="jpatest">
        <class>com.ohgiraffers.section02.crud.Menu</class>
        <properties>
            <property name="jakarta.persistence.jdbc.url" value="jdbc:mysql://localhost:3306/menudb"/>
            ...
            <property name="hibernate.show_sql" value="true"/>
            <property name="hibernate.format_sql" value="true"/>
        </properties>
    </persistence-unit>

- 위치는 반드시 `META-INF/persistence.xml`
- `persistence-unit name` = 팩토리를 만들 때 부르는 이름
- `<class>`: 관리할 엔티티 클래스 등록 (Spring Boot에선 자동으로 찾아 줘서 chap02부터는 안 씀)
- 의존성: `hibernate-core` + `mysql-connector-j`

---

## 2) EntityManagerFactory / EntityManager

    public class EntityManagerFactoryGenerator {
        private static final EntityManagerFactory FACTORY
                = Persistence.createEntityManagerFactory("jpatest");   // unit 이름
        public static EntityManagerFactory getInstance() { return FACTORY; }
    }

    public class EntityManagerGenerator {
        public static EntityManager getInstance() {
            return EntityManagerFactoryGenerator.getInstance().createEntityManager();
        }
    }

    // 테스트
    assertSame(factory1, factory2);           // 팩토리: 항상 같은 객체 (싱글톤)
    assertNotSame(entityManager1, entityManager2);   // 매니저: 매번 새 객체

| | EntityManagerFactory | EntityManager |
|---|---|---|
| 개수 | 애플리케이션에 **1개** | 요청/작업마다 **새로** |
| 이유 | 만드는 비용이 큼 (DB 설정, 매핑 정보 읽기) | 스레드끼리 공유하면 안 됨, 각자 영속성 컨텍스트를 가짐 |
| 만드는 법 | `Persistence.createEntityManagerFactory("jpatest")` | `factory.createEntityManager()` |

---

## 3) 엔티티 - @Entity

    @Entity(name = "Section02Menu")
    @Table(name = "tbl_menu")
    public class Menu {
        @Id
        @Column(name = "menu_code")
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int menuCode;

        @Column(name = "menu_name")
        private String menuName;
        ...
        protected Menu() {}       // JPA가 조회 결과로 객체를 만들 때 사용
    }

- `@Entity(name = "...")`: 패키지만 다른 같은 이름 클래스(section02 Menu, section03 Menu)가 있어서 엔티티 이름을 다르게 지정
- 자세한 매핑 어노테이션은 chap02

---

## 4) CRUD - 트랜잭션 안에서

    // 테스트 준비
    entityManager = EntityManagerGenerator.getInstance();
    transaction = entityManager.getTransaction();
    transaction.begin();
    // ... 끝나면 transaction.rollback(); entityManager.close();

    public Menu findMenuByMenuCode(int menuCode) {
        return entityManager.find(Menu.class, menuCode);       // find(엔티티 타입, PK)
    }
    public void saveMenu(Menu newMenu) {
        entityManager.persist(newMenu);
    }
    public Menu modifyMenuName(int menuCode, String menuName) {
        Menu foundMenu = entityManager.find(Menu.class, menuCode);
        foundMenu.setMenuName(menuName);                       // update 메소드가 없음!
        return foundMenu;
    }
    public void removeMenu(int menuCode) {
        Menu foundMenu = entityManager.find(Menu.class, menuCode);
        if (foundMenu != null) entityManager.remove(foundMenu);
    }

- 데이터를 바꾸는 작업(persist, 변경, remove)은 **트랜잭션 안**에서 해야 DB에 반영
- `find()`: 없으면 null
- 수정은 따로 메소드가 없음 → 조회한 객체 값을 바꾸면 flush / commit 때 UPDATE (변경 감지)

---

## 5) flush / clear - 테스트에서 확인하는 법

    crud.saveMenu(newMenu);
    entityManager.flush();     // 쌓인 변경 내용을 SQL로 DB에 보냄 (커밋 X)
    entityManager.clear();     // 영속성 컨텍스트 비우기
    Menu savedMenu = crud.findMenuByMenuCode(newMenuCode);   // 캐시가 비었으니 DB에서 SELECT

- flush: SQL만 보냄, 트랜잭션은 그대로 → 테스트 끝에 rollback하면 결국 DB엔 안 남음
- clear 없이 다시 find하면 1차 캐시의 객체를 돌려줘서 "DB에 진짜 들어갔는지" 확인이 안 됨

---

## 헷갈리는 부분

**1. 수정 메소드가 없는데 UPDATE가 나가는 이유 = 변경 감지(dirty checking)**
- find로 꺼낸 엔티티는 영속 상태 + 처음 모습을 스냅샷으로 저장
- flush(또는 commit) 때 현재 값과 스냅샷을 비교 → 바뀐 필드가 있으면 UPDATE 생성
- chap04 `updateMenu()`에서 save() 없이 UPDATE가 나가는 것도 같은 원리

**2. flush vs commit**
- flush = SQL을 DB로 보냄 (아직 되돌릴 수 있음)
- commit = flush + 트랜잭션 확정
- commit하면 자동으로 flush가 먼저 일어남

**3. 1차 캐시**
- 같은 EntityManager에서 같은 PK를 두 번 find → SELECT는 1번, 두 번째는 캐시에서 → **같은 객체**
- chap00의 동일성 문제를 해결

**4. Factory는 1개, Manager는 여러 개**
- Factory를 매번 만들면 느림 / Manager를 공유하면 서로의 영속성 컨텍스트가 섞임

---

## 암기할 것
- 설정: `META-INF/persistence.xml`, `<persistence-unit name="jpatest">`
- `Persistence.createEntityManagerFactory("jpatest")` → `createEntityManager()` → `getTransaction().begin()`
- find(타입, PK) / persist / remove, 수정 = 값 변경 후 flush·commit (변경 감지)
- flush = SQL 보내기, clear = 영속성 컨텍스트 비우기, commit = 확정

---

## 전체 흐름 정리
- persistence.xml로 DB 연결과 엔티티를 설정
- EntityManagerFactory를 한 번 만들고, 작업마다 EntityManager를 새로 만듦
- 트랜잭션을 시작하고 find / persist / remove로 엔티티를 다룸
- 수정은 영속 엔티티의 값만 바꾸면 변경 감지로 UPDATE
- flush 시점에 SQL이 DB로 가고, commit으로 확정 (테스트는 rollback)
