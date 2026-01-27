package com.slink.backend.service;

import com.slink.backend.model.UrlMapping;
import com.slink.backend.repository.UrlRepository;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UrlService {

    private final UrlRepository urlRepository;
    private static final String ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final int CODE_LENGTH = 6;
    private final SecureRandom random = new SecureRandom();

    public UrlService(UrlRepository urlRepository) {
        this.urlRepository = urlRepository;
    }

    public UrlMapping shortenUrl(String originalUrl, String customAlias, Long userId) {
        String code;

        if (customAlias != null && !customAlias.trim().isEmpty()) {
            code = customAlias.trim();
            // Basic validation for alias (alphanumeric only, etc) could go here
            if (urlRepository.findByShortCode(code).isPresent()) {
                throw new IllegalArgumentException("Alias '" + code + "' is already in use.");
            }
        } else {
            // Generate code until unique
            do {
                code = generateCode();
            } while (urlRepository.findByShortCode(code).isPresent());
        }

        UrlMapping mapping = new UrlMapping();
        mapping.setOriginalUrl(originalUrl);
        mapping.setShortCode(code);
        mapping.setUserId(userId);
        mapping.setCreatedAt(LocalDateTime.now());

        return urlRepository.save(mapping);
    }

    public Optional<UrlMapping> getOriginalUrl(String shortCode) {
        return urlRepository.findByShortCode(shortCode);
    }

    public java.util.List<UrlMapping> getUserLinks(Long userId) {
        return urlRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    private String generateCode() {
        StringBuilder sb = new StringBuilder(CODE_LENGTH);
        for (int i = 0; i < CODE_LENGTH; i++) {
            sb.append(ALPHABET.charAt(random.nextInt(ALPHABET.length())));
        }
        return sb.toString();
    }
}
