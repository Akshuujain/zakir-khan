package com.ott.core.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "contents")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Content {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tenant_id", nullable = false)
    private Tenant tenant;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ContentType type;

    private String thumbnailUrl;
    private String mediaUrl; // S3 or IVS URL

    private String category; // e.g., Stand-up, Podcast, Behind Scenes

    @Column(columnDefinition = "TEXT")
    private String metadata; // duration, resolution, etc.

    private boolean isPremium;

    @Enumerated(EnumType.STRING)
    private ContentStatus status;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public enum ContentType {
        VIDEO, PODCAST, LIVE
    }

    public enum ContentStatus {
        DRAFT, PUBLISHED, ARCHIVED
    }
}
