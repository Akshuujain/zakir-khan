package com.ott.core.repository;

import com.ott.core.model.Content;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface ContentRepository extends JpaRepository<Content, UUID> {
    Page<Content> findByTenantId(UUID tenantId, Pageable pageable);
    Page<Content> findByTenantIdAndStatus(UUID tenantId, Content.ContentStatus status, Pageable pageable);
    Page<Content> findByType(Content.ContentType type, Pageable pageable);
    java.util.List<Content> findByIsPremiumTrue();
}
