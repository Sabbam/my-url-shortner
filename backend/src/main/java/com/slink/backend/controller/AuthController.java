package com.slink.backend.controller;

import com.slink.backend.model.User;
import com.slink.backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequest request, HttpServletRequest servletRequest) {
        // Extract real client IP (considering proxy headers)
        String ip = servletRequest.getHeader("X-Forwarded-For");
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = servletRequest.getRemoteAddr();
        }
        // Handle multiple IPs in X-Forwarded-For
        if (ip != null && ip.contains(",")) {
            ip = ip.split(",")[0].trim();
        }

        User user = userService.registerUser(request.getEmail(), request.getPassword(), ip);
        return ResponseEntity.ok(new AuthResponse(user.getId(), user.getEmail(), user.getPlanType()));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        User user = userService.loginUser(request.getEmail(), request.getPassword());
        return ResponseEntity.ok(new AuthResponse(user.getId(), user.getEmail(), user.getPlanType()));
    }

    public static class AuthRequest {
        private String email;
        private String password;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }

    public static class AuthResponse {
        private Long id;
        private String email;
        private String planType;

        public AuthResponse(Long id, String email, String planType) {
            this.id = id;
            this.email = email;
            this.planType = planType;
        }

        public Long getId() {
            return id;
        }

        public String getEmail() {
            return email;
        }

        public String getPlanType() {
            return planType;
        }
    }
}
