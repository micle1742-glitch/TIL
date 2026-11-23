# chap03 - Refresh Token 복습

## 0. 오늘의 큰 그림
- Access Token(1시간) 만료돼도 다시 로그인 없이 새 토큰 받기
- Access Token → 응답 본문 / Refresh Token → **HttpOnly Cookie**
- DB엔 Refresh Token **원문 말고 SHA-256 해시**만 저장

---

## 1) 엔드포인트
| API | 하는 일 |
|---|---|
| POST /api/auth/login | Access + Refresh 발급 |
| POST /api/auth/refresh | Cookie의 Refresh 검사 → 새 Access + **새 Refresh** (rotation) |
| POST /api/auth/logout | 저장된 Refresh 삭제 + Cookie 만료 |

    @PostMapping("/refresh")
    public ResponseEntity<TokenResponse> refresh(
            @CookieValue(name = "refresh_token", required = false) String refreshToken) { ... }

## 2) RefreshTokenService
- `issue`: SecureRandom 32바이트 → Base64 원문, DB엔 hash(원문) 저장
- `rotate`: 해시로 조회 → 만료/비활성 계정 검사 → 새 토큰으로 교체
- `revoke`: 해시로 찾아 삭제
- 실패 → `InvalidRefreshTokenException` → **401**

## 3) 기타
- React 클라이언트 붙어서 `.cors(Customizer.withDefaults())` 추가
- Access Token에 `.id(UUID)` 추가 → 연속 발급해도 토큰 문자열이 다름

---

## 헷갈리는 부분
- HttpOnly = JS에서 쿠키 못 읽음 (XSS로 토큰 탈취 방지)
- 로그아웃은 Refresh만 막음, Access는 만료까지 살아 있음
