package com.ott.core.repository;

import com.ott.core.model.UserActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserActivityRepository extends JpaRepository<UserActivity, UUID> {
    List<UserActivity> findByUserIdAndProgressSecondsGreaterThan(UUID userId, Long progress);
    List<UserActivity> findByUserIdAndIsWatchlistedTrue(UUID userId);
    Optional<UserActivity> findByUserIdAndContentId(UUID userId, UUID contentId);
}
