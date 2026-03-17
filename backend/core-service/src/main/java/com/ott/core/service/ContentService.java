package com.ott.core.service;

import com.ott.core.model.Content;
import com.ott.core.model.Tenant;
import com.ott.core.repository.ContentRepository;
import com.ott.core.repository.TenantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ContentService {

    private final ContentRepository contentRepository;
    private final TenantRepository tenantRepository;

    public Content createContent(UUID tenantId, Content content) {
        Tenant tenant = tenantRepository.findById(tenantId)
                .orElseThrow(() -> new RuntimeException("Tenant not found"));
        content.setTenant(tenant);
        return contentRepository.save(content);
    }

    public Page<Content> getContentsByTenant(UUID tenantId, Pageable pageable) {
        return contentRepository.findByTenantId(tenantId, pageable);
    }

    public Content getContentById(UUID id) {
        return contentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Content not found"));
    }

    public void deleteContent(UUID id) {
        contentRepository.deleteById(id);
    }
}
