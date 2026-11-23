# chap07 - 실전 JPA (Auditing · cascade · 트랜잭션 · Specification) 복습

## 0. 오늘의 큰 그림
- 생성/수정 시각 자동 기록 (Auditing)
- 부모(주문) 저장·삭제가 자식(주문항목)에 전파 (cascade, orphanRemoval)
- `@Transactional` 롤백 규칙과 함정
- 조건이 있을 때만 WHERE에 붙이는 동적 검색 (Specification)

---

## 1) Auditing - BaseTimeEntity

    @MappedSuperclass
    @EntityListeners(AuditingEntityListener.class)
    public abstract class BaseTimeEntity {
        @CreatedDate      private LocalDateTime createdAt;
        @LastModifiedDate private LocalDateTime updatedAt;
    }

- `@MappedSuperclass`: 부모 필드를 자식 테이블 컬럼으로 (테이블은 안 생김)
- 엔티티가 `extends BaseTimeEntity` 하면 시간 자동 기록 (`@EnableJpaAuditing` 필요)

## 2) cascade + orphanRemoval

    @OneToMany(mappedBy = "order", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<OrderLine> lines = new ArrayList<>();

    public void addLine(OrderLine line) { lines.add(line); line.assignOrder(this); }

- `PERSIST`: 주문 저장하면 항목도 같이 저장
- `orphanRemoval`: 목록에서 빠진 항목 → DELETE, 주문 삭제 → 항목도 삭제
- 양방향은 편의 메소드(`addLine`)로 **양쪽 다** 세팅

## 3) @Transactional 롤백 규칙 (OrderService)
| 상황 | 결과 |
|---|---|
| RuntimeException 던짐 | 롤백 |
| 체크 예외(IOException) 던짐 | **커밋** (기본 규칙) |
| `rollbackFor = IOException.class` | 롤백 |
| try-catch로 삼킴 | **커밋** (프록시는 정상 종료로 봄) |
| 같은 클래스 안에서 호출 (self-invocation) | @Transactional **적용 안 됨** |

## 4) Specification - 동적 검색

    public interface MenuRepository extends JpaRepository<Menu, Integer>, JpaSpecificationExecutor<Menu> {}

    return (root, query, cb) -> {
        List<Predicate> conditions = new ArrayList<>();
        if (keyword != null && !keyword.isBlank()) conditions.add(cb.like(root.get("menuName"), "%" + keyword + "%"));
        if (minPrice != null) conditions.add(cb.greaterThanOrEqualTo(root.get("menuPrice"), minPrice));
        if (categoryCode != null) conditions.add(cb.equal(root.get("category").get("categoryCode"), categoryCode));
        return cb.and(conditions.toArray(new Predicate[0]));
    };

- 값이 들어온 조건만 WHERE에 들어감, 페이징(`Pageable`)도 같이 됨
- `root` = 조회 대상 필드, `cb` = 조건 만드는 도구

---

## 헷갈리는 부분
- 체크 예외는 기본으로 롤백 안 됨 → `rollbackFor`
- 예외를 catch로 삼키면 롤백 안 됨
- `ddl-auto: validate` → 테이블 안 만들고 엔티티와 맞는지만 검사 (sql 폴더 스크립트 먼저 실행)
