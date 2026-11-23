package com.ohgiraffers.securitybasic.auth;

import com.ohgiraffers.securitybasic.auth.domain.RefreshToken;
import com.ohgiraffers.securitybasic.auth.repository.RefreshTokenRepository;
import com.ohgiraffers.securitybasic.user.domain.UserAccount;
import com.ohgiraffers.securitybasic.user.domain.UserRole;
import com.ohgiraffers.securitybasic.user.repository.UserAccountRepository;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Instant;
import java.util.Base64;
import java.util.HexFormat;

/** Refresh Token의 발급·검증·교체·폐기를 맡고 DB에는 원문 대신 해시를 보관한다. */
@Service
@Transactional(readOnly = true)
public class RefreshTokenService {

    private static final int TOKEN_BYTE_LENGTH = 32;

    private final RefreshTokenRepository refreshTokenRepository;
    private final UserAccountRepository userAccountRepository;
    private final long expirationSeconds;
    private final SecureRandom secureRandom = new SecureRandom();

    public RefreshTokenService(
            RefreshTokenRepository refreshTokenRepository,
            UserAccountRepository userAccountRepository,
            @Value("${security.refresh-token.expiration-seconds}") long expirationSeconds) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.userAccountRepository = userAccountRepository;
        this.expirationSeconds = expirationSeconds;
    }

    /** 로그인한 회원의 토큰 행을 새로 만들거나 교체하고, Cookie에 담을 원문을 돌려준다. */
    @Transactional
    public String issue(String userId) {

        UserAccount user = userAccountRepository.findByUserId(userId)
                .orElseThrow(() -> new InvalidRefreshTokenException("Refresh Token을 발급할 회원을 찾을 수 없습니다."));

        String rawToken = createRawToken();
        String tokenHash = hash(rawToken);
        Instant expiresAt = Instant.now().plusSeconds(expirationSeconds);

        refreshTokenRepository.findByUser(user)
                .ifPresentOrElse(
                        token -> token.rotate(tokenHash, expiresAt),
                        () -> refreshTokenRepository.save(new RefreshToken(user, tokenHash, expiresAt))
                );

        return rawToken;
    }

    /** 제출한 원문을 검사한 뒤 새 토큰으로 교체하고 Access Token 발급에 필요한 회원을 돌려준다. */
    @Transactional
    public Rotation rotate(String rawToken) {

        RefreshToken savedToken = findValidToken(rawToken);
        String newRawToken = createRawToken();
        savedToken.rotate(
                hash(newRawToken),
                Instant.now().plusSeconds(expirationSeconds)
        );

        UserAccount user = savedToken.getUser();

        return new Rotation(user.getUserId(), user.getRole(), newRawToken);
    }

    /** 로그아웃한 토큰의 저장 행을 삭제해 다음 재발급을 막는다. */
    @Transactional
    public void revoke(String rawToken) {
        refreshTokenRepository.findByTokenHash(hash(rawToken))
                .ifPresent(refreshTokenRepository::delete);
    }

    /** 해시 조회, 만료 시각, 회원 사용 가능 상태를 모두 통과한 토큰만 반환한다. */
    private RefreshToken findValidToken(String rawToken) {

        RefreshToken savedToken = refreshTokenRepository.findByTokenHash(hash(rawToken))
                .orElseThrow(() -> new InvalidRefreshTokenException("유효하지 않은 Refresh Token 입니다."));

        if(savedToken.isExpired(Instant.now())) {
            throw new InvalidRefreshTokenException("만료된 Refresh Token 입니다.");
        }
        if(!savedToken.getUser().isEnabled()) {
            throw new InvalidRefreshTokenException("사용할 수 없는 계정입니다.");
        }

        return savedToken;
    }

    private String createRawToken() {
        // 예측하기 어려운 난수를 URL과 Cookie에 담기 좋은 문자열로 바꾼다.
        byte[] bytes = new byte[TOKEN_BYTE_LENGTH];
        secureRandom.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    private String hash(String rawToken) {
        // 같은 원문이면 같은 조회용 해시가 나오지만 해시에서 원문을 복원하지는 않는다.
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashed = digest.digest(rawToken.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(hashed);
        } catch (NoSuchAlgorithmException exception) {
            throw new IllegalStateException("SHA-256 알고리즘을 사용할 수 없습니다.", exception);
        }
    }

    /** 교체 후 새 Access Token에 쓸 회원 정보와 Cookie에 담을 새 토큰 원문을 묶는다. */
    public record Rotation(
            String userId,
            UserRole role,
            String refreshToken
    ) {
    }
}
