# chap01 - Spring Security 기본 복습

## 0. 오늘의 큰 그림
- 요청이 컨트롤러 가기 전에 **필터 체인**이 검사
- 로그인 안 함 → **401**, 로그인했지만 권한 없음 → **403**
- 흐름: 아이디/비번(HTTP Basic) → UserDetailsService로 회원 조회 → PasswordEncoder로 비교 → 통과

---

## 1) SecurityConfig - URL별 규칙

    http
        .csrf(AbstractHttpConfigurer::disable)
        .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(a -> a
            .requestMatchers(HttpMethod.POST, "/api/auth/signup").permitAll()
            .requestMatchers("/api/admin/**").hasRole("ADMIN")
            .anyRequest().authenticated())
        .httpBasic(Customizer.withDefaults());

## 2) 인증 부품
| 부품 | 역할 |
|---|---|
| PasswordEncoder (BCrypt) | 가입 때 해시 저장, 로그인 때 비교 |
| UserDetailsService | 아이디로 회원 찾아 UserDetails로 (비번 비교 X) |
| DaoAuthenticationProvider | 위 두 개 묶어서 실제 인증 |

    return User.withUsername(user.getUserId())
            .password(user.getPassword())
            .roles(user.getRole().name())   // → ROLE_USER
            .disabled(!user.isEnabled())
            .build();

## 3) 가입 - 비번은 해시로

    passwordEncoder.encode(request.password())

- 중복 아이디/이메일 → IllegalArgumentException → GlobalExceptionHandler에서 **409**

## 4) 로그인한 사람 꺼내기

    public ResponseEntity<UserResponse> findMyProfile(Authentication authentication) {
        authentication.getName();   // 아이디
    }

---

## 헷갈리는 부분
- `roles("USER")` → 권한명은 `ROLE_USER`, `hasRole("ADMIN")`은 `ROLE_ADMIN` 검사
- 401 = 누구인지 모름 / 403 = 누구인지 알지만 권한 없음
- STATELESS + REST API라 CSRF 끔
