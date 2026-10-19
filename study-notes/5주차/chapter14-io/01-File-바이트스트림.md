# 01-File-바이트스트림

---

## 1. File 클래스 — 파일·경로 관리

파일과 디렉터리의 경로를 다루고, 생성·삭제·정보 확인 기능을 제공한다.
(File 객체를 만든다고 실제 파일이 생기는 건 아님 → createNewFile() 해야 생성)

```java
File file = new File("chap14-Io/src/com/ohgiraffers/section01/test.txt");

file.createNewFile();    // 파일 생성 (true: 생성됨 / false: 이미 존재)
file.length();           // 파일 크기(byte), 없거나 비었으면 0
file.getPath();          // new File()에 넣은 경로 그대로 (상대경로)
file.getAbsolutePath();  // C:부터 시작하는 전체 경로 (절대경로)
file.delete();           // 파일 삭제 (true: 성공 / false: 파일 없음·실패)
```

> 반환값(boolean)은 안 받아도 동작은 그대로 실행됨 (결과만 버려짐)

### 예외 처리

```java
try {
    file.createNewFile();
} catch (IOException e) {
    e.printStackTrace();
    System.out.println("파일 생성 실패 : " + e.getMessage());
}
```

> `createNewFile()`은 IOException(Checked)을 던지므로 처리 필수
> 폴더가 없거나 권한이 없으면 IOException 발생 (이미 있으면 예외 아니고 false)

### 상대경로 주의

상대경로는 **실행 위치(작업 디렉터리)** 기준.
IntelliJ에서 프로젝트 최상위 기준으로 실행되면 모듈 폴더(`chap14-Io/`)를 경로 앞에 붙여야 함.

---

## 2. 스트림(Stream)이란?

데이터가 흘러가는 **통로**. 한 방향으로만 흐른다.

| | 방향 | 기준 |
|---|---|---|
| 입력(Input) | 파일 → 프로그램 | 프로그램으로 **들어옴** (읽기) |
| 출력(Output) | 프로그램 → 파일 | 프로그램에서 **나감** (쓰기) |

| | 바이트 스트림 | 문자 스트림 |
|---|---|---|
| 단위 | 1byte | 문자(char) |
| 이름 | `~InputStream` / `~OutputStream` | `~Reader` / `~Writer` |
| 용도 | 이미지·영상 등 모든 파일 | 텍스트 전용 (한글 OK) |

---

## 3. FileInputStream — 바이트 단위로 읽기

```java
FileInputStream fis = null;
try {
    fis = new FileInputStream("chap14-Io/src/com/ohgiraffers/section02/testInputStrem.txt");

    int value;
    while ((value = fis.read()) != -1) {   // 1바이트씩 읽고, -1이면 끝
        System.out.println(value);         // 0~255 정수
        System.out.println((char) value);  // 문자로 변환해서 확인
    }
} catch (FileNotFoundException e) {
    e.printStackTrace();
} catch (IOException e) {
    e.printStackTrace();
} finally {
    if (fis != null) {          // 열렸을 때만 닫기 (열기 실패 시 null)
        try {
            fis.close();        // 자원 반납
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

- `read()` : 1바이트 읽어서 0~255 정수로 반환, 끝이면 **-1**
- `(char) value` : 기본형 형변환 (업/다운캐스팅 아님, 값 자체를 변환)
- 한글은 한 글자가 여러 바이트라 1바이트씩 읽으면 **깨짐**
- catch 순서: FileNotFoundException(자식) 위, IOException(부모) 아래
- 사용한 스트림은 반드시 `close()`로 닫아야 함

---

## 4. try-with-resources

try 괄호 안에서 스트림을 만들면 try 블록이 끝날 때 **자동으로 close()** 호출.
finally, null 체크, close 예외 처리가 전부 필요 없어짐.

```java
try (FileInputStream fis = new FileInputStream("경로")) {
    // 사용
} catch (IOException e) {
    e.printStackTrace();
}   // 여기서 자동 close()
```

---

## 5. FileOutputStream — 바이트 단위로 쓰기

```java
try (FileOutputStream fos = new FileOutputStream("chap14-Io/src/com/ohgiraffers/section02/testOuputStrem.txt")) {
    fos.write(97);                     // 'a' 1바이트
    fos.write("hello\n".getBytes());   // String → byte[] 변환 후 쓰기

    byte[] bar = new byte[]{98, 99, 100, 101, 10, 102};
    fos.write(bar);                    // b c d e (줄바꿈) f
} catch (IOException e) {
    e.printStackTrace();
}
```

결과 파일:
```
ahello
bcde
f
```

### write() 오버로딩

| 메소드 | 기능 |
|---|---|
| `write(int b)` | 1바이트 쓰기 |
| `write(byte[] b)` | 배열 전체 쓰기 |
| `write(byte[] b, int off, int len)` | off번째부터 len개만 쓰기 |

- `getBytes()` : String을 byte[]로 변환 (바이트 스트림은 문자열 직접 못 받음)
- 숫자 `10` = 개행문자(엔터), `\n`과 같음
- 숫자 10을 글자로 쓰려면 `"10".getBytes()`
- 파일이 없으면 **자동 생성**

### 덮어쓰기 vs 이어쓰기

```java
new FileOutputStream(path);         // 기본: 덮어쓰기 (기존 내용 삭제)
new FileOutputStream(path, true);   // 이어쓰기(append)
```

---

## 전체 흐름 정리

    File
    └─ 경로 관리, 생성·삭제·크기 확인
    └─ createNewFile()은 IOException 처리 필수

    FileInputStream (바이트 읽기)
    └─ read() 1바이트씩, -1이면 끝
    └─ 한글은 깨짐

    FileOutputStream (바이트 쓰기)
    └─ write(int / byte[] / byte[],off,len)
    └─ 문자열은 getBytes()로 변환
    └─ 기본 덮어쓰기, true면 이어쓰기

    자원 반납
    └─ finally + null 체크 + close()
    └─ 또는 try-with-resources로 자동 close()

    자주 헷갈리는 것
    └─ Input = 읽기(read), Output = 쓰기(write). Output에 read() 없음
    └─ write(10)은 숫자 10이 아니라 줄바꿈
    └─ 이미 있는 파일 createNewFile() → 예외 X, false
    └─ 상대경로는 실행 위치 기준