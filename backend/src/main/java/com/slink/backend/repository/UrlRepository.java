package com.slink.backend.repository;

import com.slink.backend.model.UrlMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UrlRepository extends JpaRepository<UrlMapping, Long> {
    Optional<UrlMapping> findByShortCode(String shortCode);

    List<UrlMapping> findByUserIdOrderByCreatedAtDesc(Long userId);
}
