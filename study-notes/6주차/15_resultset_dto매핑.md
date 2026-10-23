# JDBC 04. ResultSet → DTO 매핑

> 조회 결과 한 행을 **DTO 객체 하나**에 담고, 여러 행은 **List**로 모으기

## 한눈에 보기

| 개념 | 역할 |
|---|---|
| ResultSet | DB 조회 결과 (표) |
| DTO (Data Transfer Object) | 데이터를 담아 옮기는 객체 (행 1개) |
| `List<DTO>` | 여러 행을 모은 것 |

```
DB 테이블 1행  ──→  DTO 객체 1개
DB 테이블 N행  ──→  List<DTO>
```

---

## 1. 전체 흐름

```java
List<EmployeeDTO> empList = new ArrayList<>();
EmployeeDTO row = null;

rset = pstmt.executeQuery();

while (rset.next()) {
    row = new EmployeeDTO();                         // 1. 빈 객체 생성

    row.setEmpId(rset.getString("EMP_ID"));          // 2. 컬럼 값 → 필드
    row.setEmpName(rset.getString("EMP_NAME"));
    row.setSalary(rset.getInt("SALARY"));
    row.setBonus(rset.getDouble("BONUS"));
    row.setHireDate(rset.getDate("HIRE_DATE"));
    ...

    empList.add(row);                                // 3. 리스트에 추가
}

// finally에서 close 후, 결과 출력
for (EmployeeDTO emp : empList) {
    System.out.println(emp);
}
```

### getXxx() 타입 맞추기

| DB 타입 | Java 메서드 | DTO 필드 |
|---|---|---|
| VARCHAR, CHAR | `getString()` | `String` |
| INT | `getInt()` | `int` |
| DOUBLE, DECIMAL | `getDouble()` | `double` |
| DATE | `getDate()` | `java.sql.Date` |

---

## 2. 기본 생성자가 꼭 필요한 이유

### 에러

```
row = new EmployeeDTO();
      ^
required: String, String, ..., Date, String
found:    no arguments
reason: actual and formal argument lists differ in length
```

### 원인

- 생성자를 **하나도 안 만들면** → 자바가 기본 생성자 자동 생성
- 생성자를 **하나라도 직접 만들면** → 기본 생성자 자동 생성 **안 함**

전체 필드 생성자만 만들어 두면 `new EmployeeDTO()`가 불가능해진다.

### 해결

```java
public EmployeeDTO() {
}
```

> 💡 IntelliJ: `Alt + Insert` → 생성자 → 아무것도 선택 안 하고 확인

---

## 3. DTO 기본 세트

| 구성 | 이유 |
|---|---|
| `private` 필드 | 캡슐화 |
| **기본 생성자** | `new DTO()` 후 setter로 채울 때 |
| 전체 필드 생성자 | 한 번에 값 넣을 때 |
| getter / setter | 값 꺼내기 / 넣기 |
| `toString()` | `System.out.println(dto)` 출력용 |

---

## 4. 주의

> ⚠️ `while` 안에서 `row = new EmployeeDTO()`를 **매번 새로** 해야 한다.
> 밖에서 한 번만 만들면 같은 객체를 계속 덮어써서, 리스트에 마지막 행만 N개 들어간다.

> ⚠️ 컬럼 이름 문자열(`"EMP_NAME"`) 오타 → `Column 'EMP_NAEM' not found` 에러
