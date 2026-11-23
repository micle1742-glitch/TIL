# chap02 - JWT 인증 복습

## 0. 오늘의 큰 그림
- 로그인 한 번 → **Access Token(JWT)** 발급 → 이후 요청은 `Authorization: Bearer <토큰>`
- 서버는 로그인 상태를 저장 안 함, 토큰 서명으로 위조 확인
- 직접 필터 안 만듦 → `oauth2ResourceServer().jwt()`가 검증

---

## 1) 로그인 (AuthService)

    Authentication authentication = authenticationManager.authenticate(
            UsernamePasswordAuthenticationToken.unauthenticated(request.userId(), request.password()));
    String accessToken = jwtService.createAccessToken(authentication);
    return new TokenResponse("Bearer", accessToken, jwtService.getExpirationSeconds());

- 비번 틀리면 authenticate()에서 예외 → 토큰 발급 X

## 2) 토큰 만들기 (JwtService)

    JwtClaimsSet claims = JwtClaimsSet.builder()
            .issuedAt(now).expiresAt(now.plusSeconds(3600))
            .subject(authentication.getName())       // 토큰 주인
            .claim("authorities", authorities)       // ["ROLE_USER"]
            .build();

## 3) JwtInfrastructureConfig
| Bean | 역할 |
|---|---|
| SecretKey | yml의 secret(Base64) → HmacSHA256 키 |
| JwtEncoder | 토큰 발급 |
| JwtDecoder | 서명·만료 검증 |
| JwtAuthenticationConverter | `authorities` → 권한 복원 (prefix "") |

## 4) SecurityConfig 변경점

    .requestMatchers(HttpMethod.POST, "/api/auth/signup", "/api/auth/login").permitAll()
    .oauth2ResourceServer(rs -> rs.jwt(jwt -> jwt.jwtAuthenticationConverter(converter)))

---

## 헷갈리는 부분
- httpBasic 대신 oauth2ResourceServer
- GlobalExceptionHandler의 AuthenticationException import가 `javax.security.sasl` → Spring 것 아님 (chap03에서 `org.springframework.security.core`로 수정됨)
- 로그아웃해도 Access Token은 만료까지 유효
