# chap04 - DAO 분리 복습 (초안: 폴더 구조 기준, 코드 확인 필요)

## 0. 오늘의 큰 그림
- section01/problem: Application 한 곳에 연결·쿼리·출력이 다 섞여 있음 → 문제점
- section02: **DAO**(DB 작업)와 **DTO**(데이터 담기), run(실행)으로 역할 분리

---

## 1) 구조

    section02/
      model/dto   → MenuDTO (값 담는 객체)
      model/dao   → MenuDAO (SQL 실행 담당)
      run/Application → DAO 호출만
    mapper/menu-query.xml → 쿼리는 XML에
    common/JDBCTemplate   → getConnection / close

## 2) DAO가 하는 일
- XML에서 쿼리 읽기 → PreparedStatement로 실행 → ResultSet을 DTO로 바꿔 반환

---

## 헷갈리는 부분
- DAO = Data Access Object, DB 다루는 코드만 모은 클래스
- 이후 Spring의 Repository가 이 역할
