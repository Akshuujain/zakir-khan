package com.ott.core.controller;

import com.ott.core.model.Content;
import com.ott.core.model.Subscription;
import com.ott.core.model.UserActivity;
import com.ott.core.repository.ContentRepository;
import com.ott.core.repository.SubscriptionRepository;
import com.ott.core.repository.UserActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/mobile")
@RequiredArgsConstructor
public class MobileContentController {

    private final ContentRepository contentRepository;
    private final UserActivityRepository userActivityRepository;
    private final SubscriptionRepository subscriptionRepository;

    @GetMapping("/home/{userId}")
    public MobileHomeResponse getHomeData(@PathVariable UUID userId) {
        // Fetch "Continue Watching"
        List<Content> continueWatching = userActivityRepository
                .findByUserIdAndProgressSecondsGreaterThan(userId, 0L)
                .stream()
                .map(UserActivity::getContent)
                .collect(Collectors.toList());

        // Fetch "Exclusive Specials"
        List<Content> exclusiveSpecials = contentRepository.findByIsPremiumTrue();

        // Fetch Categories (Mocking for now, could be dynamic)
        List<String> categories = List.of("All", "Stand-Up", "Podcasts", "Behind Scenes", "Live Shows");

        return new MobileHomeResponse(continueWatching, exclusiveSpecials, categories);
    }

    @PostMapping("/activity/progress")
    public void updateProgress(@RequestBody ProgressUpdateRequest request) {
        UserActivity activity = userActivityRepository
                .findByUserIdAndContentId(request.userId(), request.contentId())
                .orElse(UserActivity.builder()
                        .userId(request.userId())
                        .content(contentRepository.findById(request.contentId()).orElseThrow())
                        .build());

        activity.setProgressSeconds(request.progressSeconds());
        activity.setTotalSeconds(request.totalSeconds());
        userActivityRepository.save(activity);
    }

    @GetMapping("/profile/{userId}")
    public MobileProfileResponse getProfileData(@PathVariable UUID userId) {
        List<UserActivity> activities = userActivityRepository.findByUserIdAndProgressSecondsGreaterThan(userId, 0L);
        
        long watchedCount = activities.size();
        long savedCount = userActivityRepository.findByUserIdAndIsWatchlistedTrue(userId).size();
        
        // Summing up total time watched in hours, handle nulls
        long totalSeconds = activities.stream()
                .map(UserActivity::getProgressSeconds)
                .filter(java.util.Objects::nonNull)
                .mapToLong(Long::longValue)
                .sum();
        String totalTime = (totalSeconds / 3600) + "H";

        Subscription subscription = subscriptionRepository.findByUserId(userId)
                .orElse(Subscription.builder()
                        .planType(Subscription.PlanType.FREE)
                        .isActive(false)
                        .build());

        return new MobileProfileResponse(
                "Rahul Kumar", // Mocking name for now
                "rahul.k@email.com", // Mocking email
                watchedCount,
                savedCount,
                totalTime,
                subscription.getPlanType().name(),
                subscription.getExpiryDate() != null ? subscription.getExpiryDate().toString() : "N/A"
        );
    }

    public record MobileHomeResponse(
            List<Content> continueWatching,
            List<Content> exclusiveSpecials,
            List<String> categories
    ) {}

    public record ProgressUpdateRequest(
            UUID userId,
            UUID contentId,
            Long progressSeconds,
            Long totalSeconds
    ) {}

    public record MobileProfileResponse(
            String name,
            String email,
            long watchedCount,
            long savedCount,
            String totalTime,
            String planName,
            String planExpiry
    ) {}
}
