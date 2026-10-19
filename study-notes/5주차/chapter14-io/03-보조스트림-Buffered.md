# 03-보조스트림-Buffered

---

## 1. BufferedWriter / BufferedReader

- 기본 스트림(FileWriter / FileReader)을 **감싸서** 사용하는 보조 스트림
- 버퍼 = 데이터를 **모아두는 공간**
- 바로바로 파일에 쓰거나 읽는 것보다, 버퍼를 거치면 **입출력 횟수를 줄여** 빨라짐

> 비유: 장보기. 하나 살 때마다 집 왕복(FileWriter) vs 장바구니에 모아서 한 번에(BufferedWriter)

### BufferedWriter

```java
try (BufferedWriter bw = new BufferedWriter(
        new FileWriter("chap14-Io/src/com/ohgiraffers/section03/filterstream/testBuffered.txt"))) {
    bw.write("안녕\n");
    bw.write("반가워\n");
    bw.write("잘가\n");
    // bw.newLine();  // OS에 맞는 줄바꿈
} catch (IOException e) {
    e.printStackTrace();
}
```

> 줄바꿈을 안 넣으면 `안녕반가워잘가`처럼 한 줄로 붙음

### flush() vs close()

| 메소드 | 기능 |
|---|---|
| `flush()` | 버퍼에 남은 내용을 **즉시** 파일로 밀어냄 (스트림 계속 사용 가능) |
| `close()` | **flush() + 스트림 닫기** |

> write로 쓴 내용은 버퍼에 머무를 수 있음
> close() 안 하면 마지막 내용이 파일에 안 들어갈 수 있음
> try-with-resources → 자동 close() → 자동 flush()

### BufferedReader

```java
try (BufferedReader br = new BufferedReader(
        new FileReader("chap14-Io/src/com/ohgiraffers/section03/filterstream/testBuffered.txt"))) {

    String line;
    while ((line = br.readLine()) != null) {   // 한 줄씩, 끝이면 null
        System.out.println(line);
    }
} catch (IOException e) {
    e.printStackTrace();
}
```

| | 단위 | 끝 신호 |
|---|---|---|
| `read()` | 한 글자 / 1바이트 (int) | **-1** |
| `readLine()` | 한 줄 (String) | **null** |

---

## 2. 키보드 입력 받기 (System.in)

```java
try (BufferedReader br = new BufferedReader(new InputStreamReader(System.in))) {
    System.out.println("문자열 입력");
    String value = br.readLine();     // 엔터 칠 때까지 한 줄 입력
    System.out.println("value = " + value);
} catch (IOException e) {
    e.printStackTrace();
}
```

### 감싸는 구조

    System.in              키보드 입력 (바이트, InputStream)
       ↓
    InputStreamReader      바이트 → 문자 변환
       ↓
    BufferedReader         버퍼 + readLine() 제공
       ↓
    프로그램의 String

> `System.out` = 프로그램 → 콘솔(출력), `System.in` = 키보드 → 프로그램(입력)
> 코딩테스트에서 Scanner보다 빨라서 입력 받을 때 자주 사용

---

## 전체 흐름 정리

    Buffered
    └─ 기본 스트림을 감싸서 버퍼 기능 추가
    └─ 입출력 횟수 감소 → 성능 향상
    └─ BufferedReader는 readLine()으로 한 줄씩

    flush / close
    └─ flush(): 버퍼 비우기 (계속 사용)
    └─ close(): flush + 닫기

    System.in 입력
    └─ System.in → InputStreamReader → BufferedReader

    자주 헷갈리는 것
    └─ 보조 스트림은 혼자 못 씀 (기본 스트림 필요)
    └─ readLine()은 끝이 null, read()는 -1
    └─ BufferedWriter는 줄바꿈 직접 넣어야 함 (\n 또는 newLine())
    └─ close 안 하면 버퍼 내용이 파일에 안 갈 수 있음