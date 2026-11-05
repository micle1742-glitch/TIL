# chap05 - File Upload 복습

## 0. 오늘의 큰 그림
- chap02~04: JSON 본문(@RequestBody)으로 데이터 받기
- chap05: 파일은 JSON이 아니라 **multipart/form-data**로 받음
- 흐름: 파일 받기(MultipartFile) → 검증 → 안전한 저장 경로·파일명 만들기 → 디스크에 저장(transferTo) → 파일 정보(FileDTO) 응답
- 단일 업로드 `/api/v1/files/single`, 다중 업로드 `/api/v1/files/multiple`

---

## 1) application.properties - 크기 제한과 저장 위치

    spring.servlet.multipart.max-file-size=10MB      # 파일 하나 최대
    spring.servlet.multipart.max-request-size=50MB   # 요청 전체 최대
    file.upload-dir=uploads                          # 내가 만든 설정 키 (저장 폴더)

- spring.servlet.multipart.* 는 Spring이 읽는 설정
- file.upload-dir 는 직접 만든 키 → @Value로 꺼내 씀

    public FileUploadController(@Value("${file.upload-dir}") String uploadDir) {
        this.uploadRoot = Paths.get(uploadDir).toAbsolutePath().normalize();
    }

- toAbsolutePath(): 상대 경로 "uploads"를 절대 경로로
- normalize(): `./`, `../` 같은 경로 조각 정리

---

## 2) 단일 / 다중 파일 받기

    @PostMapping("/single")
    public ResponseEntity<Map<String, Object>> uploadSingleFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "description", required = false) String description) throws IOException {
        FileDTO uploadFile = saveFile(file, "single", description);
        ...
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/multiple")
    ... @RequestParam("files") List<MultipartFile> files ...

- MultipartFile: 업로드된 파일 하나 (이름, 크기, 타입, 내용)
- @RequestParam("file")의 이름 = form-data의 name="file" (같아야 연결됨)
- 여러 개는 List<MultipartFile>로 받음 (같은 name="files"로 여러 번 보냄)
- 설명 같은 일반 텍스트 필드도 @RequestParam으로 같이 받음

---

## 3) saveFile - 안전하게 저장하기

    validateFile(file);                                          // 빈 파일, 파일명 없음 → 예외

    Path uploadPath = uploadRoot.resolve(directoryName).normalize();   // uploads/single
    Files.createDirectories(uploadPath);                         // 폴더 없으면 생성

    String originFileName = StringUtils.cleanPath(file.getOriginalFilename());
    if (originFileName.contains("..")) throw new IllegalArgumentException(...);

    String extension = extractExtension(originFileName);         // ".txt"
    String savedFileName = UUID.randomUUID().toString().replace("-", "") + extension;

    Path targetPath = uploadPath.resolve(savedFileName).normalize();
    if (!targetPath.startsWith(uploadPath)) throw new IllegalArgumentException(...);

    file.transferTo(targetPath);                                 // 실제 디스크에 저장

    String relativePath = uploadRoot.relativize(targetPath).toString().replace('\\', '/');

### 왜 이렇게 하나
- **UUID 저장명**: 같은 이름 파일이 와도 덮어쓰지 않게 (원본 이름은 DTO에 따로 보관)
- **".." 검사 + startsWith 검사**: `../../` 같은 파일명으로 업로드 폴더 밖에 쓰는 것 차단
- **relativize**: 응답에 서버 절대 경로 대신 `single/abc123.txt` 같은 상대 경로만 노출
- **replace('\\', '/')**: Windows 경로 구분자를 `/`로 통일

### 확장자 추출

    int lastDotIndex = originFileName.lastIndexOf(".");
    if (lastDotIndex == -1) return "";          // 확장자 없음
    return originFileName.substring(lastDotIndex);

---

## 4) 다중 업로드 중간 실패 처리

    try {
        for (MultipartFile file : files) {
            uploadedFiles.add(saveFile(file, "multiple", description));
        }
    } catch (IOException | RuntimeException e) {
        cleanupSavedFiles(uploadedFiles, e);    // 앞에서 저장한 파일 삭제
        throw e;                                // 실패 사실은 그대로 다시 던짐
    }

- 3개 중 2번째에서 실패하면 1번째 파일만 남는 "반쪽 업로드"를 막음
- 정리 중 실패(IOException)는 `originalException.addSuppressed(...)`로 원래 예외에 덧붙임 → 최초 원인이 묻히지 않음

---

## 5) FileDTO - 응답으로 돌려주는 파일 정보

    originFileName, savedFileName, filePath, fileDescription, fileSize, contentType

- file.getSize(), file.getContentType()으로 크기·타입을 채움

---

## 6) api-test.http - multipart 요청

    POST http://localhost:8080/api/v1/files/single
    Content-Type: multipart/form-data; boundary=singleBoundary

    --singleBoundary
    Content-Disposition: form-data; name="file"; filename="sample.txt"
    Content-Type: text/plain

    single file upload sample
    --singleBoundary--

- boundary: 여러 파트(설명, 파일)를 나누는 구분 문자열
- 마지막은 `--boundary--` 로 끝냄

---

## 헷갈리는 부분
- 파일은 @RequestBody가 아니라 **@RequestParam + MultipartFile** (요청이 JSON이 아니라 multipart)
- @RequestParam("files")의 이름과 form-data name이 다르면 400 (필수 파라미터 없음)
- 원본 파일명 그대로 저장하면 덮어쓰기·경로 조작 위험 → UUID로 저장명 따로 만듦
- max-file-size(파일 1개) vs max-request-size(요청 전체) 구분
- transferTo는 IOException을 던질 수 있어서 메소드에 throws IOException
- 응답 경로는 절대 경로가 아니라 업로드 루트 기준 상대 경로

---

## 암기할 것
- MultipartFile / List<MultipartFile>
- multipart/form-data, boundary
- UUID.randomUUID() + 확장자 = 저장 파일명
- Files.createDirectories → file.transferTo(경로)
- spring.servlet.multipart.max-file-size / max-request-size
- 등록 성공 = 201 CREATED

---

## 전체 흐름 정리
- 클라이언트가 multipart/form-data로 파일과 설명을 보냄
- Controller가 @RequestParam으로 MultipartFile과 설명을 받음
- 파일 검증 → 업로드 폴더 생성 → UUID 저장명 + 경로 검사 → transferTo로 저장
- 다중 업로드는 중간 실패 시 이미 저장한 파일을 지우고 예외를 다시 던짐
- 저장 결과를 FileDTO(원본명, 저장명, 상대 경로, 크기, 타입)로 201 응답
