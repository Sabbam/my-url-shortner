package com.slink.backend.service;

import com.slink.backend.model.User;
import com.slink.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    // A small list of common temporary email domains. In production, use an
    // external API or larger list.
    private static final List<String> TEMP_EMAIL_DOMAINS = Arrays.asList(
            "mailinator.com", "10minutemail.com", "guerrillamail.com", "tempmail.com",
            "dispostable.com", "yopmail.com", "sharklasers.com");

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(String email, String password, String ipAddress) {
        // 1. Check for temporary email
        String domain = email.substring(email.indexOf("@") + 1).toLowerCase();
        if (TEMP_EMAIL_DOMAINS.contains(domain)) {
            throw new IllegalArgumentException("Temporary or bot email addresses are not allowed.");
        }

        // 2. Check for existing email
        if (userRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("An account with this email already exists.");
        }

        // 3. Check for existing IP (One account per IP policy)
        if (userRepository.existsByRegistrationIp(ipAddress)) {
            throw new IllegalArgumentException(
                    "Security Alert: Only one account allowed per IP address to prevent abuse.");
        }

        // In real app: Hash password!
        return userRepository.save(new User(email, password, "FREE", ipAddress));
    }

    public User loginUser(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // In real app: Verify hash
            if (user.getPassword().equals(password)) {
                return user;
            }
        }
        throw new IllegalArgumentException("Invalid email or password.");
    }
}
