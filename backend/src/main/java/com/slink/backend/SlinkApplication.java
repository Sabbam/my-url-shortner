package com.slink.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class SlinkApplication {

    public static void main(String[] args) {
        SpringApplication.run(SlinkApplication.class, args);
    }

    @GetMapping("/api/health")
    public String health() {
        return "Slink Backend is soaring! 🚀";
    }

}
