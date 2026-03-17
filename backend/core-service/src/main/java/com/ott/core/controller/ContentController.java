package com.ott.core.controller;

import com.ott.core.model.Content;
import com.ott.core.service.ContentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController
@RequestMapping("/api/contents")
@RequiredArgsConstructor
public class ContentController {

    private final ContentService contentService;

    @PostMapping("/tenant/{tenantId}")
    public ResponseEntity<Content> createContent(@PathVariable UUID tenantId, @RequestBody Content content) {
        return ResponseEntity.ok(contentService.createContent(tenantId, content));
    }

    @GetMapping("/tenant/{tenantId}")
    public ResponseEntity<Page<Content>> getContentsByTenant(@PathVariable UUID tenantId, Pageable pageable) {
        return ResponseEntity.ok(contentService.getContentsByTenant(tenantId, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Content> getContentById(@PathVariable UUID id) {
        return ResponseEntity.ok(contentService.getContentById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContent(@PathVariable UUID id) {
        contentService.deleteContent(id);
        return ResponseEntity.noContent().build();
    }
}
