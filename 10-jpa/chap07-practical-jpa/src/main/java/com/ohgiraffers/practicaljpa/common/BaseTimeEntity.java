package com.ohgiraffers.practicaljpa.common;

import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import java.time.LocalDateTime;

// 공통 매핑과 Auditing 리스너를 연결한다.
// 부모에게 물려받은 필드도 자식 엔티티 테이블에 연결하는 설정
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseTimeEntity {
    // 생성 시각 표시
    @CreatedDate
    private LocalDateTime createdAt;
    // 수정 시각 표시
    @LastModifiedDate
    private LocalDateTime updatedAt;

    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
