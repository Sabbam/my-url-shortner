package com.slink.backend.controller;

import com.slink.backend.model.UrlMapping;
import com.slink.backend.service.UrlService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UrlController {

    private final UrlService urlService;

    public UrlController(UrlService urlService) {
        this.urlService = urlService;
    }

    @PostMapping("/shorten")
    public ResponseEntity<?> shortenUrl(@RequestBody UrlRequest request) {
        if (request.getUrl() == null || request.getUrl().isBlank()) {
            return ResponseEntity.badRequest().body("URL is required");
        }

        try {
            new URI(request.getUrl()).toURL();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid URL format");
        }

        try {
            // In a real app, userId should be extracted from Auth token/session, not
            // request body!
            UrlMapping mapping = urlService.shortenUrl(request.getUrl(), request.getCustomAlias(), request.getUserId());
            return ResponseEntity.ok(new UrlResponse(mapping.getShortCode(), mapping.getOriginalUrl()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/links")
    public ResponseEntity<?> getUserLinks(@RequestParam Long userId) {
        return ResponseEntity.ok(urlService.getUserLinks(userId));
    }

    @GetMapping("/url/{code}")
    public ResponseEntity<?> getOriginalUrl(@PathVariable String code) {
        Optional<UrlMapping> mapping = urlService.getOriginalUrl(code);
        if (mapping.isPresent()) {
            return ResponseEntity.ok(new UrlRawResponse(mapping.get().getOriginalUrl()));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{code}")
    public RedirectView redirect(@PathVariable String code) {
        Optional<UrlMapping> mapping = urlService.getOriginalUrl(code);
        if (mapping.isPresent()) {
            return new RedirectView(mapping.get().getOriginalUrl());
        }
        return new RedirectView("https://s.myfervera.in?error=not_found");
    }

    public static class UrlRequest {
        private String url;
        private String customAlias;
        private Long userId;

        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }

        public String getCustomAlias() {
            return customAlias;
        }

        public void setCustomAlias(String customAlias) {
            this.customAlias = customAlias;
        }

        public Long getUserId() {
            return userId;
        }

        public void setUserId(Long userId) {
            this.userId = userId;
        }
    }

    public static class UrlResponse {
        private final String code;
        private final String originalUrl;

        public UrlResponse(String code, String originalUrl) {
            this.code = code;
            this.originalUrl = originalUrl;
        }

        public String getCode() {
            return code;
        }

        public String getOriginalUrl() {
            return originalUrl;
        }
    }

    public static class UrlRawResponse {
        private final String originalUrl;

        public UrlRawResponse(String originalUrl) {
            this.originalUrl = originalUrl;
        }

        public String getOriginalUrl() {
            return originalUrl;
        }
    }
}
